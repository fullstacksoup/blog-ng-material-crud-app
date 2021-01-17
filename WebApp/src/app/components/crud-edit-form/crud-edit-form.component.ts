import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
import { default as _rollupMoment} from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { CrudDemoService } from 'src/app/services/crud-demo.service';
import { Subscription } from 'rxjs';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'crud-edit-form',
  templateUrl: './crud-edit-form.component.html',
  styleUrls: ['./crud-edit-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CrudEditFormComponent implements OnInit, OnDestroy {
  @Output() recordUpdated = new EventEmitter<boolean>();
  public options: FormGroup;
  private subs = new Subscription();
  public date = new FormControl(moment());
  public btnSubmitLabel: string;
  public isBtnSubmit: boolean;
  public recordId: number;
  public hideRequiredControl = new FormControl(false);
  public durationInSeconds = 8;
  public showMessage: boolean;
  public booleanVal: boolean;

  constructor(private fb: FormBuilder,
              private demoSVC: CrudDemoService,
              public datepipe: DatePipe,
              private snackBar: MatSnackBar,
              ) { }

  public dataForm = this.fb.group({
    Text: [null, [Validators.required]],
    Number: [null, [Validators.required]],
    Boolean: [true],
    JSDate: [null]
  });

  ngOnInit(): void {
  //  this.showMessage = false;
    this.btnSubmitLabel = 'Save';
    this.isBtnSubmit = false;
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  openSnackBar(message: string, action: string, toolbarColor: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', toolbarColor]
    });
  }

  public onSubmit($event): void {
    const currentDate = this.datepipe.transform(this.dataForm.controls.JSDate.value, 'yyyy-MM-dd');
    // const currentDate = this.datepipe.transform(this.date.value._d, 'yyyy-MM-dd');
    this.dataForm.controls.JSDate.setValue(currentDate);
    this.btnSubmitLabel = 'Saving...';
    this.isBtnSubmit = true;
    console.log(' submit this.date: ', this.dataForm.controls);
    this.subs.add(this.demoSVC.update(this.dataForm, this.recordId).subscribe((data) => {
      console.log('Edit Form Submit: ', data);
      if (data.status === 200) {
        this.openSnackBar(data.msg, 'Close', 'mat-primary');
        this.recordUpdated.emit(true);
        this.dataForm.reset();
      } else {
        this.openSnackBar(data.msg, 'Close', 'mat-warn');
      }
      this.btnSubmitLabel = 'Save';
      this.isBtnSubmit = false;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
  }

  public loadRecord(id: number): void {
    this.recordId = id;  //  Used when the form is updated. The ID is passed from the list to the parent layout and down to this component.
    this.booleanVal = false;  // Initialize the boolean value first or the form will Angular Directive *ngIf will not render a null
    this.subs.add(this.demoSVC.getRecord(id).subscribe((record) => {
      this.dataForm = this.fb.group({
        Text: [record.data.Text, [Validators.required]],
        Number: [record.data.Number, [Validators.required]],
        Boolean: [record.data.Boolean],
        JSDate: [record.data.JSDate]
      });
      this.booleanVal = record.data.Boolean;
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    }));
  }

}

