import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UsersComponent } from './components/users/users.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ImagesComponent } from './components/images/images.component';
import { RouterModule } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { AgCellNavigationComponent } from './utility/ag-cell-navigation/ag-cell-navigation.component';
import { DropDownFilterComponent } from './components/drop-down-filter/drop-down-filter.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './utility/modal/modal.component';





@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    UsersComponent,
    AlbumsComponent,
    ImagesComponent,
    AgCellNavigationComponent,
    DropDownFilterComponent,
    SearchComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    AgGridAngular,
    HttpClientModule,
    FormsModule
  

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
