import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { User } from 'src/app/model/userModel';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private apiService:ApiService=inject(ApiService)
  users!:User[]


  @Output() searchResult:EventEmitter<User[]>=new EventEmitter()

  ngOnInit(): void {
    this.apiService.listUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.searchResult.emit(this.users);
      }
    });
  }
  

  onSearch(value: string): void {
    const filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(value.toLowerCase())
    );
    this.searchResult.emit(filteredUsers);
  }




  handleInput(event: Event): void {
    const inputEvent = event as InputEvent;
    if (inputEvent?.target instanceof HTMLInputElement) {
      const searchValue = inputEvent.target.value;
      this.throttledOnSearch(searchValue);
    }
  }

  private throttledOnSearch(searchValue: string): void {
    setTimeout(() => {
      this.onSearch(searchValue);
    }, 600); 
  }

}
