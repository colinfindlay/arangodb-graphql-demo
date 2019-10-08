import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SequenceService } from '../sequence.service';
import { Subscription } from 'rxjs';


declare var Diagram: any;


@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit, OnDestroy {

  @ViewChild('diagram', {static: true})
  diagramDiv: ElementRef;

  restCalls: number;

  databaseCalls: number;

  loading: boolean;

  subscriptions: Array<Subscription> = [];

  constructor(private sequenceService: SequenceService) { }

  ngOnInit() {
    this.subscriptions.push(this.sequenceService.restCalls.subscribe(x => this.restCalls = x));
    this.subscriptions.push(this.sequenceService.databaseCalls.subscribe(x => this.databaseCalls = x));
    this.subscriptions.push(this.sequenceService.calls.subscribe(x => this.updateDiagram(x)));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
  }

  updateDiagram(sequences: Array<string>) {
    this.diagramDiv.nativeElement.innerHTML = '<div id="diagram" style="text-align: center"></div>';
    if (sequences && sequences.length > 0) {
      this.loading = true;
      const diagram = Diagram.parse(sequences.join('\n'));
      diagram.drawSVG('diagram', {theme: 'simple'});
      this.loading = false;
    }
  }


}
