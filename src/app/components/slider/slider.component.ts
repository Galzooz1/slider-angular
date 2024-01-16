import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { SliderService } from '../../services/slider.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  providers: [SliderService],
})
export class SliderComponent implements AfterContentInit, OnDestroy {
  // Get Data: Not yet!
  // public sliderItems$!: Observable<SliderItem[]>;
  @ContentChildren('slide') slides!: QueryList<any>;
  @Input() slideWidthPx: number = 400;
  @Input() slideHeightPx: number = 500;
  @Input() isAutoPlay: boolean = false;
  @Input() autoPlayMillisecondsInterval: number = 3000;
  @Input() infinite: boolean = false;
  @Input() keyPressControl: boolean = false;
  // @Output() playSliderEmitter: EventEmitter<void> = new EventEmitter<void>();
  // @Output() stopSliderEmitter: EventEmitter<void> = new EventEmitter<void>();
  currentSlide: number = 0;
  private autoSlideIntervalId: any;
  // Try of handle looping problem:
  // private slider: any;
  // private items!: HTMLElement[];

  constructor() // private el: ElementRef // private sliderService: SliderService
  {} // Try of handle looping problem:
  // public renderer: Renderer2,

  ngAfterContentInit(): void {
    // Try of handle looping problem:
    // this.slider = this.el.nativeElement.querySelector('.slider-container');
    // this.items = Array.from(
    //   this.slider.querySelectorAll('.slides .slides-item')
    // );
    // const firstSlide = this.items[0];
    // const lastSlide = this.items[this.sliderItems.length - 1];
    // this.renderer.insertBefore(
    //   this.slider,
    //   lastSlide.cloneNode(true),
    //   firstSlide
    // );
    // this.renderer.appendChild(this.slider, firstSlide.cloneNode(true));

    // Get Data: Not yet!
    // this.sliderItems$ = this.sliderService.sliderItems$;

    // this.sliderService.getSliderItems();
    if (this.isAutoPlay) {
      this.play();
    }
  }

  nextSlide(): void {
    if (this.infinite || this.currentSlide < this.slides.length - 1) {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }
  }

  prevSlide(): void {
    if (this.infinite || this.currentSlide > 0) {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    }
  }

  jumpToSlide(i: number): void {
    this.currentSlide = i;
  }

  play(): void {
    this.autoSlideIntervalId = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayMillisecondsInterval);
  }

  stop(): void {
    clearInterval(this.autoSlideIntervalId);
  }

  private keyPressHandler(event: KeyboardEvent): void {
    if (!this.keyPressControl) {
      return;
    } else {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopPropagation();
        this.prevSlide();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        event.stopPropagation();
        this.nextSlide();
        return;
      }
      if (49 <= event.key.charCodeAt(0) && event.key.charCodeAt(0) <= 57) {
        const slidePosition = event.key.charCodeAt(0) - 49;
        if (this.slides.length && slidePosition < this.slides.length) {
          this.jumpToSlide(slidePosition);
        }
        return;
      }
      if (event.key === '0') {
        if (this.slides.length && this.slides.length >= 10) {
          this.jumpToSlide(9);
        }
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent): void {
    this.keyPressHandler(event);
  }

  ngOnDestroy(): void {
    console.log('destroyed');
    this.stop();
    window.removeEventListener('keydown', this.keyPressHandler);
  }
}
