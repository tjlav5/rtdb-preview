import { Directive, OnDestroy, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { IfVisibleDirective } from './if-visible.directive';

@Directive({
  selector: '[rtdbScrollHost]'
})
export class ScrollHostDirective implements OnDestroy, AfterViewInit {

  private readonly margin = "100%";

  private items = new Map<Element, IfVisibleDirective>();
  private intersectionObserver: IntersectionObserver;

  constructor(
    private elemRef: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersectionChange,
        {
          root: this.elemRef.nativeElement,
          rootMargin: this.margin,
          threshold: 0
        }
      );

      this.items.forEach(item => this.intersectionObserver.observe(item.elem));
    });
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  registerItem(item: IfVisibleDirective) {
    this.items.set(item.elem, item);

    if (this.intersectionObserver) {
      this.ngZone.runOutsideAngular(() => {
        this.intersectionObserver.observe(item.elem);
      });
    }
  }

  unregisterItem(item: IfVisibleDirective) {
    this.items.delete(item.elem);
    this.intersectionObserver.unobserve(item.elem);
  }

  private handleIntersectionChange = (entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      this.items.get(entry.target)?.toggleVisibility(entry.isIntersecting);
    });
  };
}
