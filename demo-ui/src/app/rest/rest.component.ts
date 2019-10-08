import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestService } from '../rest.service';
import { SequenceService } from '../sequence.service';
import { Client, Account, Balance, Branch, Product } from '../model';
import { RestHighlightService } from '../rest-highlight.service';
import { ClientService } from '../client.service';
import { ViewModelService } from '../view-model.service';
import { ViewModel } from '../view-model';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {

  highlight: boolean;

  viewModel: ViewModel.Client;

  latency = 0;

  constructor(private rest: RestService,
              private sequence: SequenceService,
              private restHighlightService: RestHighlightService,
              private clientSvc: ClientService,
              private viewModelSvc: ViewModelService) { }

  ngOnInit() {

  }

  toggle(value: boolean) {
    this.restHighlightService.highlight(value);
  }

  accountViewModel(acct: Account): ViewModel.Account {
    return this.viewModel.accounts.find(x => x.accountNumber === acct.accountNumber);
  }

  private processBalance(acct: Account, balance: Balance): void {
    this.sequence.complete();
    const accountViewModel = this.accountViewModel(acct);
    accountViewModel.balance = balance;
    this.rest.getBranch(acct.sortCode).subscribe(x => setTimeout(() => this.processBranch(acct, x), this.latency * 10));
  }

  private processBranch(acct: Account, branch: Branch): void {
    this.sequence.complete();
    const accountViewModel = this.accountViewModel(acct);
    accountViewModel.branch = branch;
    this.rest.getProduct(acct.productCode).subscribe(x => setTimeout(() => this.processProduct(acct, x), this.latency * 10));
  }

  private processProduct(acct: Account, product: Product): void {
    this.sequence.complete();
    const accountViewModel = this.accountViewModel(acct);
    accountViewModel.product = product;
    this.viewModelSvc.next(this.viewModel);
    this.sequence.publish();
  }

  private processClient(client: Client): void {
    this.sequence.complete();
    this.viewModel = {
      firstName: client.firstName,
      lastName: client.lastName,
      accounts: []
    };
    client.accounts.forEach(x => this.rest.getAccount(x).subscribe(acct => setTimeout(() => this.processAccount(acct), this.latency * 10)));
  }

  private processAccount(acct: Account): void {
    this.sequence.complete();
    this.viewModel.accounts.push({
      accountNumber: acct.accountNumber,
      product: null,
      balance: null,
      branch: null,
      productCode: acct.productCode
    });
    this.rest.getBalance(acct.accountNumber).subscribe(x => setTimeout(() => this.processBalance(acct, x), this.latency * 10));
  }

  call() {
    this.viewModel = null;
    this.viewModelSvc.next(null);
    this.sequence.start();
    const clientId = this.clientSvc.selected();
    this.rest.getClient(clientId).subscribe(x => setTimeout(() => this.processClient(x), this.latency * 10));
  }

}
