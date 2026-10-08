import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { People } from '../../../core/models/people.interface';
import { CreateImageUrl } from '../../helpers/create-image-url';
import { RoundWithPipe } from '../../pipes/round-with.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rounded-card',
  imports: [RoundWithPipe, RouterLink],
  templateUrl: './rounded-card.component.html',
  styleUrl: './rounded-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoundedCardComponent {
  data = input.required<People>();

  imageUrl = computed(() => CreateImageUrl(this.data().profile_path));
}
