import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(private clientSvc: ClientService) { }

  ngOnInit() {
  }

  select(client: string) {
    this.clientSvc.select(client);
  }

  selected(): string {
    return this.clientSvc.selected();
  }

}
