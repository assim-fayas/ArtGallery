import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Album } from 'src/app/model/albumModel';
import { Image } from 'src/app/model/imageModel';
import { UserFilter } from 'src/app/model/userFilterModel';
import { User } from 'src/app/model/userModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-drop-down-filter',
  templateUrl: './drop-down-filter.component.html',
  styleUrls: ['./drop-down-filter.component.css']
})
export class DropDownFilterComponent implements OnInit {

//section Album component
  options!:UserFilter[];
  users!:User[]
  albums!:Album[]
  selectedOption:string= ''
  

//section image component
  image!:Image[]

  private apiService:ApiService=inject(ApiService)

  ngOnInit(): void {
    this.getTheUsers()
    this.getTheAlbums()
    if(this.section=="Images"){
      this.listImage()
    }
  }
  


//section Album component
@Input() section!:string
@Output() filteredAlbum:EventEmitter<Album[]>=new EventEmitter()
@Output() filteredUser:EventEmitter<string>=new EventEmitter()


@Output()filteredAlbumName:EventEmitter<string>=new EventEmitter()
@Output()filteredImages:EventEmitter<Image[]>=new EventEmitter()

  search(): void {
if(this.section=="Albums"){
    this.filteredUser.emit('')
    if(this.selectedOption!=''){
    console.log(`Searching for ${this.selectedOption}`);
   
    const selectedUserName=this.options.filter((item)=>{
      return item.id== +this.selectedOption
    })
    const name=selectedUserName[0].name
    this.filteredUser.emit(name)
    this.albums=this.albums.filter((value:Album)=>{
      return value.userId== +this.selectedOption
    })
    
    this.filteredAlbum.emit(this.albums)
   
  }
  this.getTheAlbums()
  this.filteredAlbum.emit(this.albums)

  }
  if(this.section=="Images"){
    
    if(this.selectedOption!=''){


    this.image=this.image.filter((value:Image)=>{
      return value.albumId == +this.selectedOption
    })
    this.filteredAlbumName.emit(this.selectedOption)
    this.filteredImages.emit(this.image)
    
   
  }
  this.listImage()
  this.filteredImages.emit(this.image)

  }

  }

  reset(): void {
    if(this.section=="Albums"){
    if(this.selectedOption!=''){
      this.filteredUser.emit('')
    this.selectedOption = ''; 
    
    this.filteredAlbum.emit(this.albums)
    }
  }
  if(this.section=="Images"){
    if(this.selectedOption!=''){
      this.filteredAlbumName.emit('')
    this.selectedOption = ''; 
    
    this.filteredImages.emit(this.image)
    }
    

  }
}


private getTheUsers(){
  this.apiService.listUsers().subscribe({
    next: (response) => {
      this.users = response;
      this.options = this.users.map(user => {
        return {
          id: user.id,
          name: user.name
        };
      });

      console.log(this.options,"optiomnss"); 
    }
  });
}

private getTheAlbums(){
  this.apiService.listAlbums().subscribe({
    next:(response)=>{
    this.albums=response
    console.log(response,"albums");
    

    }
  })
}

private  listImage(){
  this.apiService.listImage().subscribe({
    next:(response)=>{
    this.image=response
    console.log(response);
    
    }
  })
}


}


