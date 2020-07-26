import { Directive, ElementRef, Input, HostListener, OnInit } from '@angular/core';
import { SearchHelperService } from '../search-helper/search-helper.service.';
import { and, comparison, eq } from "rsql-builder";

@Directive({
  selector: '[lookUp]',
})
export class LookUpDirective implements OnInit {

  @Input('lookUp') lookUp: any;

  constructor(
    private el: ElementRef,
    private shService: SearchHelperService
  ) { }

  doLookUp(value: string) {
    const searchKey: string = this.lookUp['key'];
    const queryStr = and(comparison(searchKey, eq(value)));
    this.shService.getMapWithoutView(searchKey, queryStr).subscribe(
      res => {
        this.lookUp['callback'](res,value);
      }
    )
  }

  @HostListener("change", ["$event.target.value"])
  onChange(value) {
    if (value) {
      this.doLookUp(value);
    }
  }


  ngOnInit() {
  }
}

