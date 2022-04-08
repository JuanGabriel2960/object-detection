import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRouterModule } from './router/app-router.module';
import { DetectionModule } from './detection/detection.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    DetectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
