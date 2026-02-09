import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * SHARED - Directive
 * Automatically focuses an element when the component initializes
 * Usage: <input appAutoFocus />
 */
@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements OnInit {
  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    // Use setTimeout to ensure the element is fully rendered
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }
}
