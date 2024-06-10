import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Album } from 'src/app/model/albumModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{
 title:string= 'Albums'
albumService:ApiService=inject(ApiService)
router:Router=inject(Router)
listAlbum!:Album[]
userName:string=''

ngOnInit(): void {
  this.albumService.listAlbums().subscribe({
next:(res)=>{
this.listAlbum=res
console.log(this.listAlbum);


}
  })
}

onFilterAlbum(value:Album[]){
  this.listAlbum=value
  
}

onFilterUser(user:string){
  this.userName=user
}

onNavigateToImage(item:Album){
  console.log(item);
  this.router.navigate(['/images'])
  

}



}
