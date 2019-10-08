import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ViewModel } from '../view-model';
import { ViewModelService } from '../view-model.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-iphone',
  templateUrl: './iphone.component.html',
  styleUrls: ['./iphone.component.css']
})
export class IphoneComponent implements OnInit, OnDestroy {

  viewModel: ViewModel.Client;

  private subscription: Subscription;

  constructor(private viewModelSvc: ViewModelService) { }

  ngOnInit() {
    this.subscription = this.viewModelSvc.viewModel.subscribe(x => setTimeout(y => this.viewModel = x, 100));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
