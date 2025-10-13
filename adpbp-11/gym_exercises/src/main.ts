import { bootstrapApplication, createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { createCustomElement } from '@angular/elements';

(async () => {
  const app = await createApplication(appConfig);

  const element = createCustomElement(App, {
    injector: app.injector
  });

  customElements.define('exercise-form', element);
})
