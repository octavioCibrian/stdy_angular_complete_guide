import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';


@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private errorService = inject(ErrorService);
  private httpClient = inject(HttpClient)
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something fails in the server!'
    )
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong with this fetching stuff'
    ).pipe(
      tap(
        (userPlaces)=>this.userPlaces.set(userPlaces.places)
      )
    )
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces()


    if(!this.userPlaces().some(val=> val.id === place.id)){
      this.userPlaces.set([...prevPlaces,place])
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    }).pipe(
      catchError( error=> throwError(()=>{
        this.errorService.showError('Failed to store selected place.')
        this.userPlaces.set(prevPlaces)
        return new Error('Failed to store selected place.');
      } )),
    )
  }

  removeUserPlace(place: Place) {
     return this.httpClient.delete('http://localhost:3000/user-places/'+place.id).pipe(
      catchError(error=> throwError(()=>{
        this.errorService.showError('Failed to store selected place.')
        return new Error('Failed to store selected place.');
      } )),
      tap(val=> {
        this.userPlaces.update(prevVal=> {
          return prevVal.filter(placeArr=> placeArr.id != place.id)
        })
      })
    )
  }

  private fetchPlaces(url: string, erroMessage: string): Observable<any> {
    return this.httpClient.get<{places: Place[]}>(url)
      .pipe(
          catchError((error) => throwError(()=> {
            this.errorService.showError('Failed to store selected place.')
            return new Error(erroMessage)
          }))
      )

  }
}
