import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'wms-rcv-search-input-sub',
  templateUrl: './rcv-search-input-sub.component.html',
  styleUrls: ['./rcv-search-input-sub.component.css']
})
export class RcvSearchInputSubComponent implements OnInit {

  @Input('VO') dataObject: any;
  @Input('MALLID') MALLID: any[];
  @Output() clickEvent = new EventEmitter<any>();

  constructor() { }
  
  ngOnInit(): void {
  }

}
