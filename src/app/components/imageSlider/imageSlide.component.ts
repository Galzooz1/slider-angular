import { Component } from '@angular/core';

@Component({
  selector: 'app-imageSlide',
  standalone: true,
  imports: [],
  templateUrl: './imageSlide.component.html',
  styleUrl: './imageSlide.component.scss'
})
export class imageSlideComponent {
  slides: string[] = ['Slider 1', 'Slider 2', 'Slider 3'];

}
