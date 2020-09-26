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
import { ActivatedRoute } from '@angular/router';
import { RoleChecker } from '../../../@program/role-checker';
import { COMMON_CONFIG } from '../../../@common/common.config';

function joinRSQLString(...param): string {
  return [...param].filter((sqlString) => {
    return !!sqlString;
  }).join(";");
}

@Component({
  selector: 'app-rcv',
  templateUrl: './rcv.component.html',
  styleUrls: ['./rcv.component.css'],
})
export class RCVComponent implements OnInit {
  @ViewChild('masterGrid', { static: false }) masterGridRef: DxDataGridComponent;
  @ViewChild('detailGrid', { static: false }) detailGridRef: DxDataGridComponent;

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
  public masterGridData: any[] = [];
  public masterFocusedKey: any;
  private contextMasterData: any;
  public detailGridData: any[] = [];
  public detailFocusedIndex: any;
  private detailGridFunction: any[] = [];
  private detailNewRowKey = 'NEW';
  private detailNewRowIncrementor = 1;

  //action
  public actionVisible;
  public loader: any = {
    enabled: true,
    shading: true,
    shadingColor: 'rgba(0,0,0,0.4)',
    showPane: true,
  };

  constructor(
    private route: ActivatedRoute,
    private thisService: RcvService,
    public roleChecker: RoleChecker,
  ) {
    if (this.roleChecker.isGranted(['delFlg'])) this.detailGridFunction.push(this.deleteDetailBtn);
    if (this.roleChecker.isGranted(['infFlg'])) this.detailGridFunction.push(this.detailInsertBtn);
    if (this.roleChecker.isGranted(['infFlg']) || this.roleChecker.isGranted(['updFlg'])) this.detailGridFunction.push(this.detailSaveBtn);
  }

  onActionSheetClose(e) {
    if (this.checkModified('detail')) {
      e.cancel = true;
      confirm('변경사항이 있습니다. 취소하시겠습니까?', 'UNSAVED_CHANGES').then((ok) => {
        if (ok) {
          this.actionVisible = false;
        }
      })
    }
    this.detailNewRowIncrementor = 1;
  }

  checkModified(id): boolean {
    let modified = false;
    let allRows;
    switch (id) {
      case 'master':
        break;
      case 'detail':
        allRows = this.detailGridRef.instance.getVisibleRows();
        allRows.some((row, i, a) => {
          return (row['isNewRow'] || row['modified']);
        })
        break;
    }
    return modified;
  }

  getNewRows(id): any[] {
    const subjectRows = [];
    let allRows;
    switch (id) {
      case 'master':
        break;
      case 'detail':
        allRows = this.detailGridRef.instance.getVisibleRows();
        allRows.forEach((row, i, a) => {
          if (row.data['uid'].toString().indexOf(this.detailNewRowKey) != -1) subjectRows.push(row.data);
        })
        break;
    }
    return subjectRows;
  }

  getUpdatedRows(id): any[] {
    const subjectRows = [];
    let allRows;
    switch (id) {
      case 'master':
        break;
      case 'detail':
        allRows = this.detailGridRef.instance.getVisibleRows();
        allRows.forEach((row, i, a) => {
          if (row.data['uid'].toString().indexOf(this.detailNewRowKey) == -1 && row['modified']) subjectRows.push(row.data);
        })
        break;
    }
    return subjectRows;
  }

  masterSearch() {
    const tenant = comparison('tenant', eq(1000));//from token
    const param = this.RCVFORM.toRSQL();
    const paramSub = this.RCVSUBFORM.toRSQL();
    const queryStr = joinRSQLString(tenant, param, paramSub);
    this.thisService.getListMasterGrid(queryStr).subscribe(gridData => {
      if (gridData) {
        this.masterGridData = gridData;
      }
    });
  }

  detailSearch() {
    for (let key of Object.keys(this.RCVDETAILFORM)) {
      this.RCVDETAILFORM[key] = this.contextMasterData[key];
    }
    const tenant = comparison('tenant', eq(1000));//from token
    const uid = comparison('rcvId.uid', eq(this.contextMasterData["uid"]));
    const queryStr = joinRSQLString(tenant, uid)
    this.thisService.getListDetailGrid(queryStr).subscribe(gridData => {
      if (gridData) {
        this.actionVisible = true;
        this.detailGridData = gridData;
      } else {
        notify({ message: "No Item Data", width: 500, position: 'top' }, 'error', 2000);
      }
    })
  }

  onMasterGridEvent(event, type) {
    this.contextMasterData = event.data;
    switch (type) {
      case 'InitNewRow':
        break;
      case 'RowDblClick':
        if (Object.keys(this.contextMasterData).length) {
          this.detailSearch();
        }
        break;
      case 'RowInserting':
        event.cancel = true;
        confirm('Confirm Save?', 'SAVE_MASTER').then((ok) => {
          if (ok) {
            this.thisService.saveMaster(this.contextMasterData).subscribe(res => {
              notify({ message: res.msg, width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
              this.masterSearch();
            });
          }
        });
        break;
      case 'RowInserted':
        break;
    }
  }

  onDetailGridEvent(event, type) {
    switch (type) {
      case 'InitNewRow':
        break;
      case 'ContentReady':
        break;
      case 'ToolbarPreparing':
        event.toolbarOptions.items = this.detailGridFunction;
        break;
      case 'RowUpdating':
        break;
      case 'RowUpdated':
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

  masterDeleteBtn = {
    text: 'Delete',
    icon: 'trash',
    type: 'danger',
    onClick: (e) => {
      const selected = this.masterGridRef.instance.getSelectedRowsData().map((row, i, a) => {
        return row["uid"];
      });
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

  masterUpdBtn = {
    text: 'Update Master',
    icon: 'save',
    type: 'success',
    stylingMode: 'outlined',
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


  detailInsertBtn = {
    location: 'after',
    widget: 'dxButton',
    options: {
      icon: 'add',
      onClick: () => {
        this.detailGridData.unshift({ "uid": `${this.detailNewRowKey}${this.detailNewRowIncrementor++}` });
        //callback
        // });
      }
    }
  }

  deleteDetailBtn = {
    location: 'after',
    widget: 'dxButton',
    options: {
      // text: 'Add Row',
      icon: 'minus',
      onClick: () => {
        const selected = this.detailGridRef.instance.getSelectedRowsData();
        if (!selected.length) {
          notify({ message: 'No Selected data', width: 500, position: 'top' }, 'error', 2000);
          return;
        }
        confirm('Confirm Delete Selected Rows?', 'DELETE_DETAIL').then((ok) => {
          if (ok) {
            const filtered = selected
              .filter((row, i, a) => {
                if (row['uid'].toString().indexOf(this.detailNewRowKey) != -1) {
                  const idx = this.detailGridRef.instance.getRowIndexByKey(row['uid']);
                  this.detailGridRef.instance.deleteRow(idx);
                  return false;
                } else {
                  return true;
                }
              })
              .map((row, i, a) => {
                return row['uid'];
              });

            if (filtered.length) {
              this.thisService.deleteDetail({ body: filtered }).subscribe(res => {
                notify({ message: 'Delete Success', width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
              })
              this.detailGridRef.instance.cancelEditData();
              this.detailSearch();
            }
          }
          this.detailGridRef.instance.saveEditData();
        });

      }
    }
  }

  detailSaveBtn = {
    location: 'after',
    widget: 'dxButton',
    options: {
      text: 'Save Detail',
      icon: 'save',
      type: 'success',
      onClick: () => {
        this.detailGridRef.instance.closeEditCell();
        const newRows = this.roleChecker.isGranted(['infFlg']) ? this.getNewRows('detail') : [];
        const updatedRows = this.roleChecker.isGranted(['updFlg']) ? this.getUpdatedRows('detail') : []
        const subjectToSaveRows = [...newRows, ...updatedRows];
        if (!subjectToSaveRows.length) {
          notify({ message: 'No Changed data.', width: 500, position: 'top' }, 'error', 2000);
          return;
        }
        confirm('Confirm Save changes?', 'SAVE_DETAIL').then((ok) => {
          if (ok) {
            this.thisService.saveDetail(subjectToSaveRows).subscribe(res => {
              notify({ message: "Changes Saved.", width: 500, position: 'top' }, res ? 'success' : 'error', 3000);
            })
            this.detailGridRef.instance.cancelEditData();
            this.detailSearch();
          }
        });
      }
    }
  }

  saveAllBtn = {
    text: 'Save All',
    icon: 'save',
    type: 'default',
    onClick: (e) => {
      e.cancel = true;
      this.detailGridRef.instance.closeEditCell();
      const newRows = this.roleChecker.isGranted(['infFlg']) ? this.getNewRows('detail') : [];
      const updatedRows = this.roleChecker.isGranted(['updFlg']) ? this.getUpdatedRows('detail') : []
      const modifiedRows = [...newRows, ...updatedRows];

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
            'rcvDetailDtoList': modifiedRows
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

  onDetailCellValueChanged(e, cellInfo) {
    cellInfo.setValue(e.value)
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

  ngOnInit(): void {
    //combo
    this.RCVSTA_COMBO = [];
    this.RCVTYP_COMBO = [];
    this.MALLID_COMBO = [1, 3, 4];

    this.route.data.subscribe(initData => {
      try {
        const RCVSTATUS = initData[COMMON_CONFIG.PROGRAMINIT]["data"]["RCVSTATUS"];
        const RCVTYPE = initData[COMMON_CONFIG.PROGRAMINIT]["data"]["RCVTYPE"];
        Object.keys(RCVSTATUS).forEach((v, i, a) => {
          this.RCVSTA_COMBO.push({ id: v, name: RCVSTATUS[v] })
        })
        Object.keys(RCVTYPE).forEach((v, i, a) => {
          this.RCVTYP_COMBO.push({ id: v, name: RCVTYPE[v] })
        })
      } catch (error) {

      }
    })


  }

}
