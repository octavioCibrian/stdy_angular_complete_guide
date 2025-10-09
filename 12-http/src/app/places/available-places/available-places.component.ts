import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

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
  isFetching = signal(false)
  isFail = signal(false)
  private destroRef = inject(DestroyRef)


  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places')
    .pipe(
        catchError((error) => throwError(()=> new Error('Something fails in the server!')))
    )
    .subscribe(

      {
        next: val => {
          console.log(val);
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
}
