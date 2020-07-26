import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wms-search-input-skukey',
  templateUrl: './search-input-skukey.component.html',
  styleUrls: ['./search-input-skukey.component.css']
})
export class SearchInputSkukeyComponent implements OnInit {
  @Input('VO') dataObject: any;

  constructor() {
  }

  ngOnInit(): void {
  }

}
