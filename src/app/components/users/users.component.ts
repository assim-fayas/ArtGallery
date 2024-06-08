import { Component, OnInit, inject } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ApiService } from 'src/app/service/api.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],

})
export class UsersComponent implements OnInit{

  apiService:ApiService=inject(ApiService)
  ngOnInit(): void {
    this.apiService.listUsers().subscribe({
      next:(response)=>{
console.log(response);

    },
    error:(error)=>{
console.log(error);

    }
  
  })
  }
  
  rowData = [
    { Name: "Tesla", Username: "Model Y", Email: 64950, City: true, Zipcode: "Model Y" },
    { Name: "Ford", Username: "F-Series", Email: 33850, City: false, Zipcode: "Model Y" },
    { Name: "Toyota", Username: "Corolla", Email: 29600, City: false, Zipcode: "Model Y" },
  ];
 
 
colDefs: ColDef[] = [
  { field: "Name",flex:1,minWidth: 200, maxWidth: 500, cellStyle: { textAlign: 'center',fontWeight:'bold' }},
  { field: "Username",flex:1,filter:true,minWidth: 200, maxWidth: 500,cellStyle: { textAlign: 'center' },editable: true , cellEditorPopup: true},
  { field: "Email",flex:1,filter:true ,minWidth: 200, maxWidth: 500,cellStyle: { textAlign: 'center' }, editable: true   },
  { field: "City" ,flex:1,filter:true,minWidth: 250, maxWidth: 550,cellStyle: { textAlign: 'center' }, editable: true  },
  { field: "Zipcode" ,flex:1,filter:true,minWidth: 200, maxWidth: 500,cellStyle: { textAlign: 'center' }, editable: true  }
];


public defaultColDef: ColDef = {
  editable: true,
  flex: 1,
  minWidth: 100,
};
}
