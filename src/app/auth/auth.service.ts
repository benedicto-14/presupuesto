import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { ACTIVAR_LOADING,DESACTIVAR_LOADING } from "../shared/ui.actions";
import { SET_USER,UN_SET_USER } from "./auth.actions";

import { Observable, Subscription } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from './user.model';
import { AppState } from '../app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscription:Subscription = new Subscription();
  usuario:User;

  constructor(
    private afAuth:AngularFireAuth,
    private ruta:Router,
    private toastr: ToastrService,
    private afStore:AngularFirestore,
    private store:Store<AppState>
    ) { }

  initUser():void {
    this.afAuth.authState.subscribe( fbUser => {

      if(fbUser){
        
        this.subscription = this.afStore.doc(`${fbUser.uid}/usuario`).valueChanges()
        .subscribe((userObj:any) => {

          const nuevoUser = new User(userObj.uid,userObj.nombre,userObj.email);
          this.store.dispatch(SET_USER({user:nuevoUser}));
          this.usuario = nuevoUser;
  
        });

      }else{
        this.subscription.unsubscribe();
      }
      
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

    this.store.dispatch(ACTIVAR_LOADING());

    this.afAuth.createUserWithEmailAndPassword(email,password).then((response:any) => {

      this.agregarUsuario(response.user.uid,nombre,email);

    }).catch(error => {
      
      this.store.dispatch(DESACTIVAR_LOADING());
      this.toastr.error(error.message, 'Error al crear cuenta', {
        timeOut: 3000,
      });

    });
  }

  getUsuario():User{
    return {...this.usuario};
  }

  agregarUsuario(uid:string, nombre:string,email:string){
    const user:User = {
      uid,
      nombre,
      email
    }
    this.afStore.doc(`${uid}/usuario`).set(user).then(()=>{
      
      this.store.dispatch(DESACTIVAR_LOADING());
      this.ruta.navigate(['/']);

    });
  }

  login(email:string, password:string):void{
    
    this.store.dispatch(ACTIVAR_LOADING());
    
    this.afAuth.signInWithEmailAndPassword(email, password).then(response => {
      //console.log(response);
      this.store.dispatch(DESACTIVAR_LOADING());
      this.ruta.navigate(['/']);

    }).catch(error => {
      //console.log(error);
      this.store.dispatch(DESACTIVAR_LOADING());
      this.toastr.error(error.message, 'Error al iniciar sesion', {
        timeOut: 3000,
      });
    });
  }

  logout():void{
    this.ruta.navigate(['/login']);
    this.afAuth.signOut();
    this.store.dispatch(UN_SET_USER({ user: new User('','','') }));
  }

}
