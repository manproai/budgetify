import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, observeOn, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isSpinnerVisible$: Subject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  getIsSpinnerVisible$() {
    return this.isSpinnerVisible$.asObservable().pipe(
      observeOn(asyncScheduler)
    )
  };

  showSpinner() {
    this.isSpinnerVisible$.next(true);
  }

  hideSpinner() {
    this.isSpinnerVisible$.next(false);
  }
}
