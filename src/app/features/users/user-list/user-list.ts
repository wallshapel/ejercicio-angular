import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { UserService } from '../../users/data-access/user';
import type { User } from '../../users/data-access/user';
import { UserFilterComponent } from '../../users/ui/user-filter/user-filter';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, UserFilterComponent],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly userService = inject(UserService);

  // Search field (maintains Two-Way Binding with ngModel)
  search = '';

  // Minimum local store for the filter (avoid prop-drilling for now)
  private readonly searchTerm$ = new BehaviorSubject<string>('');

  // Original list
  readonly users$ = this.userService.users$;

  // Filtered list (use async pipe in the view)
  readonly filteredUsers$ = combineLatest([this.users$, this.searchTerm$]).pipe(
    map(([users, term]) => {
      const q = term.trim().toLowerCase();
      if (!q) return users;
      return users.filter((u) => u.name.toLowerCase().includes(q));
    })
  );

  // Handles ngModel changes without manual subscriptions (avoids leaks)
  onSearch(term: string) {
    this.searchTerm$.next(term ?? '');
  }

  // Best practices: trackBy to avoid unnecessary renders
  trackById(_: number, u: User) {
    return u.id;
  }
}
