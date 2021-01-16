import { Component, OnInit, ViewChild } from '@angular/core';
// import { MraccListComponent } from '../mracc-list/mracc-list.component';
// import { MraccDataEditFormComponent } from '../mracc-data-edit-form/mracc-data-edit-form.component';
// import { MraccDataFormComponent } from '../mracc-data-form/mracc-data-form.component';
// import { DashboardBarChartMraccRidershipComponent } from './../../../shared/charts/annual-charts/dashboard-bar-chart-mracc-ridership/dashboard-bar-chart-mracc-ridership.component';


@Component({
  selector: 'app-crud-layout',
  templateUrl: './crud-layout.component.html',
  styleUrls: ['./crud-layout.component.scss']
})
export class CrudLayoutComponent implements OnInit {
  // @ViewChild(MraccListComponent, {static: false}) childListComponent: MraccListComponent;
  // @ViewChild(MraccDataFormComponent, {static: false}) childFormComponent: MraccDataFormComponent;
  // @ViewChild(MraccDataEditFormComponent, {static: false}) childEditFormComponent: MraccDataEditFormComponent;
  // @ViewChild(DashboardBarChartMraccRidershipComponent, {static: false}) childBarChartComponent: DashboardBarChartMraccRidershipComponent;

  showEditRecord: boolean;
  recordId: number;
  chartHeightParentVal: number;
  isEditMode: boolean;
  constructor() { }

  public cancelUpdate() {
    this.showEditRecord = false;
//    this.childListComponent.cancelUpdate();
  }
  public reloadChildComp() {
  //   this.childListComponent.reload();
  //   this.childBarChartComponent.refreshChart();
 }
  public reloadChildCompUpdate() {
    this.showEditRecord = false;
    // this.childListComponent.reload();
    // this.childBarChartComponent.refreshChart();
  }


  public exportToExcel() {

  }
  public editRecord($event) {

    this.recordId = $event;
    if (this.showEditRecord) {
    } else {
      this.showEditRecord = true;
    }
    // this.childEditFormComponent.loadRecord(this.recordId);

  }


  ngOnInit() {
    this.chartHeightParentVal = 290;
    this.isEditMode = true;
  }

}
