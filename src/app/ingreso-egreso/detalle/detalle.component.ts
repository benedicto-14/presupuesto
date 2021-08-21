import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit,OnDestroy {

  subscription:Subscription = new Subscription()
  items:IngresoEgreso[];

  constructor(
    private store:Store<AppState>,
    private service:IngresoEgresoService,
    private toastr: ToastrService
    ) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
    .pipe(
      filter(ingresoEgreso => ingresoEgreso.items.length > 0)
    )
    .subscribe(ingresoEgreso => {
      console.log(ingresoEgreso);
      this.items = ingresoEgreso.items;
    });
  }

  eliminarItem(uid:string | undefined):void{
    if(uid === undefined) return;
    this.service.eliminarIgresoEgreso(uid).then(res => {
      this.toastr.success('Se elimino correctamente', 'Eliminado', {
        timeOut: 3000,
      });
    });
  }

}
