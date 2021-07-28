import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.initForm();
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
