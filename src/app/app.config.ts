import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
} from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authHeaderInterceptor } from './core/interceptors/auth-header.interceptor';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export const IMAGE_BASE_URL = new InjectionToken<string>('IMAGE_BASE_URL');

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authHeaderInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      }),
    ),
    {
      provide: API_BASE_URL,
      useValue: 'https://api.themoviedb.org/3/',
    },
    {
      provide: IMAGE_BASE_URL,
      useValue: 'https://image.tmdb.org/t/p/original/',
    },
  ],
};
