import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css'
})
export class PricingComponent {
  plans: PricingPlan[] = [
    {
      name: 'المبتدئ',
      price: 'مجاناً',
      period: 'للأبد',
      description: 'مثالي للمبدعين الجدد الذين يريدون البدء',
      features: [
        'إنشاء حتى 3 دورات',
        'عدد غير محدود من الطلاب',
        'أدوات إنشاء محتوى أساسية',
        'دعم فني عبر البريد الإلكتروني',
        'تقارير أداء أساسية',
        'عمولة 20% على المبيعات'
      ]
    },
    {
      name: 'الاحترافي',
      price: '499',
      period: 'شهرياً',
      description: 'الأفضل للمدربين المحترفين',
      features: [
        'دورات غير محدودة',
        'عدد غير محدود من الطلاب',
        'كل أدوات إنشاء المحتوى',
        'دعم فني ذو أولوية',
        'تقارير وتحليلات متقدمة',
        'عمولة 10% فقط على المبيعات',
        'تخصيص كامل للصفحات',
        'شهادات إتمام مخصصة'
      ],
      popular: true
    },
    {
      name: 'المؤسسات',
      price: 'مخصص',
      period: 'حسب الطلب',
      description: 'حلول مخصصة للمؤسسات الكبيرة',
      features: [
        'كل مميزات الخطة الاحترافية',
        'نطاق مخصص خاص بك',
        'مدير حساب مخصص',
        'تكامل مع الأنظمة الخاصة',
        'دعم فني على مدار الساعة',
        'عمولة قابلة للتفاوض',
        'تدريب فريق العمل',
        'SLA مضمون'
      ]
    }
  ];
}
