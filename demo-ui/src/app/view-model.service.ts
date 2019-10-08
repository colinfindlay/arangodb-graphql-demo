import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ViewModel } from './view-model';

@Injectable({
  providedIn: 'root'
})
export class ViewModelService {

  private viewModelSubject = new BehaviorSubject<ViewModel.Client>(null);
  viewModel = this.viewModelSubject.asObservable();

  constructor() { }

  public next(client: ViewModel.Client) {
    this.viewModelSubject.next(client);
  }

}
