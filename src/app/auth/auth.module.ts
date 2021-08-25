import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
    declarations:[
        LoginComponent,
        RegisterComponent
    ],
    imports:[
        AngularFireAuthModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
    ],
})

export class AuthModule {}