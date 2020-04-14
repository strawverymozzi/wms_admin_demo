import { Component, OnInit } from '@angular/core';
import { MasterSearchSubFormService } from './master-search-sub-form.service';

@Component({
  selector: 'ngx-master-search-sub-form',
  templateUrl: './master-search-sub-form.component.html',
  styleUrls: ['./master-search-sub-form.component.css'],
  providers: [MasterSearchSubFormService]
})
export class MasterSearchSubFormComponent implements OnInit {

  public dataObj: any;
  public mallIdComboDataSource: any[];
  constructor(private service: MasterSearchSubFormService) {
    this.dataObj = service.getDataObj();
  }

  ngOnInit() {
    this.service.getMallIdCombo().subscribe(res => {
      this.mallIdComboDataSource = res;
    });
  }

}
