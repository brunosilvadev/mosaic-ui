import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pixel } from '../model/pixel';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MosaicService {

  baseUri:string = "https://collabcanvas-api.azurewebsites.net/";

  constructor(private client:HttpClient) { }
  async getAllPixels()
  {
    return await lastValueFrom(this.client.get<Pixel[]>(this.baseUri + "see"));
  }
  async PaintPixel(pixel:Pixel)
  {
    return await lastValueFrom(this.client.post(this.baseUri + "paint-canvas",pixel));
  }

}
