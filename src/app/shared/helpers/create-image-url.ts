import { inject } from '@angular/core';
import { IMAGE_BASE_URL } from '../../app.config';

export function CreateImageUrl(
  path: string | undefined | null,
  defaultImage?: string,
): string | null {
  const imageBaseUrl = 'https://image.tmdb.org/t/p/original';

  return path ? imageBaseUrl + path : (defaultImage ?? null);
}
