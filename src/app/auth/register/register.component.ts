import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm:FormGroup;
  cargando:boolean;
  subs:Subscription;

  constructor(
    private formBuild:FormBuilder,
    private auth:AuthService,
    private store:Store<AppState>
  ) { }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initForm();
    this.subs = this.store.select('ui').subscribe(state => {
      this.cargando = state.isLoading;
    });
  }

  initForm():void{
    const passmin = 4;

    this.registerForm = this.formBuild.group({
      nombre: ['',[Validators.required]],
      correo: ['',[Validators.required]],
      password: ['', [
        Validators.required, Validators.minLength(passmin)
      ]]
    });
  }

  register():void{ 
    if(this.registerForm.invalid){
      return;
    }
    const user = this.registerForm.value;
    this.auth.crearUser(user.nombre,user.correo,user.password);
  }

}
