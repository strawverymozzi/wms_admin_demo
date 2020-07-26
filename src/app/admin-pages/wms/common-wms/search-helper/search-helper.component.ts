import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SearchHelperService } from './search-helper.service.';
import { DxDataGridComponent } from 'devextreme-angular';
import { HttpClient } from '@angular/common/http';
import { CommonHttpService } from '../../../../@common/common.http.service';

@Component({
  selector: 'wms-search-helper',
  templateUrl: './search-helper.component.html',
  styleUrls: ['./search-helper.component.css'],
})
export class SearchHelperComponent extends CommonHttpService implements OnInit {

  @ViewChild('popGrid', { static: false }) popGridRef: DxDataGridComponent;

  public config: any;
  public dataSource: any[];
  public visibility: boolean;
  private searchOnOpen: boolean = false;

  constructor(
    protected http: HttpClient,
    public thisService: SearchHelperService,
  ) {
    super(http);
    SearchHelperService._control.subscribe(
      config => {
        this.config = config;
        if (this.searchOnOpen) {
          this.searchList();
        }
        this.visibility = true;
      });
  }

  POPSEARCHBTN = {
    text: '검색',
    icon: 'search',
    onClick: (e) => {
      this.searchList();
    }
  }

  POPDONE = {
    text: '확인',
    icon: 'check',
    onClick: (e) => {
    }
  }

  POPCANCEL = {
    text: '취소',
    icon: 'close',
    onClick: (e) => {
      this.close();
    }
  }

  searchList() {
    const url = this.config.url;
    const param = this.config.param.toRSQL();
    this.thisService.getList(url, param).subscribe(
      gridData => {
        this.dataSource = gridData;
      })
  }

  bindGridData(e, type) {
    const selectedData = this.popGridRef.instance.getSelectedRowsData();
    SearchHelperService._templateWatcher.next(selectedData[0] || {});
  }

  close() {
    for (let observer of SearchHelperService._templateWatcher.observers) {
      observer.complete();
    }
    this.dataSource = null;
    this.config = null;
    this.visibility = false;
  }

  onRowDblClick(e, type) {
    this.bindGridData(e, type);
    this.close();
  }


  ngOnInit(): void {

  }



}