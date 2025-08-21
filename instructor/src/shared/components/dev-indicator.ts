import { Component, ChangeDetectionStrategy } from '@angular/core';
import { isDevMode } from '@angular/core';
@Component({
  selector: 'app-dev-indicator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (isDevMode) {
      <div
        class="bg-red-500 text-black font-bold font-mono p-8 border-2 border-yellow-400"
      >
        <ng-content />
      </div>
    }
  `,
  styles: ``,
})
export class DevIndicator {
  isDevMode = isDevMode();
}
