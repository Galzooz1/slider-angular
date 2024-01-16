import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './services/http.service';
import { AppComponent } from './app.component';
import { imageSlideComponent } from './components/imageSlider/imageSlide.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderService } from './services/slider.service';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent, SliderComponent, imageSlideComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [HttpService, SliderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
