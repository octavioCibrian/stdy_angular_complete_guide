import { Component, DestroyRef, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private placeService = inject(PlacesService);
  isFetching = signal(false);
  isFail = signal(false);
  private destroRef = inject(DestroyRef);
  places = this.placeService.loadedUserPlaces;

  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this.placeService.loadUserPlaces().subscribe({
      complete: () => {
        this.isFetching.set(false);
      },
      error: (err) => {
        this.isFail.set(err);
      },
    });

    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectPlace: Place): void {
    const subscription = this.placeService
      .removeUserPlace(selectPlace)
      .subscribe();

    this.destroRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
