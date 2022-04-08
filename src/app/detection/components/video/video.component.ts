import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef
  @Input() stream: any

  constructor() { }

  ngOnInit(): void {
  }

  loadedMetaData() {
    this.videoElement.nativeElement.play()
  }

  play() {

  }

}
