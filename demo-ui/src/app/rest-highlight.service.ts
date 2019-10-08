import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestHighlightService {

  private dataSource = new BehaviorSubject<boolean>(false);
  data = this.dataSource.asObservable();

  constructor() { }

  highlight(highlight: boolean) {
    this.dataSource.next(highlight);
  }
}
