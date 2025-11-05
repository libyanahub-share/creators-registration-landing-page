import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FooterLink {
  title: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  footerSections: FooterSection[] = [
    {
      title: 'المنصة',
      links: [
        { title: 'عن المنصة', url: '/about' },
        { title: 'المميزات', url: '#features' },
        { title: 'الأسعار', url: '#pricing' },
        { title: 'الأسئلة الشائعة', url: '#faq' }
      ]
    },
    {
      title: 'للمبدعين',
      links: [
        { title: 'كيف تبدأ', url: '/getting-started' },
        { title: 'إنشاء دورة', url: '/create-course' },
        { title: 'مركز المساعدة', url: '/help' },
        { title: 'المدونة', url: '/blog' }
      ]
    },
    {
      title: 'الشركة',
      links: [
        { title: 'من نحن', url: '/about-us' },
        { title: 'الوظائف', url: '/careers' },
        { title: 'اتصل بنا', url: '/contact' },
        { title: 'الشركاء', url: '/partners' }
      ]
    },
    {
      title: 'قانوني',
      links: [
        { title: 'الشروط والأحكام', url: '/terms' },
        { title: 'سياسة الخصوصية', url: '/privacy' },
        { title: 'سياسة الاستخدام', url: '/usage-policy' },
        { title: 'سياسة الاسترجاع', url: '/refund-policy' }
      ]
    }
  ];

  socialLinks: SocialLink[] = [
    {
      name: 'فيسبوك',
      url: 'https://facebook.com',
      icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
    },
    {
      name: 'تويتر',
      url: 'https://twitter.com',
      icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z'
    },
    {
      name: 'إنستغرام',
      url: 'https://instagram.com',
      icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a4 4 0 014 4v11a4 4 0 01-4 4h-11a4 4 0 01-4-4v-11a4 4 0 014-4z'
    },
    {
      name: 'لينكد إن',
      url: 'https://linkedin.com',
      icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z'
    },
    {
      name: 'يوتيوب',
      url: 'https://youtube.com',
      icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z M9.75 15.02l5.75-3.27-5.75-3.27v6.54z'
    }
  ];
}
