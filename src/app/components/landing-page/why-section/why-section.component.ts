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
      title: 'سبب رقم 1',
      description: 'نص وصفي للسبب الأول. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    },
    {
      icon: 'users',
      title: 'سبب رقم 2',
      description: 'نص وصفي للسبب الثاني. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    },
    {
      icon: 'zap',
      title: 'سبب رقم 3',
      description: 'نص وصفي للسبب الثالث. سيتم استبداله بالمحتوى النهائي من فريق التسويق.'
    },
  ];
}
