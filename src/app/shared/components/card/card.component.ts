import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { Item } from '../../../core/models/item.interface';
import { CreateImageUrl } from '../../helpers/create-image-url';
import { DatePipe, DecimalPipe } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { RoundWithPipe } from '../../pipes/round-with.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-card',
  imports: [
    DecimalPipe,
    IconComponent,
    RouterLink,
    DatePipe,
    RoundWithPipe,
    ButtonComponent,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  data = input.required<Item>();
  type = input<'movie' | 'tv' | 'person'>();

  imageUrl = computed(() => CreateImageUrl(this.data().poster_path));
  name = computed(() => this.data().name ?? this.data().original_name);
}
