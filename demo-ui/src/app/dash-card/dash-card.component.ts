import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ViewModel } from '../view-model';

@Component({
  selector: 'app-dash-card',
  templateUrl: './dash-card.component.html',
  styleUrls: ['./dash-card.component.css']
})
export class DashCardComponent implements OnInit {


  mode: string;

  constructor() {

  }

  ngOnInit() {
    this.mode = 'clients';
  }

}
