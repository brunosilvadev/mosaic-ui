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
    this.buildPerspective();
    console.log(this.p);
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
  p:Perspective = {rows:[]} as Perspective;
  buildPerspective()
  {
    this.pixels.forEach(px => {
      let x = px.x - 1;
      if(!this.p.rows[x])
        this.p.rows.push([]);
      this.p.rows[x].push(px);
    });
  }
}
