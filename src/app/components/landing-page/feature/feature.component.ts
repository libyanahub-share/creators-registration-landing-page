import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { translations } from '../../../translations';
import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

@Component({
  selector: 'app-feature',
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
export class FeatureComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  @ViewChild('tabContentWrapper') tabContentWrapper!: ElementRef;

  selectedTab = 0;
  isMobile = false;
  isDesktop = false;
  translations = translations;
  swiper?: Swiper;

  categories = [
    { id: 0, key: 'featureTab1' },
    { id: 1, key: 'featureTab2' },
    { id: 2, key: 'featureTab3' },
    { id: 3, key: 'featureTab4' },
    { id: 4, key: 'featureTab5' },
    { id: 5, key: 'featureTab6' }
  ];

  // Animation states
  section1State = 'hidden';
  section2State = 'hidden';
  section3State = 'hidden';

  // Parallax scroll positions
  scrollY = 0;

  // Touch/swipe tracking
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;
  private minSwipeDistance = 50;

  ngOnInit() {
    this.checkScreenSize();
    this.setupIntersectionObserver();
  }

  ngAfterViewInit() {
    if (this.isMobile && this.swiperContainer) {
      // Delay initialization to ensure DOM is fully rendered
      setTimeout(() => {
        this.initSwiper();
        this.setupSwipeGestures();
      }, 0);
    }
  }

  setupSwipeGestures() {
    if (!this.tabContentWrapper || !this.swiper) return;

    const element = this.tabContentWrapper.nativeElement;
    const tabPanel = element.querySelector('.tab-panel') as HTMLElement;

    if (!tabPanel) return;

    let isDragging = false;
    let startTranslate = 0;
    const swiperEl = this.swiper;

    tabPanel.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.changedTouches[0].clientX;
      this.touchStartY = e.changedTouches[0].clientY;
      isDragging = false;

      if (swiperEl) {
        startTranslate = swiperEl.getTranslate();
        swiperEl.wrapperEl.style.transitionDuration = '0ms';
      }
    }, { passive: true });

    tabPanel.addEventListener('touchmove', (e: TouchEvent) => {
      const currentX = e.changedTouches[0].clientX;
      const currentY = e.changedTouches[0].clientY;
      const deltaX = currentX - this.touchStartX;
      const deltaY = currentY - this.touchStartY;

      // Determine if horizontal swipe
      if (!isDragging && Math.abs(deltaX) > 10) {
        isDragging = Math.abs(deltaX) > Math.abs(deltaY);
      }

      // Move swiper with finger (inverted for RTL behavior)
      if (isDragging && swiperEl) {
        const isAtStart = this.selectedTab === 0;
        const isAtEnd = this.selectedTab === this.categories.length - 1;

        // Swipe right (positive deltaX) = go to next tab
        // Swipe left (negative deltaX) = go to previous tab
        const swipingToNext = deltaX > 0;
        const swipingToPrev = deltaX < 0;

        // Prevent movement at boundaries
        if ((isAtEnd && swipingToNext) || (isAtStart && swipingToPrev)) {
          // Apply strong resistance or no movement
          const resistedDelta = deltaX * 0.2;
          const newTranslate = startTranslate + (-resistedDelta); // Inverted
          swiperEl.setTranslate(newTranslate);
        } else {
          // Normal movement (inverted for RTL)
          const invertedDeltaX = -deltaX;
          const newTranslate = startTranslate + invertedDeltaX;
          swiperEl.setTranslate(newTranslate);
        }
      }
    }, { passive: true });

    tabPanel.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].clientX;
      this.touchEndY = e.changedTouches[0].clientY;

      if (swiperEl) {
        swiperEl.wrapperEl.style.transitionDuration = '';

        const deltaX = this.touchEndX - this.touchStartX;
        const isAtStart = this.selectedTab === 0;
        const isAtEnd = this.selectedTab === this.categories.length - 1;
        const swipingToNext = deltaX > 0;
        const swipingToPrev = deltaX < 0;

        // If at boundary and tried to swipe past it, snap back to current position
        if ((isAtEnd && swipingToNext) || (isAtStart && swipingToPrev)) {
          swiperEl.slideTo(this.selectedTab);
          isDragging = false;
          return;
        }
      }

      if (isDragging) {
        this.handleSwipeGesture();
      }

      isDragging = false;
    }, { passive: true });
  }

  handleSwipeGesture() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Check if horizontal swipe is more significant than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX > 0) {
        // Swipe right - go to next tab
        this.goToNextTab();
      } else {
        // Swipe left - go to previous tab
        this.goToPreviousTab();
      }
    }
  }

  goToNextTab() {
    if (this.selectedTab < this.categories.length - 1) {
      const nextIndex = this.selectedTab + 1;
      if (this.swiper) {
        this.swiper.slideTo(nextIndex);
      } else {
        this.changeTab(nextIndex);
      }
    }
  }

  goToPreviousTab() {
    if (this.selectedTab > 0) {
      const prevIndex = this.selectedTab - 1;
      if (this.swiper) {
        this.swiper.slideTo(prevIndex);
      } else {
        this.changeTab(prevIndex);
      }
    }
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperContainer.nativeElement, {
      modules: [Pagination],
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      spaceBetween: 12,
      initialSlide: 0,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },
      on: {
        slideChange: (swiper) => {
          this.selectedTab = swiper.activeIndex;
        }
      },
      speed: 300,
      loop: false,
      slideToClickedSlide: true
    });
  }

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  @HostListener('window:resize')
  onResize() {
    const wasMobile = this.isMobile;
    this.checkScreenSize();

    // Initialize or destroy swiper based on screen size change
    if (this.isMobile && !wasMobile && this.swiperContainer) {
      setTimeout(() => this.initSwiper(), 100);
    } else if (!this.isMobile && wasMobile && this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = undefined;
    }
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
    if (this.swiper) {
      this.swiper.slideTo(index);
    }
  }

  onCategoryChange(event: any) {
    this.selectedTab = Number(event.target.value);
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
