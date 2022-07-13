import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsInfiniteLoaderComponent } from './ps-infinite-loader/ps-infinite-loader.component';



@NgModule({
    declarations: [
        PsInfiniteLoaderComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class LoaderModule { }
