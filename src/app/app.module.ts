import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { RouterOutlet } from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";

import { AppComponent } from "./app.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzDropDownModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
