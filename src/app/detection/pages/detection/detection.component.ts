import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {
  currentStream: any

  constructor() { }

  ngOnInit(): void {
    this.checkMediaSource()
  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream
      }).catch(() => {
        console.log('error')
      })
    } else {
      console.log('error media')
    }
  }

}
