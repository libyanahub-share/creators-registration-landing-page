import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollRevealDirective } from '../../../directives/scroll-reveal.directive';
import { translations } from '../../../translations';

@Component({
  selector: 'app-how-section',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './how-section.component.html',
  styleUrl: './how-section.component.scss'
})
export class HowSectionComponent {
  translations = translations;

  constructor(private router: Router) {}

  steps = [
    {
      number: 1,
      title: 'سجّل بياناتك الأساسية',
      description: 'املأ نموذج التسجيل ببياناتك الشخصية ومعلومات الاتصال. اختر الفئات التي تود تقديم خدماتك فيها من بين 7 فئات متنوعة.'
    },
    {
      number: 2,
      title: 'أنشئ ملفك الشخصي',
      description: 'أضف سيرتك الذاتية، خبراتك، ومجالات تخصصك. قم بتحميل فيديو تعريفي قصير يعرّف بك وبما تقدمه.'
    },
    {
      number: 3,
      title: 'حدد خدماتك وأسعارك',
      description: 'اختر الخدمات التي ستقدمها (دورات، جلسات مباشرة، تدريب، استشارات) وحدد الأسعار المناسبة. يمكنك التعديل لاحقاً في أي وقت.'
    },
    {
      number: 4,
      title: 'ابدأ في مشاركة خبرتك',
      description: 'بمجرد الموافقة على ملفك، ستتمكن من البدء في تقديم خدماتك وكسب الدخل. سنعرض ملفك في المعرض القادم!'
    }
  ];

  t(key: string): string {
    return (translations as any)[key]?.['ar'] || '';
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
