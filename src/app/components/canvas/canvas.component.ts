import { Component, OnInit } from '@angular/core';
import { Pixel } from 'src/app/model/pixel';
import { MosaicService } from 'src/app/services/mosaic.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private service: MosaicService) { }

  pixels:Pixel[] = [];
  ngOnInit(): void {
    this.service.getAllPixels().then(px => {
      this.pixels = px;
    });
  }
}
