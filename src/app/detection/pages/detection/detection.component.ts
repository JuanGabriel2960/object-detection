import { Component, OnInit } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { ObjectDetailsService } from '../../components/object-details/services/object-details.service';

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {

  video: HTMLVideoElement
  innerWidth = 0
  innerHeight = 0
  msg = ''
  objects: cocoSsd.DetectedObject[]

  constructor(private objectDetailsService: ObjectDetailsService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    this.checkMediaSource()
  }

  predictWithCocoModel = async () => {
    const model = await cocoSsd.load('lite_mobilenet_v2');
    this.detectFrame(this.video, model)
  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      this.video = <HTMLVideoElement>document.getElementById("vid")

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(mediaStream => {
        this.video.srcObject = mediaStream
        this.video.onloadedmetadata = () => {
          this.video.play()
          this.predictWithCocoModel()
        }
      }).catch(() => {
        console.log('Error: permissions not allowed.')
      })
    } else {
      console.log('Error: the browser does not support media devices.')
    }
  }

  detectFrame = (video: HTMLVideoElement, model: cocoSsd.ObjectDetection) => {
    model.detect(video).then(predictions => {
      this.objects = predictions
      this.renderPredictions(predictions)
      requestAnimationFrame(() => {
        this.detectFrame(video, model)
      })
    })
  }

  renderPredictions = (predictions: cocoSsd.DetectedObject[]) => {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.video, 0, 0, this.innerWidth, this.innerHeight);

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];

      ctx.strokeStyle = "#ed8e24";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = "#ed8e24";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];

      ctx.fillStyle = "#ffffff";
      ctx.fillText(prediction.class, x, y);
    });
  }

  takePhoto() {
    if (this.video.paused) {
      this.video.play()
    } else {
      this.video.pause()
    }
    
    console.log(this.objects)

    if (this.objects.length < 1) {
      this.msg = 'No objects detected'
      return
    }

    this.msg = `${this.objects.length} objects have been detected`
  }

  openObjectDetails() {
    if (this.objects.length < 1) {
      return
    }

    this.objectDetailsService.change(true)
  }

}
