import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ToasterModule } from 'angular2-toaster';

import { AppComponent } from './app.component';
import { RankingComponent } from './ranking/ranking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    DashboardComponent,
    LeftSideBarComponent,
    HeaderComponent,
    CategoriesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
