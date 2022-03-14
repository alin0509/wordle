import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ThemeToggleModule } from '../theme-toggle';
import { GameBoardComponent } from './game-board.component';
import { GameHelpComponent } from './game-help';
import { GameStatisticsComponent } from './game-statistics';
import { GameTableComponent } from './game-table';
import { KeyboardComponent } from './keyboard';

@NgModule({
  declarations: [KeyboardComponent, GameBoardComponent, GameTableComponent, GameHelpComponent, GameStatisticsComponent,],
  imports: [CommonModule, BrowserAnimationsModule, ToastrModule.forRoot(), ThemeToggleModule],
  exports: [GameBoardComponent]
})
export class GameBoardModule { }
