import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameTableComponent } from './game-table/game-table.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyboardComponent,
    GameBoardComponent,
    GameTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
