import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pixel } from '../model/pixel';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MosaicService {

  constructor(private client:HttpClient) { }
  async getAllPixels()
  {
    return await lastValueFrom(this.client.get<Pixel[]>("https://collabcanvas-api.azurewebsites.net/getAll"));
  }

}
