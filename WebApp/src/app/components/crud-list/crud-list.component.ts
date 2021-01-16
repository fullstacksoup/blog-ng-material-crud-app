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
  displayedColumns: string[] = ['Edit', 'Text', 'Number', 'Boolean', 'JSDate',  'Remove'];
  private subs = new Subscription();
  private dataArr: any;
  public resultsLength = 0;
  public isLoadingResults = true;
  public isRateLimitReached = false;
  public showEditBtn: boolean;
  public recordEditId: number;
  public dataSource: any;

  constructor(private demoSVC: CrudDemoService,
              private snackBar: MatSnackBar) { }


  ngOnInit(): void  {
    this.recordEditId = 0;
    this.showEditBtn = false;
    this.subs.add(this.demoSVC.getAll()
    .subscribe((data) => {
      this.dataArr = data;
      this.dataSource = new MatTableDataSource(this.dataArr.data);
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
  }

  ngOnDestroy(): void {
     if (this.subs) {
      this.subs.unsubscribe();
     }
  }


  openSnackBar(message: string, action: string) {
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


  public reload(): void  {
    this.recordEditId = 0;
  //   this.subs.add(this.mraccSVC.getAllData()
  //   .subscribe((data) => {
  //     this.dataArr = data;
  //     this.dataSource = new MatTableDataSource(this.dataArr.data);
  //     this.dataSource.sort = this.sort;
  //     this.isLoadingResults = false;
  //   },
  //   (err: HttpErrorResponse) => {
  //     console.log(err);
  //   }));
  }

  public cancelUpdate(): void  {
    this.recordEditId = 0;
  }


  onEdit(id: number) {
    this.editRecord.emit(id);
    this.recordEditId = id;
  }



  onDelete(id: number) {
    // this.subs.add(this.mraccSVC.removeRecord(id)
    // .subscribe((data) => {
    //   this.openSnackBar(data.msg, 'Close');
    //   this.reload();
    // },
    // (err: HttpErrorResponse) => {
    //   console.log(err);
    // }));
  }



}
