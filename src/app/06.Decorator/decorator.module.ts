import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DecoratorRoutingModule } from './decorator-routing.module';
import { DecoratorComponent } from './decorator/decorator.component';
import {AngularMaterialModule} from "../modules/angular-material.module";


@NgModule({
  declarations: [
    DecoratorComponent
  ],
  imports: [
    CommonModule,
    DecoratorRoutingModule,
    AngularMaterialModule
  ]
})
export class DecoratorModule { }
