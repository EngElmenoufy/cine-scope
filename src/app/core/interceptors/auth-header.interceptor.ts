import { HttpInterceptorFn } from '@angular/common/http';

export const authHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjgwNzRiY2M2MjBlMzU5MmY3NmZjMjg1ZmVlY2QwYSIsIm5iZiI6MTc3MzcyOTkxMi4yODYsInN1YiI6IjY5YjhmODc4MDc0ZmM4YjM0Njk2MDU0MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IAQNP7RZWQbHS5XbALY5scYLBfC1mgrarUu-1NCVOoE',
    },
  });

  return next(req);
};
