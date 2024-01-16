import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { SliderItem } from '../models/slider.model';

@Injectable()
export class SliderService {
  private apiUrls = [
    'https://api.thedogapi.com/v1/images/search',
    'https://api.thecatapi.com/v1/images/search',
    'https://api.thedogapi.com/v1/images/search',
    'https://api.thecatapi.com/v1/images/search',
    'https://api.thedogapi.com/v1/images/search',
  ];

  constructor(private httpService: HttpService) {}

  public getSliderItems(): Observable<SliderItem[]> {
    const requests: Observable<SliderItem[]>[] = this.apiUrls.map((url) =>
      this.httpService.get<SliderItem[]>(url).pipe(
        map((items: SliderItem[]) => items.map((item) => item)),
        catchError((error) => {
          console.log(error);
          return of([]);
        })
      )
    );

    return forkJoin(requests).pipe(
      map((data) =>
        data.length > 1
          ? data.reduce((acc, current) => acc.concat(current), [])
          : data[0]
      )
    );
  }
}
