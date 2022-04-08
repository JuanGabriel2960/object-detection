import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetectionComponent } from './pages/detection/detection.component';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    DetectionComponent,
    VideoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DetectionModule { }
