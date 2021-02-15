import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISingleRecordResult } from 'src/app/interfaces/isingle-record';
import { IRecords } from 'src/app/interfaces/irecords';
import { IPostResponse } from 'src/app/interfaces/ipost-response';

@Injectable({
  providedIn: 'root'
})
export class CrudDemoService {

  constructor(private http: HttpClient) { }

  private data: any[] = [];

  public getStates(): Observable<any> {
    return this.http.get('assets/states.json');
  }


  // ********************************************************** */
  // * G E T   A L L   R E C O R D
  // ********************************************************** */

  getRecord(id: number): Observable<ISingleRecordResult> {
    const URL = `${environment.baseURL}/api/demo/getsinglerecord/${id}`;
    console.log(URL);
    return this.http.get<ISingleRecordResult>(URL);
  }

  // ********************************************************** */
  // * G E T   S I N G L E   R E C O R D
  // ********************************************************** */

  getAll(): Observable<IRecords> {
    const URL = `${environment.baseURL}/api/demo/getall`;

    return this.http.get<IRecords>(URL);
  }

  // ********************************************************** */
  // * S A V E   F O R M   D A T A
  // ********************************************************** */

  add(formData: any): Observable<IPostResponse> {
    const URL = `${environment.baseURL}/api/demo/add`;

    const body = new HttpParams()
    .set('Text', formData.controls.Text.value)
    .set('Number', formData.controls.Number.value)
    .set('Boolean', formData.controls.Boolean.value)
    .set('JSDate', formData.controls.JSDate.value);

    return this.http.post<IPostResponse>(URL,
    body.toString(),
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  // ********************************************************** */
  // * U P D A T E   F O R M   D A T A
  // ********************************************************** */

  update(formData: any, id: number): Observable<IPostResponse> {

    const URL = `${environment.baseURL}/api/demo/update`;

    const body = new HttpParams()
    .set('Id', id.toString())
    .set('Text', formData.controls.Text.value)
    .set('Number', formData.controls.Number.value)
    .set('Boolean', formData.controls.Boolean.value)
    .set('JSDate', formData.controls.JSDate.value);
    console.log(formData);
    console.log(body);
    return this.http.post<IPostResponse>(URL,
    body.toString(),
    {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  // ********************************************************** */
  // * D E L E T E   R E C O R D
  // ********************************************************** */

  remove(id: number): Observable<IPostResponse> {
    const URL = `${environment.baseURL}/api/demo/remove/${id}`;

    return this.http.get<IPostResponse>(URL);
  }

}
