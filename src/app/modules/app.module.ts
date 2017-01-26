import { NgModule }             from '@angular/core';
import { HttpModule }           from '@angular/http';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { NgxDatatableModule }   from '@swimlane/ngx-datatable';

import { AppComponent }         from '../components/app.component';
import { pageDeclarations }     from './declarations/page.declarations';
import { elementDeclarations }  from './declarations/element.declarations';
import { providerDeclarations } from './declarations/provider.declarations';

import { AppRoutingModule }     from './app-routing.module';
import { MaterializeDirective } from 'angular2-materialize';
import { LocalStorageModule }   from 'angular-2-local-storage';
import { HoursFormatPipe }      from '../pipes/hours-format.pipe';
import './rxjs-extensions';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgxDatatableModule,
    LocalStorageModule.withConfig({
      prefix: 'man-hour-manager',
      storageType: 'localStorage'
    })
  ],
  declarations: [
    AppComponent,
    ...pageDeclarations,
    ...elementDeclarations,
    MaterializeDirective,
    HoursFormatPipe
  ],
  bootstrap: [ AppComponent ],
  providers: [
    ...providerDeclarations
  ]
})
export class AppModule { }
