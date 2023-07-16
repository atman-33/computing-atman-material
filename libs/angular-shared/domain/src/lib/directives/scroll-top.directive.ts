import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[appScrollTop]'
})
export class ScrollTopDirective {
    constructor(private elementRef: ElementRef) { }

    @HostListener('click')
    onClick(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
