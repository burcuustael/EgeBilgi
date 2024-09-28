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
            import('./app/ui/layout/layout.component').then(
              (c) => c.LayoutComponent
            ),
        },
        {
          path: 'character/:id',
          loadComponent: () =>
            import(
              './app/ui/layout/main/character-detail/character-detail.component'
            ).then((c) => c.CharacterDetailComponent),
        },
      ])
    ),
    provideAnimationsAsync(),
  ],
});
