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
      q: 'ما هي الفئات التي يمكنني التسجيل فيها؟',
      a: 'يمكنك التسجيل في فئة واحدة أو أكثر من الفئات السبع: الدورات التعليمية، الجلسات المباشرة الفردية، التدريب الرياضي، دروس الطبخ، الدورات التفاعلية، الاستشارات الصحية (للأطباء المرخصين)، والتطوير المهني. اختر ما يناسب خبراتك!'
    },
    {
      q: 'كم تبلغ نسبة العمولة التي سأحصل عليها؟',
      a: 'تختلف نسب العمولة حسب الفئة، وتتراوح من 70% إلى 95% من قيمة البيع. على سبيل المثال: الدورات التعليمية 70%، الجلسات المباشرة 90-95%، التدريب الرياضي 80-85%. جميع النسب تنافسية جداً مقارنة بالمنصات الدولية.'
    },
    {
      q: 'كيف سأحصل على أرباحي؟',
      a: 'يتم تحويل أرباحك إلى حسابك البنكي شهرياً. نوفر أيضاً خيار التحويل عبر رصيد ليبيانا أو الدفع نقداً. يمكنك متابعة أرباحك وإحصائياتك من لوحة التحكم الخاصة بك في أي وقت.'
    },
    {
      q: 'هل أحتاج إلى معدات خاصة أو شهادات معينة؟',
      a: 'يعتمد ذلك على الفئة. الدورات التعليمية والطبخ تحتاج فقط لكاميرا وميكروفون جيدين. الجلسات المباشرة تحتاج لاتصال إنترنت مستقر. الاستشارات الصحية تتطلب ترخيص طبي معتمد. التدريب الرياضي يُفضّل شهادات تدريب ولكن ليست إلزامية إذا كانت لديك خبرة مثبتة.'
    },
    {
      q: 'كم تكلفة الاشتراك في المنصة؟',
      a: 'رسوم الاشتراك الشهري تبدأ من 30 دينار فقط وتصل إلى 100-150 دينار حسب الفئة ومستوى الخدمة. هذه الرسوم رمزية مقارنة بالعائد المتوقع، وتشمل استضافة المحتوى، نظام الدفع، الدعم الفني، وأدوات التسويق.'
    },
    {
      q: 'هل يمكنني تحديد أسعاري الخاصة؟',
      a: 'نعم بالتأكيد! أنت حر في تحديد أسعار خدماتك ودوراتك. نوفر لك إرشادات حول متوسط الأسعار في السوق الليبية لمساعدتك على المنافسة، لكن القرار النهائي يعود لك. يمكنك أيضاً تعديل الأسعار في أي وقت.'
    },
    {
      q: 'ما نوع الدعم الذي ستقدمونه لي كصانع محتوى؟',
      a: 'نوفر دعماً شاملاً: تدريب على استخدام المنصة، أدوات تسويقية لترويج خدماتك، دعم فني متواصل، لوحة تحكم بتحليلات مفصلة، ونصائح لتحسين أدائك. كما نساعدك في التسويق عبر قنوات ليبيانا الرسمية للوصول لآلاف العملاء المحتملين.'
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
