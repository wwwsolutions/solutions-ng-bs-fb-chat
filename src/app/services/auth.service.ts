import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from './alert.service';

import { AlertType } from '../enums/alert-type.enum';

import { Alert } from './../classes/alert';
import { User } from './../classes/user';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {
    // TODO fetch the user from the Firebase backend, then set the user
    this.currentUser = of(null);
  }

  public signup(firstName: string, lastName: string, email: string, password: string): Observable<boolean> {
    // TODO call Firebase signup function
    return of(true);
  }

  public login(email: string, password: string): Observable<boolean> {
    // TODO call Firebase login function
    return of(true);
  }

  public logout(): void {
    // TODO call Firebase logout function
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }
}
