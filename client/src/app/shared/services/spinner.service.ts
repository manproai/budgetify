import { Injectable } from '@angular/core';
import { asyncScheduler, BehaviorSubject, Observable, observeOn, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private isSpinnerVisible$: Subject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  getIsSpinnerVisible$(): Observable<boolean>  {
    return this.isSpinnerVisible$
      .asObservable()
      .pipe(observeOn(asyncScheduler));
  }

  showSpinner(): void {
    this.isSpinnerVisible$.next(true);
  }

  hideSpinner(): void {
    this.isSpinnerVisible$.next(false);
  }
}
