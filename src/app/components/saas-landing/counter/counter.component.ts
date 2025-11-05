import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnInit, OnDestroy {
  @ViewChild('counterSection') counterSection!: ElementRef;

  counters = [
    { icon: 'reply', value: 0, target: 12, suffix: ' شهر', label: 'تجربة مجانية' },
    { icon: 'people', value: 0, target: 80, prefix: '+', suffix: 'M', label: 'مستخدم نشط' },
    { icon: 'layers', value: 0, target: 180, prefix: '+', suffix: 'K', label: 'مبدع محترف' }
  ];

  hasAnimated = false;
  private observer?: IntersectionObserver;

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            setTimeout(() => this.animateCounters(), 500);
          }
        });
      }, { threshold: 0.5 });
    }
  }

  ngAfterViewInit() {
    if (this.observer && this.counterSection) {
      this.observer.observe(this.counterSection.nativeElement);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  animateCounters() {
    this.counters.forEach((counter, index) => {
      this.animateValue(index, 0, counter.target, 2000);
    });
  }

  animateValue(index: number, start: number, end: number, duration: number) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      this.counters[index].value = current;
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }
}
