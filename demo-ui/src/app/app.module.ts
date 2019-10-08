import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IphoneComponent } from './iphone/iphone.component';
import { AccountHomeComponent } from './account-home/account-home.component';
import { DashCardComponent } from './dash-card/dash-card.component';
import { ClientListComponent } from './client-list/client-list.component';
import { RestComponent } from './rest/rest.component';
import { GqlComponent } from './gql/gql.component';
import { SequenceComponent } from './sequence/sequence.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';



@NgModule({
  declarations: [
    AppComponent,
    IphoneComponent,
    AccountHomeComponent,
    DashCardComponent,
    ClientListComponent,
    RestComponent,
    GqlComponent,
    SequenceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OnsenModule,
    GraphQLModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
],
  bootstrap: [AppComponent]
})
export class AppModule {



}
