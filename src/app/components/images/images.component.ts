import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    this.listImage()

    //accesiing route values
    this.activeRoute.params.subscribe((data)=>{
      this.slectedOPtionsOfAlbumId=data['albumId']
      this.albumName=data['albumId']
    })
    
    
    
  }

  onFilterImages(value:Image[]){
   
    this.images=value
   
  }
  onSelectedAlbum(value:string){
    this.albumName=+value
  }

  private  listImage(){
    this.apiService.listImage().subscribe({
      next:(response)=>{
      this.images=response
      console.log(response);
      
      }
    })
  }
openModal(item:Image) {
  this.imageName=item.id
  this.albumId=item.albumId

  this.showModal = true;


  const user=this.apiService.listUsers().subscribe({
    next:(value)=> {
      console.log(value,"valueeeeee");
      
    },
  })
}

closeModal() {
  this.showModal = false;
}

}
