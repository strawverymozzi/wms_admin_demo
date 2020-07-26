import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wms-search-input-ptnkey',
  templateUrl: './search-input-ptnkey.component.html',
  styleUrls: ['./search-input-ptnkey.component.css']
})
export class SearchInputPtnkeyComponent implements OnInit {

  @Input('VO') dataObject: any;
  constructor() {
  }

  ngOnInit(): void {

  }


}
