import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  constructor(
    private http: HttpClient
  ) {
    this.getJSON().subscribe(data => {
      console.log("dddddd",data);
      
      this.evaluations = data
     });
  }
  getJSON(): Observable<any> {
    return this.http.get("assets/evaluations.json");
  }
  filtrer() {
    this.afficherFiltres = !this.afficherFiltres
  }
}
