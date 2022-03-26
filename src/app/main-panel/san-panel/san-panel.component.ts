import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SanService } from 'src/app/services/san.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sanatory } from 'src/app/model/Sanatory';
import {Router} from '@angular/router'
import { CitiesService } from 'src/app/services/cities.service';
import { DictEntity } from 'src/app/model/DictEntity';
import { SanTypeService } from 'src/app/services/sanType.service';

@Component({
  selector: 'app-san-panel',
  templateUrl: './san-panel.component.html',
  styleUrls: ['./san-panel.component.css', "../main-panel.component.css"]
})
export class SanPanelComponent implements OnInit {

  title = 'Санатории';
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Sanatory[];

  displayedColumns = ['name','sanType','city','address','action'];

  dataSource = new MatTableDataSource<Sanatory>(this.ELEMENT_DATA);

  form:FormGroup;

  originalSource = new MatTableDataSource<Sanatory>(this.ELEMENT_DATA);

  size:number=10

  total:number;

  currentPage:number = 1;

  pageCount:number;

  pages:number[];

  cities:DictEntity[];

  cityId:string;

  sanTypes:DictEntity[];

  sanTypeCode:string;

  searchValue:string;

  timeout:NodeJS.Timeout

  constructor(
    private service:SanService,
    public dialog: MatDialog,
    private router: Router,
    private cityService:CitiesService,
    private sanTypeService:SanTypeService
    ) { }

  ngOnInit(): void {
    this.getAll();
    this.getCities();
    this.getSanType();
  }

  public getAll(){
    let resp = this.service.getAll({cityId:this.cityId,sanTypeCode:this.sanTypeCode,name:this.searchValue})
    resp.subscribe(res=>{
      this.originalSource.data = res['data'] as Sanatory[]
      this.dataSource.data = this.originalSource.data.filter((_,index)=> index<this.size)
      this.total = res['data']['total']
      this.calcPageCount();
    })
  }
  public editRow(id:string){
    this.router.navigate(['/main/booking', id])
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

  getCities(){
    this.cityService.getAll().subscribe({
      next: (res)=> {this.cities = res['data']; console.log(this.cities);
      }
    })
  }
  getSanType(){
    this.sanTypeService.getAll().subscribe({
      next: (res)=> {this.sanTypes = res['data']; console.log(this.sanTypes);
      }
    })
  }
  onSearch(){
    if(this.timeout) clearTimeout(this.timeout)
   this.timeout = setTimeout(()=>{
      this.getAll();
    },1500)
  }
  clear(){
    this.sanTypeCode = undefined;
    this.searchValue = undefined;
    this.cityId = undefined;
    this.getAll();
  }
}
