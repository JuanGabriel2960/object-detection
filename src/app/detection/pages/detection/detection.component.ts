import { Component, OnInit } from '@angular/core';
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as cocoSsd from '@tensorflow-models/coco-ssd'

@Component({
  selector: 'app-detection',
  templateUrl: './detection.component.html',
  styleUrls: ['./detection.component.css']
})
export class DetectionComponent implements OnInit {
  video: HTMLVideoElement

  constructor() { }

  ngOnInit(): void {
    this.checkMediaSource()
  }

  predictWithCocoModel = async () => {
    const model = await cocoSsd.load({
      base: 'lite_mobilenet_v2'
    })
    this.detectFrame(this.video, model)
  }

  checkMediaSource = () => {
    if (navigator && navigator.mediaDevices) {
      this.video = <HTMLVideoElement>document.getElementById("vid")

      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user'
        }
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
      this.renderPredictions(predictions)
      requestAnimationFrame(() => {
        this.detectFrame(video, model)
      })
    })
  }

  renderPredictions = (predictions: cocoSsd.DetectedObject[]) => {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");

    const ctx = canvas.getContext("2d");

    canvas.width = 300;
    canvas.height = 300;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.video, 0, 0, 300, 300);

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];

      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);

      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];

      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
    });
  }

}
