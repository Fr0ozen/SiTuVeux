import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from '../../_services/spinner.service';
import { SpinnerState } from '../../_models/Spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})

export class SpinnerComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    this.subscription = this.spinnerService.loaderState.subscribe((state: SpinnerState) => {
      this.show = state.show;
      if (state.show === true) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'visible';
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
