import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-demos-basic-signals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="join">
      <button
        [disabled]="par() === 3"
        (click)="par.set(3)"
        class="btn join-item"
      >
        3
      </button>
      <button
        [disabled]="par() === 4"
        (click)="par.set(4)"
        class="btn join-item"
      >
        4
      </button>
      <button
        [disabled]="par() === 5"
        (click)="par.set(5)"
        class="btn join-item"
      >
        5
      </button>
    </div>

    <p>Hole is Par {{ par() }} You are on stroke {{ strokeCount() }}</p>

    <button (click)="takeAStroke()" class="btn btn-primary">
      Take a Swing (go to ) {{ nextShot() }}
    </button>
    <button
      [disabled]="strokeCount() === 0"
      (click)="strokeCount.set(0)"
      class="btn btn-warning"
    >
      Reset
    </button>

    @if (atPar()) {
      <div class="alert alert-info">You are At Par!</div>
    }
    @if (underPar()) {
      <p>You are under par</p>
    }
    @if (overPar()) {
      <p>You are over par!</p>
    }
  `,
  styles: ``,
})
export class BasicSignals {
  // GENIUS - zone.js -> Can't render anywhere but the browser (and it is slow), and can't use modern javascript stuff, like async/await.

  par = signal<3 | 4 | 5>(4);
  strokeCount = signal(0);
  nextShot = computed(() => this.strokeCount() + 1);
  atPar = computed(() => {
    return this.par() === this.strokeCount();
  });

  underPar = computed(() => {
    return this.par() - this.strokeCount() > 0;
  });

  overPar = computed(() => {
    return this.par() - this.strokeCount() < 0;
  });

  takeAStroke() {
    this.strokeCount.update((c) => c + 1);
  }
}
