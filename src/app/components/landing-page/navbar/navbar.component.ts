import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { translations } from '../../../translations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isFixed = false;
  translations = translations;

  ngOnInit(): void {
    // Set Arabic and RTL permanently
    this.applyDirection();
  }

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scroll = window.pageYOffset || document.documentElement.scrollTop || 0;
    this.isFixed = scroll > 100;
  }

  applyDirection(): void {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('dir', 'rtl');
    htmlElement.setAttribute('lang', 'ar');
    document.body.classList.add('rtl');
  }
}
