import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Renderer2,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Item } from '../../../core/models/item.interface';
import { CreateImageUrl } from '../../helpers/create-image-url';
import { RoundWithPipe } from '../../pipes/round-with.pipe';
import { IconComponent } from '../icon/icon.component';
import { LinkComponent } from '../link/link.component';
import { SearchService } from './../../../core/services/search.service';

@Component({
  selector: 'app-search',
  imports: [
    ReactiveFormsModule,
    LinkComponent,
    IconComponent,
    DatePipe,
    RoundWithPipe,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly searchService = inject(SearchService);
  private readonly renderer = inject(Renderer2);

  searchControl = new FormControl(null, [
    Validators.minLength(3),
    Validators.required,
  ]);
  list = signal<Item[]>([]);
  isLoading = signal<boolean>(false);
  isListOpened = signal<boolean>(false);

  constructor() {
    effect((onCleanUp) => {
      if (!this.isListOpened()) return;

      const unListen = this.renderer.listen(
        'document',
        'click',
        (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (!target.closest('app-search')) {
            this.isListOpened.set(false);
          }
        },
      );

      onCleanUp(() => {
        unListen();
      });
    });
  }

  generateImageUrl(path: string | undefined): string {
    return CreateImageUrl(path, 'default-poster.png')!;
  }

  onSearch(): void {
    if (this.searchControl.invalid) {
      this.isListOpened.set(false);
      return;
    }

    this.isListOpened.set(true);
    this.isLoading.set(true);
    this.searchService.searchMulti(this.searchControl.value!).subscribe({
      next: (res) => {
        this.list.set(res.results);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
