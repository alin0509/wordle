import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _document?: Document;

  constructor(@Inject(DOCUMENT) document?: any) {
    this._document = document as Document;
  }

  setTheme(theme: string): void {
    this.setActiveTheme(theme);
  }

  private setActiveTheme(theme: string): void {
    this.loadStyle(`${theme}.css`);
  }

  loadStyle(styleName: string): void {
    const head = this._document?.getElementsByTagName('head')[0];
    let themeLink = this._document?.getElementById('theme') as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = styleName;
    } else {
      let style: any = this._document?.createElement('link');
      style.id = 'theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;
      head?.appendChild(style);
    }
  }
}
