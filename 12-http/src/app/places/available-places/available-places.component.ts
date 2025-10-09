import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  private httpClient = inject(HttpClient);
  places = signal<Place[] | undefined>(undefined);
  private destroRef = inject(DestroyRef)


  ngOnInit(): void {
    const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places').subscribe(val => {
      console.log(val);

    })

    this.destroRef.onDestroy(()=> {
      subscription.unsubscribe();
    })
  }
}
