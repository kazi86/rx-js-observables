import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef  = inject(DestroyRef);

  public clickCount = signal(0);

  public clickCount$ = toObservable(this.clickCount);

  constructor(){

    //side effect method method that runs automatically each time a signal value changes
    // effect(()=>{

    //   console.log(`Button Clicked ${this.clickCount} times.`)

    // });

    this.clickCount$.subscribe({

      next:(data)=>{

      console.log(`Button Clicked ${data} times.`)

      }});

  }

  public ngOnInit(){

    //pipes are used to utilize rxjs operators before subribing to observalbe values
    // they sent a tranformed value to the stream which then used in next:()->{}
    //map operators runs on each value emitted by observable and the the returned value is sent to next:

  // const subscription = interval(1000).pipe(
  //   map((value)=>{
  //     return value * 2;
  //   })
  // ).subscribe({
  //   next:(data)=>{
  //     console.log(data);
  //   },
  //   error:(err)=>{
  //     console.error("Error in data stream. ",err);
  //   },
  //   complete:()=>{
  //     console.log("Executes once no new values are emitted by observable");
  //   }
  // });

  // //clear subscription on component destroying
  // this.destroyRef.onDestroy(()=>{

  //   subscription.unsubscribe();

  // });

  }

  public onClick(){

    this.clickCount.update(prevCount=> prevCount + 1);

  }

}
