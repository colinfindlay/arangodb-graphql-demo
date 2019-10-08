import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  private client = 'C0001';

  select(client: string) {
    this.client = client;
  }

  selected(): string {
    return this.client;
  }

}
