import { Component, OnInit } from '@angular/core';
import { Observable, Subject, concat, concatMap, debounceTime, distinctUntilChanged, filter, of, timer } from 'rxjs';
import { UserService } from '../user.service';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-users-1',
  template: `
    <input type="text" [(ngModel)]="query" (ngModelChange)="querySubject.next($event)">
    <div *ngFor="let user of users">
        {{ user.email }}
    </div>
  `
})
export class UserComponent implements OnInit {

  query = '';
  querySubject = new Subject<string>();

  users: { email: string; }[] = [];

  constructor(
    private userService: UserService
  ) {
  }

  // CHECKME: Is there a problem? and improve the code
  /*
   * Yes, there is a problem, with `timer(0, 60000).pipe(this.userService.findUsers(q))`
   * We are emitting with timer, but we are not chaining correctly with the call to the service: we need concatMap or similar:
   *   `timer(0, 60000).pipe(concatMap(() => this.userService.findUsers(q))`
   * Nevertheless, 60 minutes to emit again is quite unusual, and blocks the call to the service...
   * So that if we type a text in the input, we have to wait 1 hour...
   * 
   * I don't know the desired behavior, so it's hard to porpose an improvement...
   * I propose to call first the service without waiting. Then, wait for 300 milliseconds, so that we don't make unnecessary calls
   * 
   * If we want to wait for 1 hour to reload (unusual, but it depends on the application), we have the first subscription to do it
   */
  ngOnInit(): void {
    
    // CHECKME: first call
    this.userService.findUsers(this.query).subscribe({
      next: (res: UserModel[]) => this.users = res
    });
    
    const input$: Observable<string> = concat(
      of(this.query),
      this.querySubject.asObservable()
    );

    // input$.pipe(
    //   concatMap((q: string) =>
    //     timer(300).pipe(
    //       concatMap(() => this.userService.findUsers(q))
    //     )
    //   )
    // )
    // .subscribe({
    //   next: (res: UserModel[]) => this.users = res
    // });

    // CHECKME: call if user has typed
    input$.pipe(
      filter((q: string) => !!q),
      debounceTime(300),
      distinctUntilChanged(),
      concatMap((q: string) =>
        this.userService.findUsers(q))
      )
    .subscribe({
      next: (res: UserModel[]) => this.users = res
    });
  }
}
