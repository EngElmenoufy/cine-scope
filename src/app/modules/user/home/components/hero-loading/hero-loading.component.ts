import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hero-loading',
  imports: [],
  templateUrl: './hero-loading.component.html',
  styleUrl: './hero-loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroLoadingComponent {}
