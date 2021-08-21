import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { ACTIVAR_LOADING, DESACTIVAR_LOADING } from '../shared/ui.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  datosfrom:FormGroup;
  tipo:string = 'ingreso';
  subscription:Subscription = new Subscription();
  cargando:boolean;

  constructor(
    private formBuiler:FormBuilder,
    private service:IngresoEgresoService,
    private toastr: ToastrService,
    private store:Store<AppState>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.subscription = this.store.select('ui').subscribe(state => {
      this.cargando = state.isLoading;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm(){
    this.datosfrom = this.formBuiler.group({
      descripcion:['',[Validators.required]],
      monto:[0,[Validators.min(1),Validators.required]]
    });
  }

  guardar():void{
    this.store.dispatch(ACTIVAR_LOADING());
    
    //se manda pares de la valores con el spred ...
    const ingresoEgreso = new IngresoEgreso({ ...this.datosfrom.value, tipo:this.tipo });
    
    this.service.guardar(ingresoEgreso).then(res => {

      this.store.dispatch(DESACTIVAR_LOADING());
      this.toastr.success('Se gurado correctamente', 'Guardado', {
        timeOut: 3000,
      });

    }).catch(error => {
      
      this.store.dispatch(DESACTIVAR_LOADING());
      this.toastr.error(error.message, 'Guardado', {
        timeOut: 3000,
      });
      
    });
    
    this.datosfrom.reset();
  }

}
