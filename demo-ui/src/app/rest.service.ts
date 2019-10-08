import { Injectable } from '@angular/core';
import { TrackerService } from './tracker.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SequenceService } from './sequence.service';
import { Client, Account, Branch, Product, Balance } from './model';

@Injectable({
  providedIn: 'root'
})
export class RestService {


  constructor(private http: HttpClient, private sequenceService: SequenceService) { }


  public getClient(clientId: string): Observable<Client> {
    this.sequenceService.addSequence('Browser', 'Client Service', 'Get Client');
    this.sequenceService.addSequence('Client Service', 'Database', 'Get Client');
    return this.http.get<Client>(`/api/rest/client/${clientId}`);
  }

  public getAccount(accountId: string): Observable<Account> {
    this.sequenceService.addSequence('Browser', 'Account Service', `Get Account ${accountId}`);
    this.sequenceService.addSequence('Account Service', 'Database', `Get Account ${accountId}`);
    return this.http.get<Account>(`/api/rest/account/${accountId}`);
  }

  public getBranch(branchId: string): Observable<Branch> {
    this.sequenceService.addSequence('Browser', 'Branch Service', `Get Branch ${branchId}`);
    this.sequenceService.addSequence('Branch Service', 'Database', `Get Branch ${branchId}`);
    return this.http.get<Branch>(`/api/rest/branch/${branchId}`);
  }

  public getProduct(productCode: string): Observable<Product> {
    this.sequenceService.addSequence('Browser', 'Product Service', `Get Product ${productCode}`);
    this.sequenceService.addSequence('Product Service', 'Database', `Get Product ${productCode}`);
    return this.http.get<Product>(`/api/rest/product/${productCode}`);
  }

  public getBalance(accountId: string): Observable<Balance> {
    this.sequenceService.addSequence('Browser', 'Balance Service', `Get Balance ${accountId}`);
    this.sequenceService.addSequence('Balance Service', 'Database', `Get Balance ${accountId}`);
    return this.http.get<Balance>(`/api/rest/balance/${accountId}`);
  }
}
