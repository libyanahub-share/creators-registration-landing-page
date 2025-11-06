import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { CompanyLogoComponent } from '../company-logo/company-logo.component';
import { CounterComponent } from '../counter/counter.component';
import { FeaturesComponent } from '../features/features.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { PricingComponent } from '../pricing/pricing.component';
import { FaqComponent } from '../faq/faq.component';
import { NewsEventComponent } from '../news-event/news-event.component';
import { PageNavComponent } from '../page-nav/page-nav.component';
import { NotificationComponent } from '../notification/notification.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-saas-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerComponent,
    CompanyLogoComponent,
    CounterComponent,
    FeaturesComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    NewsEventComponent,
    PageNavComponent,
    NotificationComponent,
    FooterComponent
  ],
  templateUrl: './saas-landing-page.component.html',
  styleUrl: './saas-landing-page.component.css'
})
export class SaasLandingPageComponent {

}
