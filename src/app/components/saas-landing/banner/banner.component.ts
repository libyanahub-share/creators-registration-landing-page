import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit, OnDestroy {
  hide = false;
  showVideoDialog = false;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  }

  handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const elem = document.getElementById('banner-section');
    if (elem) {
      const elTop = elem.offsetTop - 200;
      const elBottom = elTop + elem.getBoundingClientRect().height;
      if (scrollTop > elTop && scrollTop < elBottom) {
        this.hide = false;
      } else {
        this.hide = true;
      }
    }
  }

  openVideoDialog() {
    this.showVideoDialog = true;
  }

  closeVideoDialog() {
    this.showVideoDialog = false;
  }
}
