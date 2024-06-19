import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { Image } from 'src/app/model/imageModel';
import { User } from 'src/app/model/userModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit{
 apiService:ApiService=inject(ApiService)
 activeRoute:ActivatedRoute=inject(ActivatedRoute)


images!:Image[]
title:string='Images'
albumName!:number
showModal = false;
imageName!:number
userName!:string
albumId!:number
slectedOPtionsOfAlbumId:string=''

  ngOnInit(): void {
    //calling the list image api
    this.listImage()
    //accesiing route values
    this.activeRoute.params.subscribe((data)=>{
      this.slectedOPtionsOfAlbumId=data['albumId']
      this.albumName=data['albumId']
    })
     
  }

//events emitted from cj=hild component(drop-down filter component)
  onFilterImages(value:Image[]){ 
    this.images=value
  }

  onSelectedAlbum(value:string){
    this.albumName=+value
  }


// for lsiting the images
  private  listImage(){
    this.apiService.listImage().subscribe({
      next:(response)=>{
      this.images=response
      }
    })
  }



//opening modal,populating the user name,image name,image
 openModal(item: Image) {
  this.imageName = item.id;
  this.albumId = item.albumId;
  this.showModal = true;
  this.getTheUserName(this.albumId).subscribe((userName)=>{
    if (userName) {
      this.userName = userName;
       }
  })
}

// closing the modal
closeModal() {
  this.showModal = false;
}


//helper function for finding the username
getTheUserName(albumId: number): Observable<string|null> {
return forkJoin([
  this.apiService.listUsers(),
  this.apiService.listAlbums()
]).pipe(
  map(([users,albums])=>{
      if (!albums || !users) {
      console.error('Albums or users data is missing');
      return null;
    }
    const album = albums.find(album => album.id === albumId);
      if (album) {
        const user = users.find(user => user.id === album.userId);
        if (user) {
          return user.name;
        }
      }
      return null;
    }
  )
)}



}
