import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudListComponent } from './../crud-list/crud-list.component';
import { CrudEditFormComponent } from './../crud-edit-form/crud-edit-form.component';
@Component({
  selector: 'app-crud-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.scss']
})
export class CrudLayoutComponent implements OnInit {
  @ViewChild(CrudListComponent) childListComponent: CrudListComponent;
  @ViewChild(CrudEditFormComponent) childEditFormComponent: CrudEditFormComponent;

  public showEditRecord: boolean;
  public recordId: number;
  public chartHeightParentVal: number;
  public isEditMode: boolean;

  constructor() { }

  ngOnInit(): void {
    this.chartHeightParentVal = 290;
    this.isEditMode = true;
  }

  public cancelUpdate(): void {
    this.showEditRecord = false;
    this.childListComponent.loadData();
  }

  public onReloadList($event): void {
    this.showEditRecord = false;
    this.childListComponent.loadData();
  }

  public reloadChildCompUpdate(): void {
    this.showEditRecord = false;
  }

  public exportToExcel(): void {
     this.childListComponent.exportAsExcel();
  }

  public onEditRecord($event): void {
    this.recordId = $event;
    if (this.showEditRecord) {
    } else {
      this.showEditRecord = true;
    }
    // Delay to Render Edit Form Component before calling loadRecord()
    setTimeout(() => {
      this.childEditFormComponent.loadRecord(this.recordId);
    }, 200);
  }
}
