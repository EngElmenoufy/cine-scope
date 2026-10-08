import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { LinkComponent } from '../link/link.component';
import { ButtonComponent } from '../button/button.component';
import { ListComponent } from '../list/list.component';
import { GenresService } from '../../../core/services/genres.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  imports: [
    IconComponent,
    RouterLink,
    LinkComponent,
    ButtonComponent,
    ListComponent,
    SearchComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private readonly genresService = inject(GenresService);

  movieGenres = this.genresService.movieGenres;
  tvGenres = this.genresService.tvGenres;

  ngOnInit(): void {
    if (this.movieGenres().length === 0) {
      this.genresService.getAllMovieGenres().subscribe();
    }

    if (this.tvGenres().length === 0) {
      this.genresService.getAllTvGenres().subscribe();
    }
  }
}
