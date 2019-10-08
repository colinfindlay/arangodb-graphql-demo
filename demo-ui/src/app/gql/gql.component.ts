import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { ViewModel } from '../view-model';
import { ViewModelService } from '../view-model.service';
import { SequenceService } from '../sequence.service';
import { ClientService } from '../client.service';


const GET_DATA = gql`
query GetClient($clientId: String!) {
  getClient(_key: $clientId){
    firstName
    lastName
    email
    accounts {
      accountNumber
      product {
        name
        productCode
      }
      branch {
        name
        sortCode
      }
      balance {
        value
      }
    }
  }
}
`;
@Component({
  selector: 'app-gql',
  templateUrl: './gql.component.html',
  styleUrls: ['./gql.component.css']
})
export class GqlComponent implements OnInit, OnDestroy {

  @Input()
  apolloClientName: string;

  client: ViewModel.Client;

  latency = 0;

  private querySubscription: Subscription;

  constructor(private apollo: Apollo,
              private viewModelSvc: ViewModelService,
              private sequenceSvc: SequenceService,
              private clientSvc: ClientService) { }

  ngOnInit() {

  }

  sequence() {

    const clientId = this.clientSvc.selected();
    const seq = this.sequenceSvc;
    seq.startGraphQLSequence(`Get Client ${clientId}`);

    seq.addSequence('GraphQL Service', 'Database', `Get Client ${clientId}`);
    seq.complete();

    this.client.accounts.forEach(x => {

      seq.addSequence('GraphQL Service', 'Database', `Get Account ${x.accountNumber}`);
      seq.complete();

      seq.addSequence('GraphQL Service', 'Database', `Get Product ${x.product.productCode}`);
      seq.complete();

      seq.addSequence('GraphQL Service', 'Database', `Get Balance ${x.accountNumber}`);
      seq.complete();

      seq.addSequence('GraphQL Service', 'Database', `Get Branch ${x.branch.sortCode}`);
      seq.complete();


    });

    seq.endGraphQLSequence(`Get Client ${clientId}`);
    seq.publish();

  }

  sequenceArango() {

    const clientId = this.clientSvc.selected();
    const seq = this.sequenceSvc;
    seq.startGraphQLSequence(`Get Client ${clientId}`);

    seq.addSequence('GraphQL Service', 'Database', `Get Client ${clientId}`);
    seq.complete();

    seq.endGraphQLSequence(`Get Client ${clientId}`);
    seq.publish();

  }

  call() {

    this.client = null;
    this.viewModelSvc.next(null);
    this.sequenceSvc.start();
    this.sequenceSvc.publish();

    setTimeout(() => {


      if (this.querySubscription) {
        this.querySubscription.unsubscribe();
      }

      const client = this.apolloClientName === 'arango' ? this.apollo.use('arango') : this.apollo;

      this.querySubscription = client.query<any>({
        query: GET_DATA,
        variables: {
          clientId: this.clientSvc.selected()
        }
      })
        .subscribe(({ data, loading }) => {
          this.client = data.getClient;
          this.viewModelSvc.next(data.getClient);
          if (this.apolloClientName === 'arango') {
            this.sequenceArango();
          } else {
            this.sequence();
          }
        });
    }, this.latency * 10);
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
