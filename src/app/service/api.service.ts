import { Injectable, inject } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable, Subject, catchError, map, switchMap, tap, throwError } from 'rxjs';
import { User } from '../model/userModel';
import { Album } from '../model/albumModel';
import { Image } from '../model/imageModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 http:HttpClient=inject(HttpClient)

//api
private api='https://jsonplaceholder.typicode.com'

 //listing users 
listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.api}/users`).pipe( 
      map(users => users.map((user: any) => ({ 
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        city: user.address.city,
        zipcode: user.address.zipcode
      }))),
      catchError(error => throwError(() => error))
    );
  }
   

 //listing images
  listImage():Observable<Image[]>{
 return this.http.get<Image[]>(`${this.api}/photos`).pipe(
      map(response=>{
       return response
        
      }),
      catchError(error => throwError(() => error))
    )
  }


//listing albums
  listAlbums(): Observable<Album[]> {
    return this.getAlbumImageCounts().pipe(
      switchMap(imageCounts => {
        return this.http.get<Album[]>(`${this.api}/albums`).pipe(
          map(albums => {
            return albums.map((album:any) => ({
              ...album,
              imageCount: imageCounts[album.id] || 0
            }));
          }),
          catchError(error => throwError(() => error))
        );
      }),
      catchError(error => throwError(() => error))
    );
  }

//custom function for the counting of images for each albums
private getAlbumImageCounts(): Observable<{ [albumId: number]: number }> {
    return this.http.get<any>(`${this.api}/photos`).pipe(
      map((albums: any[]) => {
        const albumCounts: { [albumId: number]: number } = {};
        albums.forEach(album => {
          if (albumCounts[album.albumId]) {
            albumCounts[album.albumId]++;
          } else {
            albumCounts[album.albumId] = 1;
          }
        });
        
        return albumCounts;
      })
    );
  }

  
}










