import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { WhySectionComponent } from '../why-section/why-section.component';
import { FeatureComponent } from '../feature/feature.component';
import { HowSectionComponent } from '../how-section/how-section.component';
import { FaqComponent } from '../faq/faq.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    WhySectionComponent,
    FeatureComponent,
    HowSectionComponent,
    FaqComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
