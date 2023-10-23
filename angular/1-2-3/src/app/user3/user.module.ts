import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [UserComponent],
  exports: [UserComponent]
})
export class UserModule { }