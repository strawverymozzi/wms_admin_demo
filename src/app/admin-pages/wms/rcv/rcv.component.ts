import { Component, OnInit, ViewChild } from '@angular/core';
import { RcvService } from './rcv.service';
import { RCVFORM, RCVSUBFORM, RCVDETAILFORM } from './_form/rcv-form';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid } from 'devextreme/excel_exporter';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';
import { SearchHelperService } from '../common-wms/search-helper/search-helper.service.';
import { RcvGridConfig } from './rcv.grid-config';
import { comparison, eq } from 'rsql-builder';
import { RoleChecker } from '../../../@program/role-checker';

function joinRSQLString(...param): string {
  return [...param].filter((sqlString) => {
    return !!sqlString;
  }).join(";");
}

@Component({
  selector: 'app-rcv',
  templateUrl: './rcv.component.html',
  styleUrls: ['./rcv.component.css'],
  providers:[RoleChecker]
})
export class RCVComponent implements OnInit {
  @ViewChild('masterGrid', { static: false }) masterGridRef: DxDataGridComponent;
  @ViewChild('detailGrid', { static: false }) detailGridRef: DxDataGridComponent;

  public loadingTarget: string;//#masterGrid  #detailGrid
  public loadingVisible: boolean;
  //initF
  public RCVSTA_COMBO: any[];
  public RCVTYP_COMBO: any[];
  public MALLID_COMBO: any[];
  //form
  public RCVFORM: RCVFORM = new RCVFORM();
  public RCVSUBFORM: RCVSUBFORM = new RCVSUBFORM();
  public RCVDETAILFORM = new RCVDETAILFORM();
  //grid
  public gridConfig: RcvGridConfig = new RcvGridConfig();
  public masterGridData: any[];
  public masterFocusedKey: any;
  private contextMasterData: any;
  public detailGridData: any[];
  public detailFocusedKey: any;
  public detailFocusedIndex: any;
  public detailChangeBuffer: any[] = [];
  //action
  public actionVisible;

  constructor(
    private thisService: RcvService,
    public roleChecker: RoleChecker,
  ) { }

  masterSearch() {
    this.loader(true, "#masterGrid")
    const tenant = comparison('tenant', eq(1000));//from token
    const param = this.RCVFORM.toRSQL();
    const paramSub = this.RCVSUBFORM.toRSQL();
    const queryStr = joinRSQLString(tenant, param, paramSub);
    this.thisService.getListMasterGrid(queryStr).subscribe(gridData => {
      if (gridData) {
        this.masterGridData = gridData;
      }
      this.loader(false);
    });
  }

  detailSearch() {
    this.loader(true, null)
    for (let key of Object.keys(this.RCVDETAILFORM)) {
      this.RCVDETAILFORM[key] = this.contextMasterData[key];
    }
    const tenant = comparison('tenant', eq(1000));//from token
    const uid = comparison('rcvId.uid', eq(this.contextMasterData["uid"]));
    const queryStr = joinRSQLString(tenant, uid)
    this.thisService.getListDetailGrid(queryStr).subscribe(gridData => {
      if (gridData) {
        this.actionVisible = true;
        this.detailChangeBuffer = [];
        this.detailGridData = gridData;
      } else {
        notify({ message: "No Item Data", width: 500, position: 'top' }, 'error', 2000);
      }
      this.loader(false);
    })
  }

  onActionSheetClose(e) {
    if (!this.detailGridRef.instance.hasEditData() && this.detailChangeBuffer.length) {
      e.cancel = true;
      confirm('변경사항이 있습니다. 취소하시겠습니까?', 'UNSAVED_CHANGES').then((ok) => {
        if (ok) {
          this.detailChangeBuffer = [];
          this.actionVisible = false;
        }
      })
    }
  }

  onMasterGridEvent(event, type) {
    this.contextMasterData = event.data;
    switch (type) {
      case 'RowDblClick':
        if (Object.keys(this.contextMasterData).length) {
          this.detailSearch();
        }
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        delete this.contextMasterData.uid;
        this.thisService.saveMaster(this.contextMasterData).subscribe(res => {
          notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
          this.masterSearchBtn.onClick();
        })
        break;
    }
  }

  onDetailGridEvent(event, type) {
    const alteredDetailData: any[] = event.data;
    switch (type) {
      case 'EditingStart':
        break;
      case 'InitNewRow':
        this.loader(true, "#detailGrid");
        setTimeout(() => {
          this.detailGridRef.instance.saveEditData();
          this.loader(false);
        });
        break;
      case 'RowInserting':
        break;
      case 'RowInserted':
        this.detailChangeBuffer.push(alteredDetailData);
        break;
      case 'RowUpdating':
        break;
      case 'RowUpdated':
        this.detailChangeBuffer.push(alteredDetailData);
        break;
    }
  }

  masterSearchBtn = {
    text: '검색',
    icon: 'search',
    onClick: (e?) => {
      this.masterSearch();
    }
  };

  masterSaveBtn = {
    text: 'Save Master',
    icon: 'save',
    type: 'success',
    onClick: (e) => {
      confirm('Confirm Update?', 'UPDATE_MASTER').then((ok) => {
        if (ok) {
          for (let key of Object.keys(this.RCVDETAILFORM)) {
            this.contextMasterData[key] = this.RCVDETAILFORM[key];
          }
          this.thisService.saveMaster(this.contextMasterData).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 2000);
            this.masterSearchBtn.onClick();
            this.actionVisible = false;
          })
        }
      });
    }
  };

  masterDeleteBtn = {
    text: 'Delete',
    icon: 'trash',
    type: 'danger',
    onClick: (e) => {
      const selected = this.masterGridRef.instance.getSelectedRowsData();
      if (!selected.length) {
        notify({ message: 'No Selected data', width: 500, position: 'top' }, 'error', 2000);
        return;
      }
      confirm('Confirm Delete Selected Rows?', 'DELETE_MASTER').then((ok) => {
        if (ok) {
          this.thisService.deleteMaster({ body: selected }).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
            this.masterSearchBtn.onClick();
          })
        }
      });
    }
  };

  saveDetailBtn = {
    text: 'Save Item',
    icon: 'save',
    type: 'success',
    onClick: (e) => {
      if (!this.detailChangeBuffer.length) {
        notify({ message: 'No Changed data.', width: 500, position: 'top' }, 'error', 2000);
        return;
      }
      confirm('Confirm Save changes?', 'SAVE_DETAIL').then((ok) => {
        if (ok) {
          this.thisService.saveDetail(this.detailChangeBuffer).subscribe(res => {
            notify({ message: "Changes Saved.", width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
            this.detailSearch();
          })
        }
      });
    }
  };

  deleteDetailBtn = {
    text: 'Delete Item',
    icon: 'trash',
    type: 'danger',
    onClick: (e) => {
      const selected = this.detailGridRef.instance.getSelectedRowsData();
      if (!selected.length) {
        notify({ message: 'No Selected data', width: 500, position: 'top' }, 'error', 2000);
        return;
      }
      confirm('Confirm Delete Selected Rows?', 'DELETE_DETAIL').then((ok) => {
        if (ok) {
          this.thisService.deleteDetail({ body: selected }).subscribe(res => {
            notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
            this.detailSearch();
          })
        }
      });
    }
  };

  saveAllBtn = {
    text: 'Save All',
    icon: 'save',
    type: 'default',
    onClick: (e) => {
      e.cancel = true;
      this.detailGridRef.instance.closeEditCell();
      const modifiedRows = this.detailGridRef.instance.getVisibleRows().filter(row => row['modified'] || row['isNewRow']);
      const modifiedData = modifiedRows.map(row => row.data);
      // if (!modifiedData.length) {
      //   notify({ message: 'No Modified data', width: 500, position: 'top' }, 'error', 2000);
      //   return;
      // }
      confirm('전체 저장하시겠습니까?', 'SAVE_ALL').then((ok) => {
        if (ok) {
          for (let key of Object.keys(this.RCVDETAILFORM)) {
            this.contextMasterData[key] = this.RCVDETAILFORM[key];
          }
          const data = {
            'rcvMasterDto': this.contextMasterData,
            'rcvDetailDtoList': modifiedData
          }
          this.thisService.saveAll(data).subscribe(res => {
            if (res && res.length && res[0]["success"]) {
              notify({ message: "마스터/디테일 저장 성공", width: 500, position: 'top' }, res ? 'success' : 'error', 2000);
              this.masterSearchBtn.onClick();
              this.actionVisible = false;
            }
          })
        }
      });
    }
  }

  inlineCellBtn = {
    icon: 'search',
    type: 'default',
    onClick: (e) => {
      SearchHelperService.openHelper('PTNKEY', {}).subscribe(
        rowData => {
          this.detailGridRef.instance.cellValue(this.detailFocusedIndex, 'ownercd', rowData['PTNKEY']);
          this.detailGridRef.instance.cellValue(this.detailFocusedIndex, 'ownerName', rowData['PTNRNM']);
        });
    }
  };

  onInlineCellValChange(event, cellInfo) {
    cellInfo.setValue(event.value)
  }

  lookUp_PTNKEY = {
    key: 'PTNKEY',
    callback: (res, triedValue) => {
      if (res && res[0]) {
        this.detailGridRef.instance.cellValue(this.detailFocusedIndex, 'ownercd', res[0]['PTNKEY']);
        this.detailGridRef.instance.cellValue(this.detailFocusedIndex, 'ownerName', res[0]['PTNRNM']);
      } else {
        const initParam = {
          'PTNKEY': triedValue,
        }
        SearchHelperService.openHelper('PTNKEY', initParam).subscribe(
          rowData => {
            this.detailGridRef.instance.cellValue(this.detailFocusedIndex, 'ownercd', rowData['PTNKEY']);
            this.detailGridRef.instance.cellValue(this.detailFocusedIndex, 'ownerName', rowData['PTNRNM']);
          });
      }
    }
  };

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

  loader(on: boolean, target?: string) {
    this.loadingTarget = target;
    if (on) {
      this.loadingVisible = true;
    } else {
      setTimeout(
        () => {
          this.loadingVisible = false
        },
        300);
    }
  }

  onShownLoader() {
  }

  onHiddenLoader() {
  }

  ngOnInit(): void {
    //combo
    this.RCVSTA_COMBO = [1, 2, 3];
    this.RCVTYP_COMBO = [3, 4, 5];
    this.MALLID_COMBO = [1, 3, 4];
    //grid
    this.masterGridData = [];
    this.detailGridData = [];
  }

}
