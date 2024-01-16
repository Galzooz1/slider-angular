import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SliderComponent } from './components/slider/slider.component';
import { SliderService } from './services/slider.service';
import { SliderItem } from './models/slider.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SliderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SliderService],
})
export class AppComponent implements OnInit {
  public sliderItems: SliderItem[] = [];
  isLoading: boolean = false;
  isError: boolean = false;

  title = 'angular';

  constructor(private sliderService: SliderService) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.sliderService.getSliderItems().subscribe(
      (data: SliderItem[]) => {
        this.sliderItems = data;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.isError = true;
      }
    );
  }
}
