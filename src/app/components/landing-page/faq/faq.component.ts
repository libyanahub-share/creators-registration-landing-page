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
      q: 'ما هي فكرة ليبيانا هب؟',
      a: 'ليبيانا هب هي منصة ليبية قيد التطوير تهدف لربط صناع المحتوى والخبراء الليبيين بجمهورهم. نحن نبني هذه المنصة بالتعاون مع المبدعين الأوائل الذين يسجلون معنا الآن، لنصمم تجربة تناسب احتياجاتهم الحقيقية.'
    },
    {
      q: 'هل المنصة جاهزة للاستخدام الآن؟',
      a: 'المنصة حالياً في مرحلة التطوير ونحن نجمع المبدعين المؤسسين الذين سيكونون جزءاً من رحلة بناء المنصة. بتسجيلك الآن، ستكون من أوائل من يختبر المنصة وتساهم بملاحظاتك في تشكيل مستقبلها.'
    },
    {
      q: 'ما الفائدة من التسجيل المبكر؟',
      a: 'المسجلون الأوائل سيحصلون على مزايا حصرية: أولوية في الظهور عند إطلاق المنصة، المشاركة في تحديد مميزات المنصة، دعم مباشر من فريق التطوير، وفرصة لبناء جمهورك من البداية مع نمو المنصة.'
    },
    {
      q: 'ماذا يحدث بعد تسجيلي؟',
      a: 'بعد التسجيل، سنراجع طلبك ونتواصل معك لفهم احتياجاتك بشكل أفضل. ستكون جزءاً من مجتمع المبدعين المؤسسين وسنبقيك على اطلاع بتطورات المنصة ومراحل الإطلاق القادمة.'
    },
    {
      q: 'هل هناك رسوم للتسجيل المبكر؟',
      a: 'التسجيل المبكر مجاني تماماً. نحن نريد بناء مجتمع من المبدعين الملتزمين قبل أن نحدد نموذج العمل النهائي. المسجلون الأوائل سيشاركون في تحديد هيكل الرسوم والعمولات بناءً على احتياجاتهم.'
    },
    {
      q: 'كيف سأعرف موعد إطلاق المنصة؟',
      a: 'سنتواصل معك عبر وسيلة التواصل التي اخترتها (بريد إلكتروني، رسائل نصية، أو واتساب) لإبقائك على اطلاع بجميع التطورات ومواعيد الاختبار والإطلاق الرسمي.'
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
