import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './authentication/auth.interceptor';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration()
  ],
};
