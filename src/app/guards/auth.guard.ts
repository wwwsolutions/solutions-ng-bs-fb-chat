import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AlertType } from './../enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from '../classes/alert';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | boolean> {
    return this.auth.currentUser.pipe(
      take(1),
      map(currentUser => !!currentUser),
      tap(loggedIn => {
        if (!loggedIn) {
          this.alertService.alerts.next(new Alert('You must be logged in to access that page.', AlertType.Danger));
          this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}});
        }
      })
    )
  }

}
