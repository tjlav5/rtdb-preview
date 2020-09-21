import { NgModule } from '@angular/core';
import { RtdbComponent } from './rtdb.component';
import { NodeComponent } from './node/node.component';
import { CommonModule } from '@angular/common';
import { ScrollHostDirective } from './scrolling/scroll-host.directive';
import { IfVisibleDirective } from './scrolling/if-visible.directive';
import { PlaceholderComponent } from './scrolling/placeholder.component';


@NgModule({
  declarations: [RtdbComponent, NodeComponent, ScrollHostDirective, IfVisibleDirective, PlaceholderComponent],
  imports: [
    CommonModule
  ],
  exports: [RtdbComponent],
  entryComponents: []
})
export class RtdbModule { }
