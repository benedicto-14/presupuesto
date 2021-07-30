import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm:FormGroup;
  cargando:boolean;
  subs:Subscription;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
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
    this.loginForm = this.formBuilder.group({
      correo: ['',[Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login():void{
    if(this.loginForm.invalid){
      return;
    }
    const user = this.loginForm.value;
    this.authService.login(user.correo,user.password);
  }

}
