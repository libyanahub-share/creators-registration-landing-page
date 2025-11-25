import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-why-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './why-section.component.html',
  styleUrl: './why-section.component.scss'
})
export class WhySectionComponent {
  reasons = [
    {
      icon: 'trending-up',
      title: 'دخل مجزي وعمولات تنافسية',
      description: 'احصل على عمولات ممتازة تصل إلى 70% من المبيعات حسب الفئة. رسوم اشتراك منخفضة تبدأ من 30 دينار شهرياً فقط.'
    },
    {
      icon: 'users',
      title: 'الدفع عبر رصيد ليبيانا',
      description: 'ميزة حصرية تسهّل على عملائك الدفع برصيد الهاتف مباشرة - لا حاجة لبطاقات ائتمان دولية. وصول أسهل يعني المزيد من العملاء لك.'
    },
    {
      icon: 'zap',
      title: 'منصة ليبية بثقة ليبيانا',
      description: 'استفد من قوة علامة ليبيانا التجارية الموثوقة. محتوى باللغة العربية، دعم محلي، وفهم عميق للسوق والثقافة الليبية.'
    },
    {
      icon: 'award',
      title: 'دعم وتسويق مستمر',
      description: 'نوفر لك أدوات التسويق والتحليلات ولوحة تحكم احترافية لإدارة خدماتك. فريقنا هنا لدعمك في كل خطوة.'
    }
  ];
}
