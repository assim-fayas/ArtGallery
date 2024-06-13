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

title:string= 'Albums'
listAlbum!:Album[]
userName:string=''
slectedOPtionsOfUserId:string=''

ngOnInit(): void {
this.albumService.listAlbums().subscribe({
next:(res)=>{
this.listAlbum=res
console.log(this.listAlbum);


}
  })

//accessing router values
this.activeRoute.params.subscribe((data)=>{
  this.userName=data['name']
  this.slectedOPtionsOfUserId=data['id']
})


}

onFilterAlbum(value:Album[]){
  this.listAlbum=value
  
}

onFilterUser(user:string){
  this.userName=user
}

onNavigateToImage(item:Album){
  console.log(item,"item for navvv");
  this.router.navigate(['/images',{albumId:item.id}])
  

}



}
