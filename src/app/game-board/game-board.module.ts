import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GameBoardComponent } from './game-board.component';
import { GameTableComponent } from './game-table/game-table.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [KeyboardComponent, GameBoardComponent, GameTableComponent,],
  imports: [CommonModule, BrowserAnimationsModule,ToastrModule.forRoot() ],
  exports: [GameBoardComponent]
})
export class GameBoardModule { }
