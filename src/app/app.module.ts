import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ToasterModule } from 'angular2-toaster';
import { PaginatorModule } from 'primeng/paginator';
import { AutoCompleteModule } from 'primeng/autocomplete';

import { AppComponent } from './app.component';
import { RankingComponent } from './ranking/ranking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { FooterComponent } from './footer/footer.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { AddSupplierComponent } from './suppliers/add-supplier/add-supplier.component';



@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    DashboardComponent,
    LeftSideBarComponent,
    HeaderComponent,
    CategoriesComponent,
    FooterComponent,
    AddCategoryComponent,
    SuppliersComponent,
    AddSupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToasterModule.forRoot(),
    PaginatorModule,
    AutoCompleteModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
