import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollHelperService {

  constructor() { }

  /**
       * Scroll to top
       */
  public scrollToTop() {
    window.scrollTo(0, 0);
  }

  /**
   * Scroll to bottom
   */
  public scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  /**
   * Scroll to element
   * @param elementId
   */
  public scrollToElement(elementId) {
    try {
      document.getElementById(elementId).scrollIntoView();
    } catch (err) { }
  }

}
