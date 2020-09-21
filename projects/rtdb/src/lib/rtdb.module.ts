import { NgModule } from '@angular/core';
import { RtdbComponent } from './rtdb.component';
import { FooComponent } from './foo/foo.component';


@NgModule({
  declarations: [RtdbComponent, FooComponent],
  imports: [
  ],
  exports: [RtdbComponent],
  entryComponents: []
})
export class RtdbModule { }
