import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
 import {MatSliderModule} from '@angular/material/slider'; 


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSliderModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('wpm-volume-slider');
}
