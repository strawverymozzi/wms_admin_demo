import { Component } from '@angular/core';

@Component({
  selector: 'app-wms',
  template: `
  <router-outlet></router-outlet>
  <wms-search-helper></wms-search-helper>
`,
})
export class WmsComponent {

  constructor() { }
}
