import { Component, OnInit } from '@angular/core';
import { Perspective } from 'src/app/model/perspective';
import { Pixel } from 'src/app/model/pixel';
import { MosaicService } from 'src/app/services/mosaic.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private service: MosaicService) { }

  loaded:boolean = false;
  pixelHasBeenSelected:boolean = false;

  ngOnInit(): void {
    this.refresh();
  }
  
  newPixel:Pixel = {x:0,y:0,hexColor:""};

  newPixelX:number = 0;
  async paint()
  {
    this.pixelHasBeenSelected = false;
    await this.service.PaintPixel(this.newPixel);
    await this.refresh();
  }
  async refresh()
  {
    this.service.getAllPixels().then(px => {
      if(px != null)
      {
        this.buildPerspective(px.pixels);
        this.loaded = true;
      }
    });    
  }

  perspective:Perspective = {rows:[]};

  buildPerspective(pixels: Pixel[]) {
    this.perspective = {rows:[]};
    pixels.forEach(pixel => {
      let rowIndex = pixel.x - 1;
      if(!this.perspective.rows[rowIndex])
        this.perspective.rows.push([]);
      this.perspective.rows[rowIndex].push(pixel);
    });
  }

  selectPixel(selectedPixel:Pixel){
    this.pixelHasBeenSelected =  true;
    this.newPixel = selectedPixel;    
  }
  
}
