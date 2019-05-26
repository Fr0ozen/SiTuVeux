import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerState } from '../_models/Spinner';


@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private loaderSubject = new Subject<SpinnerState>();
  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  show() {
    this.loaderSubject.next(<SpinnerState>{ show: true });
  }

  hide() {
    this.loaderSubject.next(<SpinnerState>{ show: false });
  }
}
