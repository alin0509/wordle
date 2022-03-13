import { Component, OnInit } from '@angular/core'; 
import { ThemeService } from '../shared';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  public currentTheme: string = 'default';
  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.themeService.setTheme('default');
  }

  public changeTheme(e: any): void {
    e = e as Event;
    if (!e) {
      return;
    }
    if (e.target.checked) {
      this.themeService.setTheme('dark');
    } else {
      this.themeService.setTheme('default');
    }
  }
}
