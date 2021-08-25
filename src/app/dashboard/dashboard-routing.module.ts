import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const rutas:Routes = [
  {
    path: '', 
    component: DashboardComponent, 
    children:dashboardRoutes, 
      /* canActivate:[AuthGuardService]  */
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutas)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
