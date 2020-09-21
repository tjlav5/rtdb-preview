import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'rtdb-placeholder',
  template: '<div class="wrapper" [style.minHeight.em]="childrenCount + 1"><ng-content></ng-content></div>',
  // styles: [".wrapper {min-height: 1em}"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
  readonly element = this.elementRef.nativeElement;
  childrenCount = 0;

  constructor(private readonly elementRef: ElementRef) {}
}
