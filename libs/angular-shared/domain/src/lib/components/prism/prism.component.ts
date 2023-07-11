import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'computing-atman-material-prism',
  templateUrl: './prism.component.html',
  styleUrls: ['./prism.component.scss'],
})
export class PrismComponent implements AfterViewInit, OnChanges {
  @ViewChild('codeEle') codeEle!: ElementRef;
  @Input() code?: string;
  @Input() language?: string;

  ngAfterViewInit() {
    Prism.highlightElement(this.codeEle.nativeElement);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ngOnChanges(changes: any): void {
    if (changes?.code) {
      if (this.codeEle?.nativeElement) {
        this.codeEle.nativeElement.textContent = this.code;
        Prism.highlightElement(this.codeEle.nativeElement);
      }
    }
  }
}