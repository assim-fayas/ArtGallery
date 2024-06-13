import { Component, OnInit, inject } from '@angular/core';
import {  Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { User } from 'src/app/model/userModel';

@Component({
  selector: 'app-ag-cell-navigation',
  templateUrl: './ag-cell-navigation.component.html',
})
export class AgCellNavigationComponent implements  ICellRendererAngularComp{
  router:Router=inject(Router)
//cell value
cellValue!:string
// row values
rowValue!:User

agInit(params: ICellRendererParams<any, any, any>): void {
this.rowValue= params.data;
this.cellValue=params.value 
}

refresh(params: ICellRendererParams<any, any, any>): boolean {
  return false
}

//navigation to albums component
onNavigateAlbum(){
this.router.navigate(['/albums',{id:this.rowValue.id,name:this.rowValue.name}])
}

}
