import {Component, Injector, OnInit} from '@angular/core';
import {UrlState} from "../utils/url-state.decorator";

@Component({
  selector: 'app-decorator',
  templateUrl: './decorator.component.html',
  styleUrls: ['./decorator.component.scss']
})
export class DecoratorComponent implements OnInit {
  @UrlState({parseFct: (el) => el.toUpperCase()}) params!: { [key: string]: any }

  constructor(public injector: Injector) { }

  ngOnInit(): void {
  }

  public setQueryParams(): void {
    this.params = {
      decorator: 'cool'
    }
  }

  public resetQueryParams(): void {
    this.params = {
      decorator: null
    }
  }

}
