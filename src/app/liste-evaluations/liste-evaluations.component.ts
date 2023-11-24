import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-evaluations',
  templateUrl: './liste-evaluations.component.html',
  styleUrls: ['./liste-evaluations.component.scss']
})
export class ListeEvaluationsComponent {
  afficherFiltres = false
  dateDebutFiltre:any
  evaluations = [
    {
      col1: [
        "2S3XD00005",
        15
      ],
      col2:[
        "12/12/202",
        "AM1"
      ],
      col3:[
        "Gabriel Ouellette",
        "450-123-4567"
      ],
      col4:[
        "8080 Rue de Burgos",
        "Québec G2 C OH4"
      ]
    },
    {
      col1: [
        "2S3XD00005",
        100
      ],
      col2:[
        "12/12/202",
        "AM1"
      ],
      col3:[
        "Benoît Meunier",
        "450-123-4567"
      ],
      col4:[
        "2585 Rue de l’a Rive",
        "Québec G2C 2EC"
      ] 
    }

  ]

  filtrer() {
    this.afficherFiltres = !this.afficherFiltres
  }
}
