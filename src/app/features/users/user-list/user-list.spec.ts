import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { UserListComponent } from './user-list';
import { UserService } from '../../users/data-access/user';
import type { User } from '../../users/data-access/user';

/** Data mock */
const MOCK_USERS: User[] = [
  { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', phone: '1', website: 'a' },
  { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv', phone: '2', website: 'b' },
  { id: 3, name: 'Clementine Bauch', username: 'Samantha', email: 'Nathan@yesenia.net', phone: '3', website: 'c' },
];

/** Simulated service */
class MockUserService {
  users$ = of(MOCK_USERS);
}

/** Fake filter component to NOT import Angular Material in tests */
@Component({
  selector: 'app-user-filter',
  standalone: true,
  imports: [CommonModule],
  template: `<input id="fake-search" (input)="emit($any($event.target).value)" />`,
})
class FakeUserFilterComponent {
  @Output() searchChange = new EventEmitter<string>();
  emit(v: string) {
    this.searchChange.emit(v);
  }
}

describe('UserListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  let component: UserListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent], // standalone
      providers: [{ provide: UserService, useClass: MockUserService }],
    })
      // We replace the imports of the component (Material + real filter) with the fake
      .overrideComponent(UserListComponent, {
        set: {
          imports: [CommonModule, FakeUserFilterComponent],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all rows initially', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(MOCK_USERS.length);

    // Quick content verification
    expect(rows[0].nativeElement.textContent).toContain('Leanne Graham');
    expect(rows[1].nativeElement.textContent).toContain('Ervin Howell');
  });

  it('should alternate row classes (even/odd)', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows[0].nativeElement.classList).toContain('row-even');
    expect(rows[1].nativeElement.classList).toContain('row-odd');
  });

  it('should filter by name when term is provided', () => {
    // Trigger the search from the component's public API.
    component.onSearch('Leanne');
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.textContent).toContain('Leanne Graham');
  });

  it('should show all again when term is cleared', () => {
    component.onSearch('Leanne');
    fixture.detectChanges();
    component.onSearch('');
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(MOCK_USERS.length);
  });

  it('should treat null term as empty (term ?? "") and show all rows', () => {
    // null -> onSearch should convert it to “” and not filter
    // @ts-expect-error we intentionally force null to cover the branch
    component.onSearch(null);
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(MOCK_USERS.length);
  });

  it('should trim whitespace-only term to empty and show all rows', () => {
    component.onSearch('   '); // only spaces -> trim() => “” -> does not filter
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(MOCK_USERS.length);
  });

});
