import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SanService } from 'src/app/services/san.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sanatory } from 'src/app/model/Sanatory';
import {Router} from '@angular/router'

@Component({
  selector: 'app-san-panel',
  templateUrl: './san-panel.component.html',
  styleUrls: ['./san-panel.component.css', "../main-panel.component.css"]
})
export class SanPanelComponent implements OnInit {

  title = 'Санатории';
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Sanatory[];

  displayedColumns = ['name','nameKz','description','descriptionKz','action'];

  dataSource = new MatTableDataSource<Sanatory>(this.ELEMENT_DATA);

  form:FormGroup;

  originalSource = new MatTableDataSource<Sanatory>(this.ELEMENT_DATA);

  size:number=10

  total:number;

  currentPage:number = 1;

  pageCount:number;

  pages:number[]

  constructor(
    private service:SanService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll() 
  }

  public getAll(){
    let resp = this.service.getAll()
    resp.subscribe(res=>{
      this.originalSource.data = res['data'] as Sanatory[]
      this.dataSource.data = this.originalSource.data.filter((_,index)=> index<this.size)
      this.total = res['data']['total']
      this.calcPageCount();
    })
  }
  public editRow(id:string){
    this.router.navigate(['/main/san/edit', id])
  }
  public deleteRow(row:Sanatory){
   this.service.deleteOneById(row.id.toString()).subscribe(()=>this.getAll())
   }

   public filterSource(value:Event){
     this.size = Number((value.target as HTMLSelectElement).value);
     this.dataSource.data = this.originalSource.data.filter((_,index) => index<this.size);
     this.calcPageCount()
   }

   public changeCurrentPage(value:number){
      this.currentPage = value
    console.log(this.currentPage);
  }

  incrementPage(){
    if(this.currentPage< this.pageCount - 1)
    this.currentPage = this.currentPage + 1
    else this.currentPage = 1;
  }

  decrementPage(){
    if(this.currentPage>1)
    this.currentPage = this.currentPage - 1
    else this.currentPage = this.pageCount;
  }

  public calcPageCount(){
    this.pageCount = Math.ceil(this.total/this.size)
    this.pages = []
    for(let i =0;i<this.pageCount;i++){
     this.pages.push(i+1);
    }
    if(this.size>this.total){
      this.size = this.total
    }     
  }

}
