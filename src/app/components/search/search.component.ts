import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { User } from 'src/app/model/userModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
private apiService:ApiService=inject(ApiService)
private onDebounceTime=new Subject<string>
users!:User[]

@Output() searchResult:EventEmitter<User[]>=new EventEmitter()

ngOnInit(): void {
    this.apiService.listUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.searchResult.emit(this.users);
      }
    });
    //enabling the debouncing
    this.onDebounceTime.pipe(debounceTime(600)).subscribe((value)=>{
    this.onSearch(value)
    })

    
  }
  
//for serching based on the user input
  onSearch(value: string): void {
    const filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    this.searchResult.emit(filteredUsers);
  }

//handling the user iput for the serching
  handleInput(event: Event): void {
    const inputEvent = event as InputEvent;
    if (inputEvent?.target instanceof HTMLInputElement) {
      const searchValue = inputEvent.target.value;

      //emitting value to the subject(onDebounceTime)
      this.onDebounceTime.next(searchValue)
    }
   
  }

}
