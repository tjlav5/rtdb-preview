import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { switchMapToViewModel } from '../view-model';

@Component({
  selector: 'rtdb-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NodeComponent {
  @Input()
  set ref(ref: firebase.database.Reference) {
    this.ref$.next(ref);
  }
  private readonly ref$ = new ReplaySubject<firebase.database.Reference>();

  viewModel$ = this.ref$.pipe(switchMapToViewModel());

  trackByKey(index: number, ref: firebase.database.Reference) {
    return ref.key;
  }
}
