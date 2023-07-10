import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

/** innerHTML指定するときに、styleやclass定義などを除去せずにそのまま出力する
 * [innerHTML]="value | safeHtml"
 */
@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(html: any): SafeHtml {
        const result = this.sanitizer.bypassSecurityTrustHtml(html);
        return result;
    }
}