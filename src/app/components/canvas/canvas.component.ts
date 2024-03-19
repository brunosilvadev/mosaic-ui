import { Component, OnInit } from '@angular/core';
import { Perspective } from 'src/app/model/perspective';
import { Pixel } from 'src/app/model/pixel';
import { MosaicService } from 'src/app/services/mosaic.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private service: MosaicService, private cookieService: CookieService) { }

  loaded: boolean = false;
  pixelHasBeenSelected: boolean = false;
  userCanEdit: boolean = true;
  perspective: Perspective = { rows: [] };

  ngOnInit(): void {
    this.refresh();
    this.checkCookie();
  }

  newPixel: Pixel = { x: 0, y: 0, hexColor: "" };

  async paint() {
    this.pixelHasBeenSelected = false;
    await this.service.PaintPixel(this.newPixel);
    await this.refresh();
    this.writeCookie();
  }

  async refresh() {
    this.service.getAllPixels().then(px => {
      if (px != null) {
        this.buildPerspective(px.pixels);
        this.loaded = true;
      }
    });
  }

  checkCookie(): void {
    this.userCanEdit = !this.cookieService.check('userEdited');
  }

  writeCookie(): void {
    const expire = new Date();
    expire.setDate(expire.getDate() + 1);
    this.cookieService.set('userEdited','true',expire);
  }
  

  buildPerspective(pixels: Pixel[]) {
    this.perspective = { rows: [] };
    pixels.forEach(pixel => {
      let rowIndex = pixel.x - 1;
      if (!this.perspective.rows[rowIndex])
        this.perspective.rows.push([]);
      this.perspective.rows[rowIndex].push(pixel);
    });
  }

  selectPixel(selectedPixel: Pixel) {
    this.pixelHasBeenSelected = true;
    this.checkCookie();    
    this.newPixel = selectedPixel;
  }

}
