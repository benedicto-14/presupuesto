import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { AppStateIE } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit,OnDestroy {

  ingresos:number;
  egresos:number;
  
  cuantosIngresos:number;
  cuantosEgresos:number;

  subscription:Subscription = new Subscription()

  constructor(private store:Store<AppStateIE>) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso').subscribe(ingresoEgreso => {
      this.contarIngresoEgreso(ingresoEgreso.items);
    });
  }

  contarIngresoEgreso(items:IngresoEgreso[]):void{

    this.ingresos = 0;
    this.egresos = 0;

    this.cuantosIngresos = 0;
    this.cuantosEgresos = 0;

    items.forEach(item => {
      
      if(item.tipo === "ingreso"){
        
        this.cuantosIngresos ++;
        this.ingresos += item.monto;

      }else{
        
        this.cuantosEgresos ++;
        this.egresos += item.monto;

      }

    });

  }

}
