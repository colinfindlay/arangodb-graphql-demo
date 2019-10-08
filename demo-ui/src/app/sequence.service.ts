import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  private restCallsSubject = new BehaviorSubject<number>(0);
  restCalls = this.restCallsSubject.asObservable();

  private databaseCallsSubject = new BehaviorSubject<number>(0);
  databaseCalls = this.databaseCallsSubject.asObservable();

  private sequencesSubject = new BehaviorSubject<Array<string>>([]);
  calls = this.sequencesSubject.asObservable();

  constructor() { }

  private restCallsCount: number;

  private databaseCallsCount: number;

  private sequences = [];

  private returnSequences = [];

  public start() {
    this.sequences = [];
    this.returnSequences = [];
    this.updateRestCallCount(0);
    this.updateDatabaseCallCount(0);
    this.publish();
  }

  private updateRestCallCount(count: number) {
    this.restCallsCount = count;
    this.restCallsSubject.next(this.restCallsCount);
  }

  private updateDatabaseCallCount(count: number) {
    this.databaseCallsCount = count;
    this.databaseCallsSubject.next(this.databaseCallsCount);
  }

  public startGraphQLSequence(desc: string) {
    this.start();
    const sequence = 'Browser->GraphQL Service' + ': ' + desc;
    this.sequences.push(sequence);
    this.updateRestCallCount(1);
  }

  public endGraphQLSequence(desc: string) {
    const returnSequence = 'GraphQL Service-->>Browser' + ': ' + desc;
    this.returnSequences.push(returnSequence);
    this.complete();
  }

  public addSequence(from: string, to: string, desc: string): void {

    if (to === 'Database') {
      this.updateDatabaseCallCount(this.databaseCallsCount + 1);
    } else {
      this.updateRestCallCount(this.restCallsCount + 1);
    }

    const sequence = from + '->' + to + ': ' + desc;
    this.sequences.push(sequence);

    const returnSequence = to + '-->>' + from + ': ' + desc;
    this.returnSequences.push(returnSequence);

  }

  public addSequenceReturn(from: string, to: string, desc: string): void {
    const sequence = from + '-->>' + to + ': ' + desc;
    this.sequences.push(sequence);
  }

  public complete(): Array<string> {

    this.sequences = this.sequences.concat(this.returnSequences.reverse());
    this.returnSequences = [];

    return this.sequences;
   }

   public publish() {
    this.sequencesSubject.next(this.sequences);
   }

}
