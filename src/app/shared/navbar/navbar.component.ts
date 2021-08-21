import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit,OnDestroy {

  mail:string;
  subscription:Subscription = new Subscription()

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('auth')
    .pipe(
      filter(auth => auth.user.email != "")
    )
    .subscribe(auth => {
      this.mail = auth.user.email;
    });
  }

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

}
