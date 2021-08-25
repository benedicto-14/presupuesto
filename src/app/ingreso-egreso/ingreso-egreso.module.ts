import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OdernarIngresoEgresoPipe } from './odernar-ingreso-egreso.pipe';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';

import { ingresoEgresoReducer } from './ingreso-egreso.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OdernarIngresoEgresoPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso',ingresoEgresoReducer)
  ]
})
export class IngresoEgresoModule { }
