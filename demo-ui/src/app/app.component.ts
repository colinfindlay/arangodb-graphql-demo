import { Component } from '@angular/core';
import { ViewModel } from './view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'arango-graphql-demo-ui';

  viewModel: ViewModel.Client;


  onViewModelUpdate(clientViewModel: ViewModel.Client) {

    this.viewModel = clientViewModel;
  }
}
