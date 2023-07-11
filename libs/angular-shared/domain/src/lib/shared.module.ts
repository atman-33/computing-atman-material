import { NgModule } from '@angular/core';
import { PrismComponent } from './components/prism/prism.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { USDatePipe } from './pipes/us-date.pipe';

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
  declarations: [USDatePipe, SafeHtmlPipe, PrismComponent],
  exports: [USDatePipe, SafeHtmlPipe, PrismComponent],
})
export class SharedModule {}
