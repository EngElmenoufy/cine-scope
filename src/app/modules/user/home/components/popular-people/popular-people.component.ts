import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ExploreContentComponent } from '../explore-content/explore-content.component';
import { SliderComponent } from '../../../../../shared/components/slider/slider.component';
import { PeopleListService } from '../../../../../core/services/people-list.service';
import { People } from '../../../../../core/models/people.interface';
import { RoundedCardComponent } from '../../../../../shared/components/rounded-card/rounded-card.component';
import { RoundedCardLoadingComponent } from '../../../../../shared/components/loading/rounded-card-loading/rounded-card-loading.component';

@Component({
  selector: 'app-popular-people',
  imports: [
    ExploreContentComponent,
    SliderComponent,
    RoundedCardComponent,
    RoundedCardLoadingComponent,
  ],
  templateUrl: './popular-people.component.html',
  styleUrl: './popular-people.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopularPeopleComponent {
  private readonly peopleListService = inject(PeopleListService);

  popularPeople = signal<People[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getPopularPeople();
  }

  private getPopularPeople(): void {
    this.isLoading.set(true);

    this.peopleListService.getPopularPeople().subscribe({
      next: (res) => {
        this.popularPeople.set(res.results);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
