import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-page-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-nav.component.html',
  styleUrl: './page-nav.component.css'
})
export class PageNavComponent implements OnInit, OnDestroy {
  navItems: NavItem[] = [
    {
      id: 'banner-section',
      label: 'الرئيسية',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      active: true
    },
    {
      id: 'features',
      label: 'المميزات',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
      active: false
    },
    {
      id: 'testimonials',
      label: 'آراء المبدعين',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
      active: false
    },
    {
      id: 'pricing',
      label: 'الأسعار',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      active: false
    },
    {
      id: 'faq',
      label: 'الأسئلة الشائعة',
      icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      active: false
    },
    {
      id: 'news',
      label: 'الأخبار',
      icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
      active: false
    }
  ];

  showNav = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.updateActiveSection();
    }
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  updateActiveSection(): void {
    const scrollPosition = window.scrollY + 100;

    this.navItems.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetBottom = offsetTop + element.offsetHeight;

        item.active = scrollPosition >= offsetTop && scrollPosition < offsetBottom;
      }
    });

    // Show/hide nav based on scroll
    this.showNav = window.scrollY > 300;
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }
}
