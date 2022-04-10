import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DecoratorComponent} from "./decorator/decorator.component";

const routes: Routes = [
  {
    component: DecoratorComponent,
    path: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecoratorRoutingModule { }
