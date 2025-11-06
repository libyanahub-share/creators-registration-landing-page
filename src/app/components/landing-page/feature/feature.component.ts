import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { translations } from '../../../translations';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  animations: [
    trigger('fadeInLeft', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('400ms ease-out'))
    ]),
    trigger('fadeInRight', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('400ms ease-out'))
    ])
  ]
})
export class FeatureComponent implements OnInit {
  selectedTab = 0;
  isMobile = false;
  isDesktop = false;
  translations = translations;

  // Animation states
  section1State = 'hidden';
  section2State = 'hidden';
  section3State = 'hidden';

  // Parallax scroll positions
  scrollY = 0;

  ngOnInit() {
    this.checkScreenSize();
    this.setupIntersectionObserver();
  }

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrollY = window.scrollY;
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    this.isDesktop = window.innerWidth >= 1200;
  }

  changeTab(index: number) {
    this.selectedTab = index;
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '-100px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          if (target.classList.contains('section-1')) {
            setTimeout(() => this.section1State = 'visible', 200);
          } else if (target.classList.contains('section-2')) {
            setTimeout(() => this.section2State = 'visible', 200);
          } else if (target.classList.contains('section-3')) {
            setTimeout(() => this.section3State = 'visible', 200);
          }
        }
      });
    }, options);

    setTimeout(() => {
      const section1 = document.querySelector('.section-1');
      const section2 = document.querySelector('.section-2');
      const section3 = document.querySelector('.section-3');

      if (section1) observer.observe(section1);
      if (section2) observer.observe(section2);
      if (section3) observer.observe(section3);
    }, 100);
  }

  getParallaxTransform(element: string): string {
    if (this.isMobile) return 'translateY(0)';

    const offset = this.scrollY * 0.1;

    switch(element) {
      case 'screen-left':
        return `translateY(${10 - offset}px)`;
      case 'screen-right':
        return `translateY(${10 - offset}px)`;
      default:
        return 'translateY(0)';
    }
  }
}
