import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { UserModel } from "./user.model";

@Injectable()
export class UserService {

  findUsers(q: string): Observable<UserModel[]> {
    // console.log(q)
    const users: UserModel[] = [
      {
        email: 'email 0',
        name: 'name 0',
        birthday: new Date(),
        address: {
            zip: 0,
            city: 'city 0'
        }
      },
      {
        email: 'email 1',
        name: 'name 1',
        birthday: new Date(),
        address: {
            zip: 1,
            city: 'city 1'
        }
      }
    ];
    // console.log(users.filter(u => u.email.includes(q)));
    return of(users.filter(u => u.email.includes(q)))
  }
}