import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetectionComponent } from './pages/detection/detection.component';

@NgModule({
  declarations: [
    DetectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DetectionModule { }
