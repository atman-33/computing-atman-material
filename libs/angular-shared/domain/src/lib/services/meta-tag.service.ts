import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetaTagService {
    constructor(private titleService: Title, private meta: Meta) { }

    updateMetaTags(description: string, keywords: string, title: string, twittercard: string, twittersite: string, twitterimage: string, url: string): void {
        this.titleService.setTitle(title);
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'keywords', content: keywords });
        this.meta.updateTag({ name: 'twitter:card', content: twittercard });
        this.meta.updateTag({ name: 'twitter:site', content: twittersite });
        this.meta.updateTag({ property: 'og:url', content: url });
        this.meta.updateTag({ property: 'og:title', content: title });
        this.meta.updateTag({ property: 'og:description', content: description });
        this.meta.updateTag({ property: 'og:image', content: twitterimage });
    }
}
