import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort} from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { CrudDemoService } from 'src/app/services/crud-demo.service';
import * as XLSX from 'xlsx';
import { RecordModel } from 'src/app/models/crud-demo';
@Component({
  selector: 'crud-list',
  templateUrl: './crud-list.component.html',
  styleUrls: ['./crud-list.component.scss']
})
export class CrudListComponent implements OnInit, OnDestroy {
  @Input() changing: Subject<boolean>;
  @Output() editRecord = new EventEmitter<number>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('TABLE') table: ElementRef;
  // tslint:disable-next-line: max-line-length
  private displayedColumns: string[] = ['Edit', 'JSDate',  'Text', 'Number', 'Boolean',  'Remove'];
  private subs = new Subscription();
  private dataArr: any;
  public isLoadingResults: boolean;
  public showEditBtn: boolean;
  public recordEditId: number;
  public dataSource: MatTableDataSource<RecordModel>;
  constructor(private demoSVC: CrudDemoService,
              private snackBar: MatSnackBar) { }


  ngOnInit(): void  {
    this.loadData();
  }

  ngOnDestroy(): void {
     if (this.subs) {
      this.subs.unsubscribe();
     }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }


  public exportAsExcel(): void  {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement); // converts a DOM TABLE element to a worksheet
    // delete (ws['O1']);
    ws['!cols'] = [];
    ws['!cols'][0] = { hidden: true };
    // ws['!cols'][10] = { hidden: true };
    // delete (ws['01']);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    const filename = 'MRACCReport_' + formatDate(new Date(), 'MM-dd-yyyy', 'en') + '.xlsx';
    XLSX.writeFile(wb, filename);
    console.log(XLSX.utils.sheet_to_html(ws));
  }


  public loadData(): void  {
    this.recordEditId = 0;
    this.dataArr = [];
    this.showEditBtn = false;
    this.isLoadingResults = true; // To show loading animation while fetching data
    this.subs.add(this.demoSVC.getAll()
    .subscribe((data) => {
      console.log(data);
      this.dataArr = data;
      this.dataSource = new MatTableDataSource(this.dataArr.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isLoadingResults = false;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
  }

  public cancelUpdate(): void  {
    this.recordEditId = 0;
  }


  public onEdit(id: number): void {
    this.editRecord.emit(id);
    this.recordEditId = id;
  }


  public onDelete(id: number): void {
    this.subs.add(this.demoSVC.remove(id)
    .subscribe((data) => {
      this.openSnackBar(data.msg, 'Close');
      this.loadData();
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
  }

}
