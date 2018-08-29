import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './ranking/ranking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'categories', component: CategoriesComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
