import { JSDOM } from 'jsdom';

export function extractLead(article: string, maxLength: number): string {
    const { window } = new JSDOM('<!DOCTYPE html>');
    const div = window.document.createElement('div');
    div.innerHTML = article;
    const text = div.textContent || '';

    let truncated = text.substring(0, maxLength);
    if (text.length > maxLength) {
        truncated += '...';
    }
    return truncated;
}
