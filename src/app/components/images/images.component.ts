import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit{
 apiService:ApiService=inject(ApiService)


images!:any[]

  ngOnInit(): void {
    this.apiService.listImage().subscribe({
      next:(response)=>{
      this.images=response
      }
    })
  }

}
