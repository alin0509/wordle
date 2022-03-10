import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GameBoardComponent } from './game-board.component';
import { GameTableComponent } from './game-table/game-table.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { GameHelpComponent } from './game-help/game-help.component';
import { GameStatisticsComponent } from './game-statistics/game-statistics.component';

@NgModule({
  declarations: [KeyboardComponent, GameBoardComponent, GameTableComponent, GameHelpComponent, GameStatisticsComponent,],
  imports: [CommonModule, BrowserAnimationsModule,ToastrModule.forRoot() ],
  exports: [GameBoardComponent]
})
export class GameBoardModule { }
