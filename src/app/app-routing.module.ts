import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth/auth-guard.service";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";

const rutas:Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { 
        path: '', 
        loadChildren: () => import('./ingreso-egreso/ingreso-egreso.module')
        .then(m => m.IngresoEgresoModule),
        canLoad:[ AuthGuardService ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports:[ 
        RouterModule.forRoot( rutas ) 
    ],
    exports:[ 
        RouterModule
    ]
})

export class AppRoutingModule{}