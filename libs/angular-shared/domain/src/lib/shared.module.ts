import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { USDatePipe } from './pipes/us-date.pipe';

@NgModule({
    declarations: [USDatePipe, SafeHtmlPipe],
    exports: [USDatePipe, SafeHtmlPipe],
})
export class SharedModule { }
