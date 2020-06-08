import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'ngx-demo-grid',
  templateUrl: './demo-grid.component.html',
  styleUrls: ['./demo-grid.component.css'],

})
export class DemoGridComponent implements OnInit {
  
  @ViewChild('dataGridRef', { static: false }) dataGrid: DxDataGridComponent;
  @Output() gridEvent = new EventEmitter();
  @Input() gridColumnConfig: any[];
  @Input() gridFunctionConfig: any[];
  @Input() dataSource: any[];

  enterKeyActions: Array<string>;
  enterKeyDirections: Array<string>;
  editOnkeyPress: boolean;
  enterKeyAction: String;
  enterKeyDirection: String;
  filterValue: Array<any>;
  customOperations: Array<any>;
  popupPosition: any;
  allMode: string;
  checkBoxesMode: string;
  selectedRowsData = [];

  constructor() {
    this.enterKeyActions = ['startEdit', 'moveFocus'];
    this.enterKeyDirections = ['none', 'column', 'row'];
    this.editOnkeyPress = true;
    this.enterKeyAction = 'moveFocus';
    this.enterKeyDirection = 'column';
    this.popupPosition = { of: window, at: 'top', my: 'top', offset: { y: 10 } };
    //this.allMode = 'allPages';
   // this.checkBoxesMode = 'onClick'
  }

  onSelectionChanged(e) {
    this.selectedRowsData = this.dataGrid.instance.getSelectedRowsData();
    if (this.selectedRowsData.length) {
      this.gridEvent.emit({
        type: 'onSelectionChanged',
        rowData: this.selectedRowsData[0],
        eventObj: e
      });
      return;
    }
    // ===== or when deferred selection is used =====
    // this.dataGrid.instance.getSelectedRowsData().then((selectedRowsData) => {
    // });
  }

  onFocusedCellChanging(e) {
    e.isHighlighted = true;
  }

  calculateCellValue(data) {
    return data.CompanyName + ' (ID' + data.ID + ')';
  }

  ngOnInit() {
  }

}
