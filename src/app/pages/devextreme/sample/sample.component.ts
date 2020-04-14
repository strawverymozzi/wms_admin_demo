import { Component, OnInit, ViewChild, } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { MasterSearchFormService } from './component/master-search-form/master-search-form.service';
import { MasterSearchSubFormService } from './component/master-search-sub-form/master-search-sub-form.service';
import { PartnerSearchFormService } from './component/partner-search-form/partner-search-form.service';
import { SkukeySearchFormService } from './component/skukey-search-form/skukey-search-form.service';
import { GridService } from './service/grid/grid.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'ngx-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css'],
  providers: [
    MasterSearchFormService,
    MasterSearchSubFormService,
    PartnerSearchFormService,
    SkukeySearchFormService,
    GridService,
  ]
})
export class SampleComponent implements OnInit {
  @ViewChild('masterGrid', { static: false }) masterGridRef: DxDataGridComponent;
  @ViewChild('detailGrid', { static: false }) detailGridRef: DxDataGridComponent;
  @ViewChild('ptnSearchGrid', { static: false }) partnerGridRef: DxDataGridComponent;
  @ViewChild('skuSearchGrid', { static: false }) skukeyGridRef: DxDataGridComponent;

  //DTO
  public formMasterDTO: any;
  public formDetailDTO: any;
  public formPtnSearchDTO: any;
  public formSkuSearchDTO: any;
  //button config
  public btnConfig: any;
  //toolbar config
  public pageToolBarConfig: any;
  public popToolBarConfig: any;
  //grid config
  public selectedCellObject:any;
  public masterGridConfig: any[];
  public detailGridConfig: any[];
  public ptnSearchGridConfig: any[];
  public skuSearchGridConfig: any[];
  //grid dataSource
  public masterGridDataSource: any;
  public detailGridDataSource: any;
  public ptnSearchGridDataSource: any;
  public skuSearchGridDataSource: any;
  //combo dataSource
  public rcvStatusComboDataSource: any[];
  public rcvTypeComboDataSource: any[];
  public mallIdComboDataSource: any[];
  //flag
  public actionVisible: boolean;
  public popupVisible: boolean;
  //static value
  public popupTitle: string;
  public popupId: string;
  public popOwner: string;
  public actionSheetTitle: string;
  public actionSheetCommand: any[];
  public actionSheetTagBox: any[];
  constructor(
    private formService: MasterSearchFormService,
    private formSubService: MasterSearchSubFormService,
    private formPartnerService: PartnerSearchFormService,
    private formSkukeyService: SkukeySearchFormService,
    private gridService: GridService
  ) {
    this.formMasterDTO = this.formService.getDataObj();
    this.formDetailDTO = this.formSubService.getDataObj();
    this.formPtnSearchDTO = this.formPartnerService.getDataObj();
    this.formSkuSearchDTO = this.formSkukeyService.getDataObj();
    this.masterGridConfig = gridService.getMasterGridColumnConfig();
    this.detailGridConfig = gridService.getDetailGridColumnConfig();
    this.ptnSearchGridConfig = gridService.getPtnGridColumnConfig();
    this.skuSearchGridConfig = gridService.getSkuGridColumnConfig();
    this.actionVisible = false;
    this.actionSheetTagBox = [];
    this.popupVisible = false;
    this.popupTitle = '';
    this.popOwner = '';
    this.actionSheetCommand = [
      { text: 'Save' }
    ];
    this.btnConfig = {

      SEARCHMASTERBTN: {
        text: '검색',
        icon: 'search',
        onClick: (e) => {
          this.searchMaster(e, 'SEARCHMASTERBTN');
        }
      },
      EXCELUPLOADBTN: {
        text: '엑셀업로드',
        icon: 'upload',
        onClick: (e) => {
          this.excelUpload(e, 'EXCELUPLOADBTN');
        }
      },
      POPSEARCHBTN: {
        text: '검색',
        icon: 'search',
        onClick: (e) => {
          this.searchPopup(e);
        }
      },
      POPDONE: {
        text: '확인',
        icon: 'check',
        onClick: (e) => {
          this.checkPopup(e);
        }
      },
      POPCANCEL: {
        text: '취소',
        icon: 'close',
        onClick: (e) => {
          this.closePopup(e);
        }
      },
    }
  }

  searchMaster(e, subject) {
    const data = { ...this.formMasterDTO, ...this.formDetailDTO };
    this.gridService.getMasterGridData(data).subscribe(res => {
      if (!(res && res.length)) {
        notify("데이터 없음");
        return;
      }
      this.masterGridDataSource = res;
    });
  }

  searchDetail(data: any) {
    this.gridService.getDetailGridData(data).subscribe(res => {
      if (!(res && res.length)) {
        notify("데이터 없음");
        return;
      }
      this.detailGridDataSource = res
    });
  }

  saveDetail(val) {
    notify('업데이트 성공')
  }

  searchPopup(event) {
    let data;
    switch (this.popupId) {
      case 'SEARCHPTN':
        data = this.formPartnerService.getDataObj();
        this.gridService.getPtnUpGridData().subscribe(res => {
          if (!(res && res.length)) {
            notify("데이터 없음");
            return;
          }
          this.ptnSearchGridDataSource = res;
        });
        break;
      case 'SEARCHSKU':
        data = this.formSkukeyService.getDataObj();
        this.gridService.getSkuUpGridData().subscribe(res => {
          if (!(res && res.length)) {
            notify("데이터 없음");
            return;
          }
          this.skuSearchGridDataSource = res;
        });
        break;
    }
  }

  excelUpload(e, subject) {
    console.log('엑셀업로드');
  }

  openSearchHelp(subject, owner) {
    switch (subject.id) {
      case 'SEARCHPTN':
        this.popupTitle = '거래처 코드';
        this.formPtnSearchDTO["RCODNM"] = subject.value;
        break;
      case 'SEARCHSKU':
        this.popupTitle = '상품 코드';
        break;
    }
    this.popupId = subject.id;
    this.popOwner = owner;
    this.popupVisible = true;
  }

  closePopup(event) {
    this.popupVisible = false;
  }

  checkPopup(subject) {
    switch (this.popupId) {
      case 'SEARCHPTN':
        break;
      case 'SEARCHSKU':
        break;
      case 'DETAILPTNSEARCHHELP':
        break;
    }
    // ===== or when deferred selection is used =====
    // this.dataGrid.instance.getSelectedRowsData().then((selectedRowsData) => {
    //    Your code goes here
    // });

    this.popupVisible = false;
  }
  masterGridSelectionChange(event) {
    const data = this.masterGridRef.instance.getSelectedRowsData();
    if (data && data.length) {
      this.searchDetail(data[0]);
      for (let key of Object.keys(data[0])) {
        let str = key + " : " + data[0][key];
        this.actionSheetTagBox.push(str);
      }
      this.actionVisible = true;
    }
  }
  ptnGridSelectionChange(event, closeOnSelection) {
    const data = this.partnerGridRef.instance.getSelectedRowsData();
    if (data.length) {
      switch (this.popOwner) {
        case 'FORM':
          this.formMasterDTO["PTNRKY"] = data[0]["CODEA"];
          this.formMasterDTO["PTNRNM"] = data[0]["CODEB"];
          break;
        case 'DEATILCELL':
          this.detailGridRef.instance.cellValue(this.selectedCellObject.row.rowIndex, 'CODEB', data[0]['CODEB']);
          break;
      }
    }
    if (closeOnSelection) {
      this.popupVisible = false;
    }
  }

  setSelectedCellObject(e) {
    this.selectedCellObject = e;
  }

  ngOnInit() {
  }

}
