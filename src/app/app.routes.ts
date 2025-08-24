import type { Routes } from '@angular/router';
import { UserListComponent } from './features/users/user-list/user-list';

export const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
];
