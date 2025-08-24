import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App], // standalone root component
      providers: [
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a <router-outlet>', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const host: HTMLElement = fixture.nativeElement;
    expect(host.querySelector('router-outlet')).withContext('router-outlet missing').not.toBeNull();
  });

  it('should navigate to root and render the users table', async () => {
    // Arrange router + http mock
    const harness = await RouterTestingHarness.create();
    const httpMock = TestBed.inject(HttpTestingController);

    // Browse root
    await harness.navigateByUrl('/');

    // Respond to the call to the UserService API
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: 1, name: 'Leanne Graham', username: 'Bret', email: 'a@a', phone: '1', website: 'x' },
      { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'b@b', phone: '2', website: 'y' },
    ]);

    // Verify that the user table exists
    const host = harness.routeNativeElement as HTMLElement;
    expect(host.querySelector('table.users')).withContext('users table not rendered').not.toBeNull();

    httpMock.verify();
  });
});
