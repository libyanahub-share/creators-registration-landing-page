import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = [
    {
      name: 'أحمد الشريف',
      role: 'مدرب تطوير ويب',
      avatar: '/images/avatars/pp_boy2.svg',
      rating: 5,
      text: 'منصة رائعة ساعدتني في الوصول لآلاف المتعلمين وتحقيق دخل ممتاز. الأدوات سهلة الاستخدام والدعم الفني ممتاز.'
    },
    {
      name: 'فاطمة محمد',
      role: 'مدربة تصميم جرافيك',
      avatar: '/images/avatars/pp_girl2.svg',
      rating: 5,
      text: 'أفضل قرار اتخذته هو الانضمام لهذه المنصة. استطعت مشاركة خبرتي وبناء مجتمع من المتعلمين المتحمسين.'
    },
    {
      name: 'خالد السعيد',
      role: 'مدرب تسويق رقمي',
      avatar: '/images/avatars/pp_boy3.svg',
      rating: 5,
      text: 'المنصة توفر كل الأدوات التي أحتاجها لإنشاء محتوى احترافي. الإحصائيات التفصيلية تساعدني في تحسين دوراتي باستمرار.'
    },
    {
      name: 'نورا العلي',
      role: 'مدربة لغة إنجليزية',
      avatar: '/images/avatars/pp_girl3.svg',
      rating: 5,
      text: 'واجهة المستخدم سهلة جداً وعملية إنشاء الدورات ممتعة. تمكنت من إطلاق أول دورة لي في أقل من أسبوع.'
    },
    {
      name: 'محمود حسن',
      role: 'مدرب برمجة',
      avatar: '/images/avatars/pp_boy4.svg',
      rating: 5,
      text: 'الدعم الفني ممتاز والمنصة مستقرة جداً. أنصح كل مبدع يريد مشاركة خبرته بالانضمام لهذه المنصة.'
    },
    {
      name: 'سارة الحسني',
      role: 'مدربة إدارة مشاريع',
      avatar: '/images/avatars/pp_girl4.svg',
      rating: 5,
      text: 'رحلتي كمدربة على هذه المنصة كانت رائعة. النظام يوفر كل ما أحتاجه لإدارة دوراتي ومتابعة طلابي.'
    }
  ];

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
