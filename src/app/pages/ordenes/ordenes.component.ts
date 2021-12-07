import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.scss']
})
export class OrdenesComponent implements OnInit, DoCheck {

  data: any;

  ordenes: any;

  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit(){

  }

  ngDoCheck(){
    let totalDelDia = 0;
    let ordenesActuales: any[]=[];
    for(let i = 1; i<=Number(localStorage.getItem("noOrdenes")); i++){
      ordenesActuales.push(
        {
          ordenes: JSON.parse(localStorage.getItem('ordenes'+String(i)) || '[]'),
          total: 0
        }
      );
    }
    ordenesActuales.forEach( (ordenesDeOrden: any) => {
      var total = 0;
      (ordenesDeOrden.ordenes).forEach( (element:any) => {
        total+=element.precio*element.cantidad;
      });
      ordenesDeOrden.total = total;
      totalDelDia+=total;
    });
    this.ordenes = ordenesActuales;
    localStorage.setItem("TotalDelDia", String(totalDelDia));
    console.log(this.ordenes);
    console.log('Método DoCheck lanzado');
  }


  title = 'Card View Demo';

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

}
