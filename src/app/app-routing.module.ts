import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDetailsComponent } from './detail-preview/edit-details/edit-details.component';
import { HomeComponent } from './home/home.component';
import { DetailPreviewComponent } from './detail-preview/detail-preview.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'edit-details', component: EditDetailsComponent },
  { path: 'detail-preview', component: DetailPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
