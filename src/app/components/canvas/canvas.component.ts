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
  loaded:boolean = false;

  ngOnInit(): void {
    this.refresh();
  }
  
  newPixel:Pixel = {x:0,y:0,hexColor:""};

  newPixelX:number = 0;
  async paint()
  {
    await this.service.PaintPixel(this.newPixel);
    await this.refresh();
  }
  async refresh()
  {
    this.service.getAllPixels().then(px => {
      if(px != null)
      {
        this.pixels = px.pixels;
        this.loaded = true;
      }
    });    
  }
}
