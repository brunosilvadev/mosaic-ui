import { Pixel } from "./pixel";

export interface Canvas {
    partitionKey: string;
    id: string;
    pixels: Pixel[];
  }
  