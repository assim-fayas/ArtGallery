import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
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
export class DropDownFilterComponent implements OnInit, OnChanges {

//api
private apiService: ApiService = inject(ApiService);


 // section Album component
  options!: UserFilter[];
  users!: User[];
  albums!: Album[];
  @Output() filteredAlbum: EventEmitter<Album[]> = new EventEmitter();
  @Output() filteredUser: EventEmitter<string> = new EventEmitter();


  // section image component
  image!: Image[];
  @Output() filteredAlbumName: EventEmitter<string> = new EventEmitter();
  @Output() filteredImages: EventEmitter<Image[]> = new EventEmitter();
 

//common for both sections(images,albums)
  selectedOption: string = '';
  @Input() chnagedSelectedOption: string = '';
  @Input() section!: string;

 
  ngOnChanges(changes: SimpleChanges) {
    if (changes['chnagedSelectedOption'] && !changes['chnagedSelectedOption'].isFirstChange()) {
      this.selectedOption = changes['chnagedSelectedOption'].currentValue;
      this.fetchData().subscribe(() => {
        this.search();
      }, error => {
        console.error('Error fetching data:', error);
      });
    }
  }

  ngOnInit(): void {
    this.fetchData().subscribe(() => {
      if (this.chnagedSelectedOption) {
        this.selectedOption = this.chnagedSelectedOption;
        this.search();
      }
    }, error => {
      console.error('Error fetching data:', error);
    });
  }


  //filteration

  search(): void {
    //for albums
    if (this.section === "Albums") {
      if (this.selectedOption !== '' && this.selectedOption !="all users") {
        const selectedUserName = this.options.find((item) => item.id == +this.selectedOption)?.name;
        if (selectedUserName) {
          this.filteredUser.emit(selectedUserName);
        }
        const filteredAlbums = this.albums.filter((value: Album) => value.userId == +this.selectedOption);
        this.filteredAlbum.emit(filteredAlbums);
      } else {
        this.filteredAlbum.emit(this.albums);
        this.filteredUser.emit('');
      }
    }
    //for images
    if (this.section === "Images" ) {
      if (this.selectedOption !== '' &&  this.selectedOption !="all albums") {
        const filteredImages = this.image.filter((value: Image) => value.albumId == +this.selectedOption);
        this.filteredAlbumName.emit(this.selectedOption); 
        this.filteredImages.emit(filteredImages);
      } else {
        this.filteredImages.emit(this.image);
        this.filteredAlbumName.emit('');
      }
    }
  }

 // resetting the filteration
  reset(): void {
     //for albums
    if (this.section === "Albums") {
      if (this.selectedOption !== '') {
        this.filteredUser.emit('');
        this.selectedOption = '';
        this.filteredAlbum.emit(this.albums);
      }
    }
    //for images
    if (this.section === "Images") {
      if (this.selectedOption !== '') {
        this.filteredAlbumName.emit('');
        this.selectedOption = '';
        this.filteredImages.emit(this.image);
      }
    }
  }

  //for getting the username and userId
  private getTheUsers(): Observable<UserFilter[]> {
    return new Observable<UserFilter[]>(subscriber => {
      this.apiService.listUsers().subscribe({
        next: (response) => {
          this.users = response;
          this.options = this.users.map(user => ({
            id: user.id,
            name: user.name
          }));
          subscriber.next(this.options);
          subscriber.complete();
        },
        error: (error) => {
          subscriber.error(error);
        }
      });
    });
  }

  //for getting the albums
  private getTheAlbums(): Observable<Album[]> {
    return new Observable<Album[]>(subscriber => {
      this.apiService.listAlbums().subscribe({
        next: (response) => {
          this.albums = response;
          subscriber.next(this.albums);
          subscriber.complete();
        },
        error: (error) => {
          subscriber.error(error);
        }
      });
    });
  }

  //for getting the images
  private listImage(): Observable<Image[]> {
    return new Observable<Image[]>(subscriber => {
      this.apiService.listImage().subscribe({
        next: (response) => {
          this.image = response;
          subscriber.next(this.image);
          subscriber.complete();
        },
        error: (error) => {
          subscriber.error(error);
        }
      });
    });
  }

  //fectch the required data according to the sections
  private fetchData(): Observable<any> {
    if (this.section === "Albums") {
      return forkJoin({
        users: this.getTheUsers(),
        albums: this.getTheAlbums()
      });
    } else if (this.section === "Images") {
      return forkJoin({
      
        albums: this.getTheAlbums(),
        image:this.listImage()
      });
    } else {
      return of({});
    }
  }

}
