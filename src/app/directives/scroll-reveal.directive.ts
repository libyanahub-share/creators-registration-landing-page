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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
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
