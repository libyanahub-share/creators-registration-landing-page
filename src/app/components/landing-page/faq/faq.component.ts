import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { translations } from '../../../translations';

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {
  expandedIndex: number | false = 0;
  isMobile: boolean = false;
  translations = translations;

  faqs: FaqItem[] = [
    {
      q: 'كيف يمكنني التسجيل في الدورات؟',
      a: 'يمكنك التسجيل في الدورات بسهولة من خلال إنشاء حساب جديد على المنصة، ثم اختيار الدورة المناسبة والنقر على زر التسجيل.'
    },
    {
      q: 'هل الدورات مجانية أم مدفوعة؟',
      a: 'نقدم مجموعة متنوعة من الدورات المجانية والمدفوعة. يمكنك الاطلاع على تفاصيل كل دورة لمعرفة السعر والمحتوى المتاح.'
    },
    {
      q: 'هل أحصل على شهادة بعد إكمال الدورة؟',
      a: 'نعم، ستحصل على شهادة إتمام معتمدة بعد إكمال الدورة بنجاح واجتياز جميع الاختبارات المطلوبة.'
    },
    {
      q: 'كم من الوقت يستغرق إكمال الدورة؟',
      a: 'مدة الدورات تختلف حسب المحتوى، ولكن معظم الدورات مصممة لتكون مرنة ويمكنك إكمالها حسب وتيرتك الخاصة.'
    },
    {
      q: 'هل يمكنني الوصول إلى الدورات من أي مكان؟',
      a: 'نعم، يمكنك الوصول إلى جميع الدورات عبر الإنترنت من أي مكان وفي أي وقت يناسبك، باستخدام أي جهاز متصل بالإنترنت.'
    }
  ];

  constructor() {
    this.checkScreenSize();
  }

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  @HostListener('window:resize', [])
  onResize() {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 960;
  }

  toggleAccordion(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? false : index;
  }

  handleChange(index: number): void {
    this.toggleAccordion(index);
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }
}
