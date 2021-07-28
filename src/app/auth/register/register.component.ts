import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(
    private formBuild:FormBuilder,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.initForm();
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
