import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'wms-rcv-detail-search-input',
  templateUrl: './rcv-detail-search-input.component.html',
  styleUrls: ['./rcv-detail-search-input.component.css']
})
export class RcvDetailSearchInputComponent implements OnInit {

  @Input('VO') dataObject: any;
  @Output() clickEvent = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

}
