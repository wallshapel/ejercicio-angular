import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './user-filter.html',
  styleUrls: ['./user-filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFilterComponent {
  /** Local two-way binding; no manual subscriptions */
  search = '';

  /** Emits the term to the parent (without unnecessary prop drilling) */
  @Output() searchChange = new EventEmitter<string>();

  onInput(value: string) {
    this.search = value ?? '';
    this.searchChange.emit(this.search);
  }
}
