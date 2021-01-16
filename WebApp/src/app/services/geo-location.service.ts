import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class GeoLocationService {

  constructor(private http: HttpClient) { }

  //  Get JSON Data from file - states.json under src/assets/
  public getStates(): Observable<any> {
    return this.http.get('assets/states.json');
  }
}
