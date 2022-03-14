import { Component, EventEmitter, HostBinding, Output, ViewEncapsulation } from '@angular/core';
import { GameStateService } from '../../shared';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameStatisticsComponent {
  @HostBinding("class") class = "app-gameStatistics";

  @Output() closeStatisticsEvent = new EventEmitter<boolean>();

  statistics = this.gameCachingService.gameStatistics();
  triesArray = [1, 2, 3, 4, 5, 6];

  constructor(private gameCachingService: GameStateService) { }

  closeStatistics(): void {
    this.closeStatisticsEvent.emit(true);
  }
} 
