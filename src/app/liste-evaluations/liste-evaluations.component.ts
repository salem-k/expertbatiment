import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-liste-evaluations',
  templateUrl: './liste-evaluations.component.html',
  styleUrls: ['./liste-evaluations.component.scss']
})
export class ListeEvaluationsComponent {
  afficherFiltres = false
  dateDebutFiltre:any
  dateFinFiltre:any
  evaluations : any
  evaluationsInit : any
  pendingEvaluations:any
  passedEvaluations:any
  filter : any = "Pending"
  motCle:any = ""
  constructor(
    private http: HttpClient
  ) {
    let datepipe: DatePipe = new DatePipe('en-US')
    let dateNow = datepipe.transform(Date.now(), 'YYYY/MM/dd')

    this.getJSON().subscribe(data => {
      this.evaluationsInit = data
      this.pendingEvaluations = data.filter((t1:any, t2:any) => {
        let date = datepipe.transform(t1.col2[0], 'YYYY/MM/dd')
        return dateNow < date
      }).sort((t1:any, t2:any) => {
        let date1 = datepipe.transform(t1.col2[0], 'YYYY/MM/dd')
        let date2 = datepipe.transform(t2.col2[0], 'YYYY/MM/dd')
        return date1 > date2
      })
      this.passedEvaluations = data.filter((t1:any, t2:any) => {
        let date = datepipe.transform(t1.col2[0], 'YYYY/MM/dd')
        return dateNow > date
      }).sort((t1:any, t2:any) => {
        let date1 = datepipe.transform(t1.col2[0], 'YYYY/MM/dd')
        let date2 = datepipe.transform(t2.col2[0], 'YYYY/MM/dd')
        return date1 < date2
      })
      this.evaluations = this.pendingEvaluations
     });
  }
  formatDate(date:any) {
    let datepipe: DatePipe = new DatePipe('en-US')
    return datepipe.transform(date, 'MM/dd/YYYY')
  }
  getPassed() {
    this.filter = "Passed"
    this.evaluations = this.passedEvaluations
  }
  getPending() {
    this.filter = "Pending"
    this.evaluations = this.pendingEvaluations
  }
  getJSON(): Observable<any> {
    return this.http.get("assets/evaluations.json");
  }
  filtrer() {
    this.afficherFiltres = !this.afficherFiltres
  }
  applyFilters() {
    this.filter = "Filter"
    
    let datepipe: DatePipe = new DatePipe('en-US')
    
    let dateDebutFiltre = datepipe.transform(this.dateDebutFiltre.year + "/" + this.dateDebutFiltre.month + "/" + this.dateDebutFiltre.day , 'YYYY/MM/dd')
    let dateFinFiltre = datepipe.transform(this.dateFinFiltre.year + "/" + this.dateFinFiltre.month + "/" + this.dateFinFiltre.day , 'YYYY/MM/dd')

    

    this.evaluations = this.evaluationsInit.filter((t1:any) => {
      let date = datepipe.transform(t1.col2[0], 'YYYY/MM/dd')
      return dateFinFiltre > date && date > dateDebutFiltre
    }).sort((t1:any, t2:any) => {
      let date1 = datepipe.transform(t1.col2[0], 'YYYY/MM/dd')
      let date2 = datepipe.transform(t2.col2[0], 'YYYY/MM/dd')
      return date1 > date2
    })
    if(this.motCle != "") {
      this.evaluations = this.evaluations.filter((t1:any)=>{

        if(
          t1.col3[0].toLowerCase().search(this.motCle.toLowerCase()) >= 0 ||
          t1.col3[1].toLowerCase().search(this.motCle.toLowerCase()) >= 0 ||
          t1.col4[0].toLowerCase().search(this.motCle.toLowerCase()) >= 0 ||
          t1.col4[1].toLowerCase().search(this.motCle.toLowerCase()) >= 0
        )
          return true
        else
          return false

      })
    }
    this.afficherFiltres = !this.afficherFiltres
  }
}
