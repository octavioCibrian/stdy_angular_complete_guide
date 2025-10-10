import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log('[Outgoing Request]');
  console.log(request);
  const req = request.clone({
    headers: request.headers.set('X-DEBUG',' TESTING') //this give the actual header plus one ".set"
  })

  return next(req)
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors(
        [loggingInterceptor]
      )
    )
  ]
}).catch((err) => console.error(err));
