import {Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {SchoolsComponent} from "./features/schools/schools.component"

export const routes: Routes = [
  {
    path: '', component: HomeComponent, title: 'Home'
  },
  {
    path:'school', component:SchoolsComponent, title:'schools'
  }
];
