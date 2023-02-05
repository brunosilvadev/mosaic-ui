import {Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appEmoji]'
})
export class EmojiDirective {
  emoji?: string;
  constructor(private el: ElementRef) { }
  
  ngOnInit() {
    this.el.nativeElement.textContent +=  '🖌️';
  }

}
