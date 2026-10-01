import { Routes } from '@angular/router';
import { BlueEyesComponent } from './components/blue-eyes/blue-eyes';
import { SearchComponent } from './components/search/search';

export const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'blue-eyes', component: BlueEyesComponent },
];