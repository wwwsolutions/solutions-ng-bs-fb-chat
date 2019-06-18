import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert } from './classes/alert';

import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public alerts: Array<Alert> = []
  public loading = false;

  constructor(
    private alertService: AlertService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {

    // SUBSCRIPTION [ALERT SERVICE]
    this.subscriptions.push(
      this.alertService.alerts.subscribe(alert => {
        this.alerts.push(alert);
      })
    )

    // SUBSCRIPTION [LOADING SERVICE]
    this.subscriptions.push(
      this.loadingService.isLoading.subscribe(isLoading => {
        this.loading = isLoading;
      })
    )

  }

  ngOnDestroy() {
    // UNSUSCRIBE
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
