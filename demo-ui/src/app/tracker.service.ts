import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor() { }

  private requestCount: number;

  private requestSize: number;

  public track(requestSize: number) {
    this.requestSize += requestSize;
    this.requestCount++;
  }

  public getStatus(): any {
    return {
      requestCount: this.requestCount,
      requestSize: this.requestSize
    };
  }

}
