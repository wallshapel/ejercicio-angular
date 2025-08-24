import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { UserFilterComponent } from './user-filter';
import { By } from '@angular/platform-browser';

describe('UserFilterComponent', () => {
  let fixture: ComponentFixture<UserFilterComponent>;
  let component: UserFilterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFilterComponent], // standalone
    }).compileComponents();

    fixture = TestBed.createComponent(UserFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update local model and emit on input change', () => {
    const spy = jasmine.createSpy('searchSpy');
    component.searchChange.subscribe(spy);

    const inputDe = fixture.debugElement.query(By.css('#search'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;

    inputEl.value = 'Leanne';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.search).toBe('Leanne');
    expect(spy).toHaveBeenCalledWith('Leanne');
  });
});
