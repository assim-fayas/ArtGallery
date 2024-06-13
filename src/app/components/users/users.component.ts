import { Component, } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { User } from 'src/app/model/userModel';
import { AgCellNavigationComponent } from 'src/app/utility/ag-cell-navigation/ag-cell-navigation.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [AgCellNavigationComponent] 

})
export class UsersComponent {

users!:User[]
title:string='Users'

// value emitted from child component(search comp)
  handleUsers(users:User[]){
    this.users=users
  }

//ag grid 
colDefs: ColDef[] = [
  { field: "name",flex:1,minWidth: 200, maxWidth: 500, cellStyle: { textAlign: 'center' }},
  { field: "username",flex:1,filter:true,minWidth: 200, maxWidth: 500,cellStyle: { textAlign: 'center' }},
  { field: "email",flex:1,filter:true ,minWidth: 200, maxWidth: 500,cellStyle: { textAlign: 'center' }  },
  { field: "city" ,flex:1,filter:true,minWidth: 250, maxWidth: 550,cellStyle: { textAlign: 'center' } },
  { field: "zipcode" ,flex:1,filter:true,minWidth: 200, maxWidth: 500,cellStyle: { textAlign: 'center' } ,cellRenderer:AgCellNavigationComponent },

];


}
