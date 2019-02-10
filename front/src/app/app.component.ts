import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  animations: [trigger('square', [
      state('green', style({'background': 'green', 'height': '100px'})),
      state('red', style({'background': 'red', 'height': '50px'})),
      transition('green => red', animate(1000)),
      transition('red => green', animate(1000))
    ])]
})
export class AppComponent {
  squareState: string;
  darkTheme = false;

  switchTheme(dark) {
    this.darkTheme = dark;
  }

  onClick() {
    this.squareState = this.squareState === 'red' ? 'green' : 'red';
  }


}
