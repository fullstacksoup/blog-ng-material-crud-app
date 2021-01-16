import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ResponseModel, DataResultModel } from 'src/app/models/crud-demo';

@Injectable({
  providedIn: 'root'
})
export class CrudDemoService {

  constructor(private http: HttpClient) { }

  private data: any[] = [];

  // ********************************************************** */
  // * G E T   A L L   R E C O R D
  // ********************************************************** */

  getRecord(id: number): Observable<ResponseModel> {
    const URL = `${environment.baseURL}/api/demo/getsinglerecord/${id}`;
    console.log(URL);
    return this.http.get(URL);
  }

  // ********************************************************** */
  // * G E T   S I N G L E   R E C O R D
  // ********************************************************** */

  getAll(): Observable<DataResultModel> {
    const URL = `${environment.baseURL}/api/demo/getall`;
    console.log(URL);
    return this.http.get<DataResultModel>(URL);
  }

  // ********************************************************** */
  // * S A V E   F O R M   D A T A
  // ?
  // ********************************************************** */

  add(formData: any): Observable<any> {

    const URL = `${environment.baseURL}/api/demo/add`;
    // return this.http.get(URL);

    const body = new HttpParams()
    .set('Text', formData.controls.Text.value)
    .set('Number', formData.controls.Number.value)
    .set('Boolean', formData.controls.Boolean.value)
    .set('JSDate', formData.controls.JSDate.value);

    console.log('add page from Service', body);

    return this.http.post(URL,
    body.toString(),
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  // ********************************************************** */
  // * U P D A T E   F O R M   D A T A
  // ********************************************************** */

  update(formData: any, id: string): Observable<any> {

    const URL = `${environment.baseURL}/api/demo/update`;
    console.log(URL);

    const body = new HttpParams()
    .set('Id', id)
    .set('RAC', formData.controls.RAC.value)
    .set('T1', formData.controls.T1.value)
    .set('T3', formData.controls.T3.value)
    .set('WOWGain', formData.controls.WOWGain.value)
    .set('Average_Gain', formData.controls.Average_Gain.value)
    .set('MovingWeeklyAverage', formData.controls.MovingWeeklyAverage.value)
    .set('NumberOfDays', formData.controls.NumberOfDays.value)
    .set('Gain', formData.controls.Gain.value);

    // console.log('add page from Service', body);

    return this.http.post(URL,
    body.toString(),
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  // ********************************************************** */
  // * D E L E T E   R E C O R D
  // ********************************************************** */

  remove(id: number): Observable<ResponseModel> {
    const URL = `${environment.baseURL}/api/demo/remove/${id}`;
    console.log(URL);
    return this.http.get(URL);
  }

}
