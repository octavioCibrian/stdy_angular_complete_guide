import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroRef = inject(DestroyRef);
  clickCount = signal(0);

  constructor() {
    effect(() => {
      console.log(`click button ${this.clickCount()} times `);

    })
  }
  ngOnInit(): void {
    // //this is another way to pass an object to obtain more than next, like error or complete
    // const subscription = interval(1000)
    // .pipe(
    //   map((val:number) => val * 10)
    // )
    // .subscribe({ //interval is a observable than return a number every millisecond we expecify
    //   next: (val: number) => console.log(val),
    //   complete: (()=> console.log('completed')
    //   )
    // })



    // this.destroRef.onDestroy(() => { //Here is another way to use the onDestroy but without having the method
    //   subscription.unsubscribe();
    // })
  }


  onClick(): void {
    this.clickCount.update(prevVal => prevVal + 1)
  }
}
