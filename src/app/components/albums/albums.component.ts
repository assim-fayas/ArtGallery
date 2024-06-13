import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/model/albumModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{

albumService:ApiService=inject(ApiService)
router:Router=inject(Router)
activeRoute:ActivatedRoute=inject(ActivatedRoute)

// loader
isLoading:boolean=true

title:string= 'Albums'
listAlbum!:Album[]
userName:string=''
slectedOPtionsOfUserId:string=''

ngOnInit(): void {
  //calling the listalbum service for listing the album
this.albumService.listAlbums().subscribe({
next:(res)=>{
this.listAlbum=res
}
  })

//accessing router values
this.activeRoute.params.subscribe((data)=>{
  this.userName=data['name']
  this.slectedOPtionsOfUserId=data['id']
})


}

//value emitted from child component(drop-down filter component)
onFilterAlbum(value:Album[]){
  this.listAlbum=value 
}
onFilterUser(user:string){
  this.userName=user
}

//navigation to image component
onNavigateToImage(item:Album){
  this.router.navigate(['/images',{albumId:item.id}])
  

}



}
