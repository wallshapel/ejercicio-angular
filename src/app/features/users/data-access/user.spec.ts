import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user';
import type { User } from './user';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const API = 'https://jsonplaceholder.typicode.com/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from API', () => {
    const mock: User[] = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
      },
    ];

    let result: User[] | undefined;
    service.users$.subscribe((v) => (result = v));

    const req = httpMock.expectOne(API);
    expect(req.request.method).toBe('GET');
    req.flush(mock);

    expect(result).toEqual(mock);
  });

  it('should return [] on error', () => {
    let result: User[] | undefined;
    service.users$.subscribe((v) => (result = v));

    const req = httpMock.expectOne(API);
    req.error(new ProgressEvent('Network error'), {
      status: 500,
      statusText: 'Server Error',
    });

    expect(result).toEqual([]);
  });

  it('should coerce non-array responses to []', () => {
    let result: User[] | undefined;
    service.users$.subscribe(v => (result = v));

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/users');
    expect(req.request.method).toBe('GET');

    // Non-array response to cover the ternary branch in map(...)
    const bogusResponse = { message: 'not an array' } as unknown as User[];
    req.flush(bogusResponse);

    expect(result).toEqual([]);
  });
});
