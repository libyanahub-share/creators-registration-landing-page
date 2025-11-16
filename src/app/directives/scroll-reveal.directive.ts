import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() appScrollReveal: string = 'fade-up';
  @Input() delay: number = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Add initial hidden state
    this.el.nativeElement.classList.add('scroll-reveal', `reveal-${this.appScrollReveal}`);
    this.el.nativeElement.style.setProperty('--reveal-delay', `${this.delay}ms`);

    // Adjust rootMargin based on viewport size
    // On mobile (< 768px), use smaller or no negative margin
    const isMobile = window.innerWidth < 768;
    const rootMargin = isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px';

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: rootMargin
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
