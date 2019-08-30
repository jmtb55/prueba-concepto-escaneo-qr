import {
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent;
  results: string = '';
  ngOnInit() {
    this.qrScannerComponent.getMediaDevices().then(devices => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('front')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe(result => {
      this.results = JSON.stringify({ result }, null, 2);
    });
  }

  ngOnDestroy() {
    
  }
}
