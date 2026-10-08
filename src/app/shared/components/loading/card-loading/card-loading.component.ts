import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-card-loading',
  imports: [],
  templateUrl: './card-loading.component.html',
  styleUrl: './card-loading.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardLoadingComponent {}
