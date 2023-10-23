import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserModule as User1Module } from './user1/user.module';
import { UserModule as User2Module } from './user2/user.module';
import { UserModule as User3Module } from './user3/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    User1Module,
    User2Module,
    User3Module,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
