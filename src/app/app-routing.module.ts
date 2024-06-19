import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ImagesComponent } from './components/images/images.component';
//routes
const routes: Routes = [
{path:'',redirectTo:'users',pathMatch:'full'},
{
  path:'users',
  loadComponent:()=>import('./components/users/users.component').then(c=>c.UsersComponent)
},
{
  path:'albums',
  loadComponent:()=>import('./components/albums/albums.component').then(c=>c.AlbumsComponent)
},
{
  path:'images',
 loadComponent:()=>import('./components/images/images.component').then(c=>c.ImagesComponent)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
