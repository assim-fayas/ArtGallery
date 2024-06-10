import { Component, OnInit, inject } from '@angular/core';
import { Image } from 'src/app/model/imageModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit{
 apiService:ApiService=inject(ApiService)


images!:Image[]
title:string='Images'
albumName:string=''
showModal = false;

  ngOnInit(): void {
    this.listImage()
    
  }

  onFilterImages(value:Image[]){
   
    console.log(value,"watch");
    
    this.images=value
   
  }
  onSelectedAlbum(value:string){
    this.albumName=value
  }


  private  listImage(){
    this.apiService.listImage().subscribe({
      next:(response)=>{
      this.images=response
      console.log(response);
      
      }
    })
  }


  

openModal() {
  this.showModal = true;
}

closeModal() {
  this.showModal = false;
}

}
