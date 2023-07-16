import { NgModule } from '@angular/core';
import { PrismModule } from './components/prism/prism.module';
import { ScrollTopDirective } from './directives/scroll-top.directive';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { USDatePipe } from './pipes/us-date.pipe';

// importing prismjs order is important! 
import 'prismjs/plugins/toolbar/prism-toolbar';

import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';

import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-visual-basic';
import 'prismjs/components/prism-xml-doc';

@NgModule({
  declarations: [ScrollTopDirective, USDatePipe, SafeHtmlPipe],
  exports: [ScrollTopDirective, USDatePipe, SafeHtmlPipe, PrismModule],
})
export class SharedModule { }
