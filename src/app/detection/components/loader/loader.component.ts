import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.loading = loaderService.loading
    this.subscription = loaderService.statusChange.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnInit(): void {
  }

}
