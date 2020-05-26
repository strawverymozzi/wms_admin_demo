import { Component, OnInit, Output, EventEmitter, AfterViewInit, ElementRef } from '@angular/core';
import { MasterSearchFormService } from './master-search-form.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-master-search-form',
  templateUrl: './master-search-form.component.html',
  styleUrls: ['./master-search-form.component.css'],
  providers: [MasterSearchFormService]
})
export class MasterSearchFormComponent implements OnInit {

  @Output() clickEvent = new EventEmitter();
  public dataObject: any;
  public searchPtnBtn: any;
  public searchSkuBtn: any;
  public rcvStatusComboDataSource: any[];
  public rcvTypeComboDataSource: any[];
  public mallIdComboDataSource: any[];



  constructor(private service: MasterSearchFormService, protected elRef: ElementRef,
    protected http: HttpClient) {
    this.dataObject = service.getDataObj();
    this.searchPtnBtn = {
      icon: 'search',
      type: 'default',
      onClick: (e) => {
        this.clickEvent.emit({ event: e, id: 'SEARCHPTN', value: this.dataObject["PTNRKY"] });
      }
    };
    this.searchSkuBtn = {
      icon: 'search',
      type: 'default',
      onClick: (e) => {
        this.clickEvent.emit({ event: e, id: 'SEARCHSKU', value: this.dataObject["SKUKEY"] });
      }
    }
  }
  ptnCodeChanged(event) {
    this.service.getPtnNameByCode(event).subscribe(res => {
      if (res && res.name != "") {
        this.dataObject["PTNRNM"] = res.name;
      } else {
        this.searchPtnBtn.onClick(event)
      }
    })
  }

  ngOnInit() {
    this.service.getRcvStatusCombo().subscribe(res => {
      this.rcvStatusComboDataSource = res;
    });

    this.service.getRcvTypeCombo().subscribe(res => {
      this.rcvTypeComboDataSource = res;
    });
  }

}
