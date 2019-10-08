import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { ViewModel } from '../view-model';
import { RestHighlightService } from '../rest-highlight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  viewModel: ViewModel.Client;

  highlight: boolean;

  private subscription: Subscription;

  constructor(private restHighlightSvc: RestHighlightService) { }

  ngOnInit() {
    this.subscription = this.restHighlightSvc.data.subscribe(x => this.highlight = x);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private productIconCode(account: ViewModel.Account): string {
    if (account && account.product && account.product.productCode) {
      return account.product.productCode.substring(0, 3);
    }
    return 'CHQ';
  }

  accountKeys(): Array<string> {
    if (this.viewModel) {
      return Object.keys(this.viewModel.accounts);
    }
    return [];
  }

  icon(account: ViewModel.Account): string {
    return `/assets/${this.productIconCode(account)}.png`;
  }

  ngOnChanges() {
    if (this.viewModel && this.viewModel.accounts) {
      this.viewModel.accounts.sort((x, y) => {
        if (x.accountNumber > y.accountNumber) {
          return 1;
        }

        if (x.accountNumber < y.accountNumber) {
          return -1;
        }

        return 0;
      }
      );
    }
  }

}
