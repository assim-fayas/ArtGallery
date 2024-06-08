import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ImagesComponent } from './components/images/images.component';

const routes: Routes = [
  {path:'',redirectTo:'users',pathMatch:'full'},
{path:'users',component:UsersComponent},
{path:'albums',component:AlbumsComponent},
{path:'images',component:ImagesComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
