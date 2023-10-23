import { NgModule } from '@angular/core';

import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { CapitalizeFirstWordPipe } from './user-name.pipe';

@NgModule({
  declarations: [UserComponent, CapitalizeFirstWordPipe],
  providers: [UserService],
  exports: [UserComponent]
})
export class UserModule { }