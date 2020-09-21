import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rtdb-rtdb',
  template: `
    <p>
      rtdb works test!
      <rtdb-foo></rtdb-foo>
    </p>
  `,
  styles: [
  ]
})
export class RtdbComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
