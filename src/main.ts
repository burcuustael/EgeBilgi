import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      RouterModule.forRoot([
        {
          path: '',
          loadComponent: () =>
            import('./app/ui/layout/header/header.component').then(
              (c) => c.HeaderComponent
            ),
          children: [
            {
              path: 'footer',
              loadComponent: () =>
                import('./app/ui/layout/footer/footer.component').then(
                  (c) => c.FooterComponent
                ),
            },
          ],
        },
      ])
    ),
    provideAnimationsAsync(),
  ],
});
