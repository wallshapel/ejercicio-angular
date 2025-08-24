import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { catchError, map, of, shareReplay } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly API = 'https://jsonplaceholder.typicode.com/users';

  /**
   * Stream of users with:
   * - map: guarantees array
   * - shareReplay({ refCount: true, bufferSize: 1 }): search without leaks
   * - catchError: the stream does not break (async pipe continues to work)
   */
  readonly users$: Observable<User[]> = this.http.get<User[]>(this.API).pipe(
    map(arr => (Array.isArray(arr) ? arr : [])),
    shareReplay({ bufferSize: 1, refCount: true }),
    catchError(() => of([]))
  );
}
