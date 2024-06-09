import { Component, OnInit, inject } from '@angular/core';
import { Album } from 'src/app/model/albumModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{

albumService:ApiService=inject(ApiService)
listAlbum!:Album[]

ngOnInit(): void {
  this.albumService.listAlbums().subscribe({
next:(res)=>{
this.listAlbum=res

}
  })
}


}
