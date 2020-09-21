import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: 'rtdb-placeholder',
  template: '<div class="wrapper"><ng-content></ng-content></div>',
  styles: [".wrapper {min-height: 1em}"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderComponent {
  readonly element = this.elementRef.nativeElement;

  constructor(private readonly elementRef: ElementRef) {}
}
