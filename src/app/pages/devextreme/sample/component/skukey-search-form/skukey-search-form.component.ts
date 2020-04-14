import { Component, OnInit } from '@angular/core';
import { SkukeySearchFormService } from './skukey-search-form.service';

@Component({
  selector: 'ngx-skukey-search-form',
  templateUrl: './skukey-search-form.component.html',
  styleUrls: ['./skukey-search-form.component.css'],
  providers: [SkukeySearchFormService]


})
export class SkukeySearchFormComponent implements OnInit {

  public dataObject: any;

  constructor(private service: SkukeySearchFormService) {
    this.dataObject = service.getDataObj();
  }
 
  ngOnInit() {

  }


}
