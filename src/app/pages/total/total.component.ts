import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss']
})
export class TotalComponent implements OnInit, DoCheck {

  totalDelDia: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.totalDelDia = Number(localStorage.getItem("TotalDelDia"));
  }

}
