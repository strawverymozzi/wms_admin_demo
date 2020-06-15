import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import notify from 'devextreme/ui/notify';
import { MasterSearchFormService } from './component/master-search-form/master-search-form.service';
import { MasterSearchSubFormService } from './component/master-search-sub-form/master-search-sub-form.service';
import { GridService } from './service/grid/grid.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { PartnerSearchFormService } from '../../../@dx_module/dx-common-form/partner-search-form/partner-search-form.service';
import { SkukeySearchFormService } from '../../../@dx_module/dx-common-form/skukey-search-form/skukey-search-form.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import * as FileSaver from "file-saver";
import { RoleChecker } from '../../../@program/role-checker';
import { ActivatedRoute } from '@angular/router';

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
    RoleChecker,
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
  public selectedCellObject: any;
  public masterGridConfig: any[];
  public detailGridConfig: any[];
  public ptnSearchGridConfig: any[];
  public skuSearchGridConfig: any[];
  public detailDropGridConfig: any[];
  //grid dataSource
  public masterGridDataSource: any;
  public detailGridDataSource: any;
  public ptnSearchGridDataSource: any;
  public skuSearchGridDataSource: any;
  public detailDropGridDataSource: any;
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
    private route: ActivatedRoute,
    private formService: MasterSearchFormService,
    private formSubService: MasterSearchSubFormService,
    private formPartnerService: PartnerSearchFormService,
    private formSkukeyService: SkukeySearchFormService,
    private gridService: GridService,
    protected elRef: ElementRef,
    public role: RoleChecker
  ) {
    this.formMasterDTO = this.formService.getDataObj();
    this.formDetailDTO = this.formSubService.getDataObj();
    this.formPtnSearchDTO = this.formPartnerService.getDataObj();
    this.formSkuSearchDTO = this.formSkukeyService.getDataObj();
    this.masterGridConfig = gridService.getMasterGridColumnConfig();
    this.detailGridConfig = gridService.getDetailGridColumnConfig();
    this.ptnSearchGridConfig = gridService.getPtnGridColumnConfig();
    this.skuSearchGridConfig = gridService.getSkuGridColumnConfig();
    this.detailDropGridConfig = gridService.getDetailDropGridColumnConfig();

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
      SAVEBTN: {
        text: '저장(TEST)',
        icon: 'save',
        onClick: (e) => {
          this.saveAPITest(e, 'SAVEBTN');
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

  saveAPITest(e, subject) {
    const data: any = this.masterGridRef.instance.getDataSource();
    if (!data) {
      notify({
        message: "No Item",
        width: 300,
        shading: true,
        closeOnClick: true,
        closeOnOutsideClick: true,
      }, "warning", 500);
      return;
    }
    this.gridService.saveAPITEST(data.items()).subscribe(res => {
      notify({
        message: "Save Complete",
        width: 300,
        shading: true,
        closeOnClick: true,
        closeOnOutsideClick: true,
      }, "success", 1500);

    });

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

  // onDetailDropGridOpen(event) {
  //   this.gridService.getDetailDropGridData().subscribe(res => {
  //     if (!(res && res.length)) {
  //       notify("데이터 없음");
  //       return;
  //     }
  //     this.detailDropGridDataSource = res;
  //   });
  // }

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
          this.detailGridRef.instance.cellValue(this.selectedCellObject.row.rowIndex, 'CODEC', data[0]['CODEC']);

          break;
      }
    }
    if (closeOnSelection) {
      this.popupVisible = false;
    }
  }

  onSelectionChanged(selectedRowsData, cellInfo, dropDownBoxComponent) {
    if (selectedRowsData.length > 0) {
      this.detailGridRef.instance.cellValue(cellInfo.rowIndex, 'CODEB', selectedRowsData[0]["PTNRKY"]);
      this.detailGridRef.instance.cellValue(cellInfo.rowIndex, 'CODEC', selectedRowsData[0]["PTNRNM"]);

      //cellInfo.setValue(selectedRowsData[0].);
      dropDownBoxComponent.close();
    }
  }



  onExporting(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('testSheet');

    exportDataGrid({
      component: e.component,
      worksheet: worksheet,
      autoFilterEnabled: true
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        FileSaver.saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
    e.cancel = true;
  }

  setSelectedCellObject(e) {
    this.selectedCellObject = e;
    if (this.selectedCellObject.dataField == 'CODEB') {
      this.detailGridConfig[1]['editCellTemplate'] = 'cellSearchHelpPTNKEY'
    }
  }
  ptnCodeChanged(e) {

  }

  onDetailDropKeyDown(e) {
    console.log(e)
    if (e.element.id == 'detailname2') {
      console.log(e)
    }
  }
  ngOnInit() {
    this.route.data.subscribe(rs => {
      console.log(rs)
    })
  }
}
