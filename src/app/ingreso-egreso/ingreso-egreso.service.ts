import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AuthService } from '../auth/auth.service';
import { SET_ITEMS, UNS_SET_ITEMS } from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  listener: Subscription = new Subscription()
  items: Subscription = new Subscription()

  constructor(
    private afStore:AngularFirestore,
    private auth:AuthService,
    private store:Store<AppState>
  ) { }

  guardar(ingresoEgreso:IngresoEgreso){
    const user = this.auth.getUsuario();
    return this.afStore.collection(`${user.uid}/ingreso-egreso/items/`).add({...ingresoEgreso});
  }

  initIngresoEgresoListener():void{
    this.listener = this.store.select('auth')
    .pipe(
      filter(auth => auth.user.uid != "")
    )
    .subscribe(data => {
      this.ingresoEgresoItems(data.user.uid);
    });
  }

  private ingresoEgresoItems(uid:string){
    this.items = this.afStore.collection(`${uid}/ingreso-egreso/items`).snapshotChanges()
    .pipe(
      map( data => {
        return data.map((doc:any) => {
          return {
            uid: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      })
    )
    .subscribe((coleccion:any[]) => {
      this.store.dispatch(SET_ITEMS({ items:coleccion }));
    });
  }

  cancelarSubscription(){
    this.listener.unsubscribe();
    this.items.unsubscribe();
    this.store.dispatch(UNS_SET_ITEMS());
  }

  eliminarIgresoEgreso(uid:string):Promise<any>{
    const user = this.auth.getUsuario();
    return this.afStore.doc(`${user.uid}/ingreso-egreso/items/${uid}`).delete();
  }

}
