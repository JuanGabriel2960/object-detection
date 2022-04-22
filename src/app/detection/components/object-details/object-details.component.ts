import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Definition } from '../../interfaces';
import { ObjectDetailsService } from './services/object-details.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.css']
})
export class ObjectDetailsComponent implements OnInit {
  @Input() objects: any[] = []
  isOpen: boolean;
  index: number = 0
  meanings: Definition[] = [];

  private _subscription: Subscription;
  constructor(private objectDetailsService: ObjectDetailsService) {
    this.isOpen = objectDetailsService.isOpen
    this._subscription = objectDetailsService.statusChange.subscribe((value) => {
      this.isOpen = value
    })
  }

  ngOnInit(): void {
    this.objectDetailsService.getObjectMeaning(this.objects[this.index].class)
      .subscribe(resp => {
        this.meanings = resp[0].meanings[0].definitions
      }, (err) => {
        console.log(err)
        Swal.fire({ title: 'Error', text: 'There was a problem getting the object details.', icon: 'error', confirmButtonColor: '#ed8e24' })
      })
  }

  closeObjectDetails() {
    this.objectDetailsService.change(false)
  }

  changeIndex(type: 'next' | 'back') {
    switch (type) {
      case 'next':
        this.index++;
        return this.ngOnInit()
      case 'back':
        this.index--;
        return this.ngOnInit()
      default:
        return this.index;
    }
  }

}
