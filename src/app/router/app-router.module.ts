import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetectionComponent } from '../detection/pages/detection/detection.component';

const routes: Routes = [
  {
    path: '',
    component: DetectionComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule { }
