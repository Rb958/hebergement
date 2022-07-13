import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsSwitchComponent } from './ps-switch/ps-switch.component';
import { PsSearchComponent } from './ps-search/ps-search.component';



@NgModule({
    declarations: [
        PsSwitchComponent,
        PsSearchComponent
    ],
  exports: [
    PsSwitchComponent,
    PsSearchComponent
  ],
    imports: [
        CommonModule,
    ]
})
export class PsFormsModule {

}
