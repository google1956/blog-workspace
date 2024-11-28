import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';


@NgModule({
  imports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
  ],
  exports: [
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
  ]
})
export class CdkModule { }
