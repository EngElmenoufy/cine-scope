import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ExploreContentComponent } from '../explore-content/explore-content.component';
import { SliderComponent } from '../../../../../shared/components/slider/slider.component';
import { CardComponent } from '../../../../../shared/components/card/card.component';
import { Item } from '../../../../../core/models/item.interface';
import { TrendingService } from '../../../../../core/services/trending.service';
import { CardLoadingComponent } from '../../../../../shared/components/loading/card-loading/card-loading.component';

@Component({
  selector: 'app-trending-now',
  imports: [
    ExploreContentComponent,
    SliderComponent,
    CardComponent,
    CardLoadingComponent,
  ],
  templateUrl: './trending-now.component.html',
  styleUrl: './trending-now.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingNowComponent implements OnInit {
  private readonly trendingService = inject(TrendingService);

  trendingAll = signal<Item[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.getTrendingAll();
  }

  private getTrendingAll(): void {
    this.isLoading.set(true);

    this.trendingService.trendingAll('day').subscribe({
      next: (res) => {
        this.trendingAll.set(res.results);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
