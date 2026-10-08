import { Routes } from '@angular/router';
import { USER_ROUTES } from './modules/user/user.routes';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: USER_ROUTES,
  },
];
