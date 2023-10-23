import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-users-2',
  template: `
    <div *ngFor="let user of users">
        {{ user.name | capitalizeFirstWordPipe }}
    </div>
  `
})
export class UserComponent implements OnInit {

  @Input()
  users: { name: string; }[] = [];

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.userService.findUsers('').subscribe({
      next: (res: UserModel[]) => this.users = res
    })
  }
  
  // CHECKME: Improve performance
  /*
   * Instead of calling a function from the template we create a pipe
   * The pipe knows exactly when the data has changed; otherwise the template will call every time there is an event on the screen
   */
  // getCapitalizeFirstWord(name: string): string {
  //   return name.split(' ').map(n => n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()).join(' ');
  // }
}
