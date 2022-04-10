import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ObjectDetailsService } from './services/object-details.service';
import * as cocoSsd from '@tensorflow-models/coco-ssd'

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
  isOpen: boolean;

  private _subscription: Subscription;
  constructor(private objectDetailsService: ObjectDetailsService) {
    this.isOpen = objectDetailsService.isOpen
    this._subscription = objectDetailsService.statusChange.subscribe((value) => {
      this.isOpen = value
    })
  }

  ngOnInit(): void {
  }

  closeObjectDetails() {
    this.objectDetailsService.change(false)
  }

}
