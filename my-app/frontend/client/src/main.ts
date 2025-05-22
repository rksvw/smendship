import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Try both bootstrap methods
try {
  // Method 1: Bootstrap using standalone components
  bootstrapApplication(AppComponent, appConfig)
    .catch(err => {
      console.error('Standalone bootstrap failed:', err);
      
      // Method 2: Bootstrap using NgModule
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error('NgModule bootstrap failed:', err));
    });
} catch (err) {
  console.error('Bootstrap error:', err);
}
