import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { User } from 'src/app/model/userModel';

@Component({
  selector: 'app-ag-cell-navigation',
  templateUrl: './ag-cell-navigation.component.html',
})
export class AgCellNavigationComponent implements OnInit, ICellRendererAngularComp{
cellValue!:string
rowValue!:User

agInit(params: ICellRendererParams<any, any, any>): void {
this.rowValue= params.data;
this.cellValue=params.value
console.log(this.rowValue,"rowValue");



  
}

refresh(params: ICellRendererParams<any, any, any>): boolean {
  return false
}





ngOnInit(): void {
  
}



}
