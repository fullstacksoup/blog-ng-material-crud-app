import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
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
  @Output() recordChanged = new EventEmitter<boolean>();
  options: FormGroup;
  date = new FormControl(moment());
  btnSubmitLabel: string;
  isBtnSubmit: boolean;
  public dataForm: any;
  cDate: any;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  obsToUserSubscription: any; // Observable;
  obsSubscription: any;
  durationInSeconds = 8;
  showMessage: boolean;

  constructor(private fb: FormBuilder,
              public datepipe: DatePipe,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit() {
  //  this.showMessage = false;
    this.btnSubmitLabel = 'Save';
    this.isBtnSubmit = false;
    this.dataForm = this.fb.group({
      Title: [null, [Validators.required, Validators.min(1)]],
      Choice: [null, [Validators.required]],
      Boolean: [null, [Validators.required]],
      JSDate: [null, [Validators.required]]
    });
  }

  ngOnDestroy() {
    if (this.obsSubscription) {
      this.obsSubscription.unsubscribe();
    }
  }

  openSnackBar(message: string, action: string, toolbarColor: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', toolbarColor]
    });
  }

  dismiss() {
//    this.snackBar.dismiss();
  }

  onSubmit($event): void {
    console.log('submit');
    const currentDate = this.datepipe.transform(this.date.value._d, 'yyyy-MM-dd');
    this.dataForm.controls.ReportDate.setValue(currentDate);
    this.btnSubmitLabel = 'Saving...';
    this.isBtnSubmit = true;

    // this.obsSubscription = this.mraccSVC.addSingleRecord(this.dataForm).subscribe((data) => {
    //   if (data.status === 200) {
    //     this.openSnackBar(data.msg, 'Close', 'mat-primary');
    //     this.recordChanged.emit(true);
    //     this.dataForm.reset();
    //     this.dataForm.controls.ReportDate.setErrors(null);
    //     this.dataForm.controls.RAC.setErrors(null);
    //     this.dataForm.controls.T1.setErrors(null);
    //     this.dataForm.controls.T3.setErrors(null);
    //     this.dataForm.controls.WOWGain.setErrors(null);
    //     this.dataForm.controls.Average_Gain.setErrors(null);
    //     this.dataForm.controls.MovingWeeklyAverage.setErrors(null);
    //     this.dataForm.controls.NumberOfDays.setErrors(null);
    //     this.dataForm.controls.Gain.setErrors(null);
    //   } else {
    //     this.openSnackBar(data.msg, 'Close', 'mat-warn');
    //   }
    //   this.btnSubmitLabel = 'Save';
    //   this.isBtnSubmit = false;


    // },
    // (err: HttpErrorResponse) => {
    //   console.log(err);
    // });
  }

}

