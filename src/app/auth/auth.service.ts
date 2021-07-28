import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth:AngularFireAuth,
    private ruta:Router,
    private toastr: ToastrService,
    private afStore:AngularFirestore
    ) { }

  initUser():void {
    this.afAuth.authState.subscribe( fbUser => {
      console.log(fbUser);
    });
  }

  isAuth():Observable<boolean>{
    return this.afAuth.authState.pipe(
      map( fbUser => {
        if(fbUser == null){
          this.ruta.navigate(['/login']);
        }
        //retorna falso o verdadero
        return fbUser != null;
      })
    );
  }

  crearUser(nombre:string, email:string, password:string):void{
    this.afAuth.createUserWithEmailAndPassword(email,password).then((response:any) => {

      this.agregarUsuario(response.user.uid,nombre,email);

    }).catch(error => {
      
      this.toastr.error(error.message, 'Error al crear cuenta', {
        timeOut: 3000,
      });

    });
  }

  agregarUsuario(uid:string, nombre:string,email:string){
    const user:User = {
      uid,
      nombre,
      email
    }
    this.afStore.doc(`${uid}/usuario`).set(user).then(()=>{
      this.ruta.navigate(['/']);
    });
  }

  login(email:string, password:string):void{
    this.afAuth.signInWithEmailAndPassword(email, password).then(response => {
      //console.log(response);
      this.ruta.navigate(['/']);
    }).catch(error => {
      //console.log(error);
      this.toastr.error(error.message, 'Error al iniciar sesion', {
        timeOut: 3000,
      });
    });
  }

  logout():void{
    this.ruta.navigate(['/login']);
    this.afAuth.signOut();
  }

}
