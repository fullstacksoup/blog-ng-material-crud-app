import { ColorService } from './services/color.service';
/********************************************************************************/
/*                   A N G U L A R   L I B R A R I E S                    */
/********************************************************************************/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/********************************************************************************/
/*         A N G U L A R   M A T E R I A L   L I B R A R I E S                  */
/********************************************************************************/
import { DatePipe } from '@angular/common';
// Recommend Keeping Material Libraries separate to help reduce the module.ts file size
import { MaterialModule } from './material.module';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

/********************************************************************************/
/*                A P P L I C A T I O N   S E R V I C E S                  */
/********************************************************************************/

import { CrudDemoService } from 'src/app/services/crud-demo.service';

/********************************************************************************/
/*                A P P   C O M P O N E N T S                  */
/********************************************************************************/

import { GeoLocationService } from './services/geo-location.service';
import { CrudListComponent } from './components/crud-list/crud-list.component';
import { CrudLayoutComponent } from './components/crud-layout/crud-layout.component';
import { CrudAddFormComponent } from './components/crud-add-form/crud-add-form.component';
import { CrudEditFormComponent } from './components/crud-edit-form/crud-edit-form.component';
import { MainNavLayoutComponent } from './main-nav-layout/main-nav-layout.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    CrudListComponent,
    CrudLayoutComponent,
    CrudAddFormComponent,
    CrudEditFormComponent,
    MainNavLayoutComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule

    // RECOMMEND:  Using another module.ts file like material.module.ts instead of adding the Material libraries in the root or feature modules
    // Just remember when adding new components you might have to use
    // ng g c component-name --module=app

  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    DatePipe,
    CrudDemoService,
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
