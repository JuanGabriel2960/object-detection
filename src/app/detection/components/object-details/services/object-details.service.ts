import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectDetailsService {

  public isOpen: boolean;

  statusChange: Subject<boolean> = new Subject<boolean>();
  constructor() {
    this.isOpen = false;
  }

  change(status: boolean) {
    this.isOpen = status;
    this.statusChange.next(this.isOpen);
  }
}
