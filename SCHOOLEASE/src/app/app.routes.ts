import {Routes} from '@angular/router';
import {HomeComponent} from "./features/home/home.component";
import {SchoolsComponent} from "./features/schools/schools.component";
import{ChatbotComponent} from "./features/chatbot/chatbot.component"
import{ArticlesComponent} from "./features/articles/articles.component"

export const routes: Routes = [
  {
    path: '', component: HomeComponent, title: 'Home'
  },
  {
    path:'school', component:SchoolsComponent, title:'schools'
  },
  {
    path:'chatbot', component:ChatbotComponent, title:'chabot'
  },
  {
    path:'articles', component:ArticlesComponent, title:'articles'
  }
];
