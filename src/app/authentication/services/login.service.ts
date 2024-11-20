import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string; 
}

@Injectable({
  providedIn: 'root' // This means the service is available globally in the app
})
export class LoginService {

  constructor() { }
  private users: User[] = [
    {
      email: 'admin@gmail.com',
      password: 'Admin123',
      id: 1,
      name: 'Admin Girly',
      role: 'admin'
    },
    {
      email: 'pup@gmail.com',
      password: 'Pup12345',
      id: 2,
      name: 'Pup Dude',
      role: 'pup'
    },
    {
      email: 'organizer@gmail.com',
      password: 'Organizer123',
      id: 3,
      name: 'Organizer Mate',
      role: 'organizer'
    },
    {
      email: 'user@gmail.com',
      password: 'User12345',
      id: 4,
      name: 'User Girly',
      role: 'user'
    }
  ];

  loginUser(email: string, password: string): Observable<User | null> {

    const foundUser = this.users.find(user => user.email === email && user.password === password);

    return of(foundUser || null);

  }
}
