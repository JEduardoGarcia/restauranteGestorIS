import { Component, OnInit } from '@angular/core';

const rutaImagenes = '../assets/imagenes/'

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styleUrls: ['./platillos.component.scss']
})
export class PlatillosComponent implements OnInit {

  ordenes: number = 0;

  arregloMostrar: any[] = [
    {
      nombre: 'Chilaquiles rojos',
      imagen: rutaImagenes+'chilaquilesRojos.jpg',
      cantidad: 0,
      detalles: '',
      precio: 50
    },
    {
      nombre: 'Chilaquiles verdes',
      imagen: rutaImagenes+'chilaquilesVerdes.jpg',
      cantidad: 0,
      detalles: '',
      precio: 50
    },
    {
      nombre: 'Hamburguesa',
      imagen: rutaImagenes+'hamburguesa.jpg',
      cantidad: 0,
      detalles: '',
      precio: 55
    },
    {
      nombre: 'Papas fritas',
      imagen: rutaImagenes+'papasFritas.jpg',
      cantidad: 0,
      detalles: '',
      precio: 25
    },
    {
      nombre: 'Coca-cola 500mL',
      imagen: rutaImagenes+'Coca-Cola-Light-500ml_vidrio.jpg',
      cantidad: 0,
      detalles: '',
      precio: 15
    },
    {
      nombre: 'Jarra de agua de naranja',
      imagen: rutaImagenes+'jugoNaranjaJarra.jpg',
      cantidad: 0,
      detalles: '',
      precio: 20
    },
    {
      nombre: 'Jarra de agua de toronja',
      imagen: rutaImagenes+'jarraToronjaJugo.jpg',
      cantidad: 0,
      detalles: '',
      precio: 20
    },
    {
      nombre: 'Jarra de agua de limón',
      imagen: rutaImagenes+'jarraLimonJarra.jpg',
      cantidad: 0,
      detalles: '',
      precio: 20
    },
    {
      nombre: 'Enchiladas verdes',
      imagen: rutaImagenes+'enchiladasVerdes.jpg',
      cantidad: 0,
      detalles: '',
      precio: 50
    },
    {
      nombre: 'Enchiladas rojas',
      imagen: rutaImagenes+'enchiladasRojas.jpg',
      cantidad: 0,
      detalles: '',
      precio: 50
    },
    {
      nombre: 'Enchiladas suizas',
      imagen: rutaImagenes+'enchiladasSuizas.jpg',
      cantidad: 0,
      detalles: '',
      precio: 50
    },
  ]

  constructor(){

  }

  ngOnInit(): void {
  }

  title = 'Card View Demo';

  gridColumns = 3;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  quitar( platillo: any ){

    if( 0<platillo.cantidad ){
      platillo.cantidad--;
    }else{
      return;
    }

  }

  agregar( platillo: any ){

    platillo.cantidad++;

  }

  agregarOrden() {

    let i=0;
    this.arregloMostrar.forEach( platillo => {
      if( platillo.cantidad===0){
        i++;
      }
    });

    if(i=== this.arregloMostrar.length){
      console.log("Nada ha sido seleccionado");
      return;
    }

    // ordenes = JSON.parse(localStorage.getItem('ordenes') || JSON.stringify(new Map()));
    let ordenActual:any[] = [];
    let total = 0;
    this.arregloMostrar.forEach( platillo => {
      if( platillo.cantidad>0){
        ordenActual.push(platillo);
        total+=platillo.precio;
      }
    });
    this.ordenes++;
    localStorage.setItem("ordenes"+String(this.ordenes), JSON.stringify(ordenActual));
    localStorage.setItem("noOrdenes", String(this.ordenes));
    this.arregloMostrar.forEach( platillo => {
      platillo.cantidad = 0;
    });
  }

}
