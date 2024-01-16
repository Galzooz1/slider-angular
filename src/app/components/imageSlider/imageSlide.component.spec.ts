import { ComponentFixture, TestBed } from '@angular/core/testing';

import { imageSlideComponent } from './imageSlide.component';

describe('imageSlideComponent', () => {
  let component: imageSlideComponent;
  let fixture: ComponentFixture<imageSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [imageSlideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(imageSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
