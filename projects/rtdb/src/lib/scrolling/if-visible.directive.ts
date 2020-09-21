import { Directive, TemplateRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ScrollHostDirective } from './scroll-host.directive';
import { PlaceholderComponent } from './placeholder.component';

@Directive({
  selector: '[rtdbIfVisible]'
})
export class IfVisibleDirective {
  elem: HTMLElement;
  visible = false;

  templateView = this.templateRef.createEmbeddedView({});
  wrapperFactory = this.resolver.resolveComponentFactory(PlaceholderComponent);

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private scrollHost: ScrollHostDirective
  ) {
    // console.log(this.viewContainer.element.nativeElement);
    const c = this.viewContainer.createComponent(this.wrapperFactory);
    this.elem = c.instance.element;
    scrollHost.registerItem(this);

    // onInit
    // inject a dummy div with height of ~50px
    // register it with the scrolling host
    //
    // updateVisibility
    // replace dummy div with templateRef
    //
    //
    // this.templateView = this.templateRef.createEmbeddedView({});
    // const compFactory = this.resolver.resolveComponentFactory(VisibleWrapper);
    // this.viewContainer.createComponent(
    //   compFactory,
    //   null,
    //   this.viewContainer.injector,
    //   [this.templateView.rootNodes]
    // );
  }

  ngDoCheck(): void {
    if (this.templateView) {
      this.templateView.detectChanges();
    }
  }

  toggleVisibility(visible: boolean) {
    if (this.visible === visible) {
      return;
    }

    this.viewContainer.clear();
    this.scrollHost.unregisterItem(this);
    if (visible) {
      // this.viewContainer.createEmbeddedView(this.templateRef);
      // this.viewContainer.element.nativeElement;
      const c = this.viewContainer.createComponent(
        this.wrapperFactory,
        null,
        this.viewContainer.injector,
        [this.templateView.rootNodes]
      );
      this.elem = c.instance.element;
      this.scrollHost.registerItem(this);
    } else {
      const c = this.viewContainer.createComponent(this.wrapperFactory);
      this.elem = c.instance.element;
      this.scrollHost.registerItem(this);
    }

    this.visible = visible;
  }
}
