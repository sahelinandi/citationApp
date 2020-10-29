
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  postLoginChangeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitPostLoginChange() {
      this.emitChangeSource.next();
  }
}
