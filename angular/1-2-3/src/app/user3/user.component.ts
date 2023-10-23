import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-user-form',
  // CHECKME: modified template
  template: `
  <form (ngSubmit)="doSubmit()" [formGroup]="form">
    <input formControlName="email" type="text" placeholder="email">
    <input formControlName="name" type="text" placeholder="name">
    <input formControlName="birthday" type="date" placeholder="birthday">
    <ng-container formGroupName="address">
      <input formControlName="zip" type="number" placeholder="zip">
      <input formControlName="city" type="text" placeholder="city">
    </ng-container>
    <p>Form Status: {{ form.status }}</p>
    <button type="submit" [disabled]="!form.valid">Submit</button>
  </form>
  `
})
export class UserComponent implements OnInit {

  @Output()
  event = new EventEmitter<UserModel>;
  
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // CHECKME: use Angular Reactive Forms
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.maxLength(128)]],
      birthday: ['', this.dateValidator()],
      address: this.formBuilder.group({
        zip: ['', [Validators.required]],
        city: ['', [Validators.required, Validators.pattern('[A-Za-z\s]*')]],
      }),
    });
  }

  doSubmit(): void {
    this.event.emit(this.form.value);
  }

  // CHECKME: custom validator  
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): Record<string, any> | null => {
      const today = new Date().getTime();
      if (!control?.value) {
        return null;
      }
      return new Date(control.value).getTime() <= today
        ? { invalidDate: 'You cannot choose a date less than today' } 
        : null;
    }
  }
}
