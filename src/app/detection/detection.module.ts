import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DetectionComponent } from './pages/detection/detection.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ObjectDetailsComponent } from './components/object-details/object-details.component';

@NgModule({
  declarations: [
    DetectionComponent,
    FeedbackComponent,
    ObjectDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DetectionModule { }
