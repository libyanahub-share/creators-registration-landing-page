import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { translations } from '../../../translations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;

  // Video popup state
  isVideoPopupOpen = false;

  // Wave decoration visibility based on scroll
  hideWaveDecorations = false;

  // YouTube video configuration
  readonly videoId = 'KxZAdEGpYAw';
  readonly youtubeEmbedUrl = `https://www.youtube.com/embed/${this.videoId}?autoplay=1&controls=1&rel=0&showinfo=1&mute=0`;

  // Current language (Arabic only)
  currentLanguage: 'ar' = 'ar';
  translations = translations;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initial check for wave decorations
    this.handleScroll();
  }

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  @HostListener('window:scroll', [])
  handleScroll(): void {
    if (!this.heroSection) {
      return;
    }

    const doc = document.documentElement;
    const element = this.heroSection.nativeElement;
    const elTop = element.offsetTop - 200;
    const elBottom = elTop + element.getBoundingClientRect().height;

    if (doc.scrollTop > elTop && doc.scrollTop < elBottom) {
      this.hideWaveDecorations = false;
    } else {
      this.hideWaveDecorations = true;
    }
  }

  openVideoPopup(): void {
    this.isVideoPopupOpen = true;
    // Prevent body scroll when popup is open
    document.body.style.overflow = 'hidden';
  }

  closeVideoPopup(): void {
    this.isVideoPopupOpen = false;
    // Restore body scroll
    document.body.style.overflow = '';
  }

  // Close popup when clicking outside the video
  onPopupBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('video-popup-overlay')) {
      this.closeVideoPopup();
    }
  }

  // Navigate to registration page
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
