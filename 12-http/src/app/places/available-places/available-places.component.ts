import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit{
  private placeService = inject(PlacesService);
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false)
  isFail = signal(false)
  private destroRef = inject(DestroyRef)


  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadAvailablePlaces()
    .subscribe(

      {
        next: val => {
          this.places.set(val.places);
        },
        complete: () => {
          this.isFetching.set(false)
        },
        error: (err) =>{
          this.isFail.set(err)
        }
      })

    this.destroRef.onDestroy(()=> {
      subscription.unsubscribe();
    })
  }

  onSelectPlace(selectPlace: Place): void {
   const subscription =  this.placeService.addPlaceToUserPlaces(selectPlace).subscribe();

    this.destroRef.onDestroy(()=> {
      subscription.unsubscribe();
    })
  }
}
