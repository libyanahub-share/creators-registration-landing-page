import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

interface NewsItem {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-news-event',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './news-event.component.html',
  styleUrl: './news-event.component.css'
})
export class NewsEventComponent {
  news: NewsItem[] = [
    {
      title: 'إطلاق ميزة البث المباشر للدورات',
      excerpt: 'نقدم لكم ميزة جديدة تتيح للمدربين تقديم دروس حية تفاعلية مع الطلاب في الوقت الفعلي',
      date: '15 نوفمبر 2025',
      category: 'تحديثات المنصة',
      image: '/images/saas/desktop_illustration.png',
      link: '/news/live-streaming-feature'
    },
    {
      title: 'ورشة عمل: كيف تنشئ دورة ناجحة',
      excerpt: 'انضم إلينا في ورشة عمل مجانية لتتعلم أفضل الممارسات لإنشاء محتوى تعليمي جذاب ومربح',
      date: '20 نوفمبر 2025',
      category: 'فعاليات',
      image: '/images/saas/app-counter.png',
      link: '/events/successful-course-workshop'
    },
    {
      title: 'تجاوزنا 10,000 مبدع على المنصة',
      excerpt: 'نحتفل بإنجاز جديد مع انضمام أكثر من 10,000 مدرب ومبدع لمنصتنا خلال العام الماضي',
      date: '1 نوفمبر 2025',
      category: 'أخبار',
      image: '/images/saas/faq.png',
      link: '/news/10k-creators-milestone'
    },
    {
      title: 'دليل شامل للتسويق الرقمي للدورات',
      excerpt: 'اكتشف استراتيجيات فعالة لتسويق دوراتك وزيادة مبيعاتك بطرق مبتكرة',
      date: '25 أكتوبر 2025',
      category: 'مقالات',
      image: '/images/saas/desktop_illustration.png',
      link: '/blog/digital-marketing-guide'
    },
    {
      title: 'تحديثات جديدة في لوحة التحكم',
      excerpt: 'حسّنا واجهة لوحة التحكم لتكون أكثر سهولة وفاعلية في إدارة دوراتك',
      date: '10 أكتوبر 2025',
      category: 'تحديثات المنصة',
      image: '/images/saas/app-counter.png',
      link: '/news/dashboard-updates'
    }
  ];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    arrows: true,
    rtl: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
}
