import { Component, OnInit } from '@angular/core';
import { PartnerSearchFormService } from './partner-search-form.service';


@Component({
  selector: 'ngx-partner-search-form',
  templateUrl: './partner-search-form.component.html',
  styleUrls: ['./partner-search-form.component.css'],
  providers:[PartnerSearchFormService]
})

export class PartnerSearchFormComponent implements OnInit {

  public dataObject: any;
  
  constructor(private service : PartnerSearchFormService) {
    this.dataObject = service.getDataObj();
  }

  
  ngOnInit() {
  }

}
