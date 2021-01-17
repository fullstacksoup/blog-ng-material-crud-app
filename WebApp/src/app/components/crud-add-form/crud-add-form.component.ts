import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CrudDemoService } from 'src/app/services/crud-demo.service';
import { DatePipe } from '@angular/common';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
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
  selector: 'crud-add-form',
  templateUrl: './crud-add-form.component.html',
  styleUrls: ['./crud-add-form.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CrudAddFormComponent implements OnInit, OnDestroy {
  @Output() recordChanged = new EventEmitter<boolean>();
  options: FormGroup;
  private subs = new Subscription();
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
              private demoSVC: CrudDemoService,
              public datepipe: DatePipe,
              private snackBar: MatSnackBar,
              ) { }

  ngOnInit() {
  //  this.showMessage = false;
    this.btnSubmitLabel = 'Save';
    this.isBtnSubmit = false;
    this.dataForm = this.fb.group({
      Text: [null, [Validators.required]],
      Number: [null, [Validators.required]],
      Boolean: [true],
      JSDate: [null]
    });
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
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

  onSubmit($event: any): void {

    const currentDate = this.datepipe.transform(this.date.value._d, 'yyyy-MM-dd');
    this.dataForm.controls.JSDate.setValue(currentDate);
    this.btnSubmitLabel = 'Saving...';
    this.isBtnSubmit = true;
    console.log('$event ', $event);
    console.log('this.dataForm: ', this.dataForm);
    this.subs.add(this.demoSVC.add(this.dataForm).subscribe((data) => {
      if (data.status === 200) {
        this.openSnackBar(data.msg, 'Close', 'mat-primary');
        this.recordChanged.emit(true);
        this.clearForm();

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

  clearForm() {
    this.dataForm.controls.Text.setValue('');
    this.dataForm.controls.Number.setValue(null);
    this.dataForm.controls.Text.setErrors(null);
    this.dataForm.controls.Number.setErrors(null);
    // this.dataForm.reset();
  }

}

