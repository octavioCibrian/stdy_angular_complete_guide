import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  private destroRef = inject(DestroyRef);
  clickCount = signal(0);
  intervalSignal = toSignal(interval(1000), { initialValue: 0});
  //Obervables unlike signals doesn't have a initial value, if we see the template, it doesn't render anything at first,
  //we can change that passing the second argumenet { initialValue: 0} that is not required
  customIntervals$ = new Observable((subscriber)=> {
    let cont = 0
    const interval = setInterval(()=> {
      subscriber.next(++cont);
      if(cont >= 3) {
        clearInterval(interval)
        subscriber.complete()
      }
      // subscriber.error() We can emmit an error as well
    }, 2000)
  }); //

  constructor() {
    effect(()=> {
      console.log('sasasas'+ this.intervalSignal());

    })

    this.customIntervals$.subscribe({
      next: (val)=> {
        console.log(val)
      },
      complete: () => {
        console.log('finished')
      },
      error: (err)=> {
        console.log(err);

      }

  });

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
