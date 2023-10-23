import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [UserComponent],
  providers: [UserService],
  exports: [UserComponent]
})
export class UserModule { }