import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router'
import { DictEntity } from 'src/app/model/DictEntity';
import { BookingService } from 'src/app/services/booking.service';
import { Booking, BookingStatus } from 'src/app/model/Booking';
import { Option } from 'src/app/model/Option';

@Component({
  selector: 'app-booking-panel',
  templateUrl: './booking-panel.component.html',
  styleUrls: ['./booking-panel.component.css']
})
export class BookingPanelComponent implements OnInit {

  title = 'Брони';
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Booking[];

  displayedColumns = ['FIO','telNumber','startDate','endDate'];

  dataSource = new MatTableDataSource<Booking>(this.ELEMENT_DATA);

  form:FormGroup;

  originalSource = new MatTableDataSource<Booking>(this.ELEMENT_DATA);

  size:number=10

  total:number;

  currentPage:number = 1;

  pageCount:number;

  pages:number[];

  telNumber:string;
  
  sanId:string;
  
  statuses:Option[] = [];

  status:string;

  startDate:Date;

  endDate:Date;

  minPrice:string;

  maxPrice:string;
  
  timeout:NodeJS.Timeout;

  constructor(
    private service:BookingService,
    public dialog: MatDialog,
    private router: Router,
    private route:ActivatedRoute,
    ) { 
       this.startDate = new Date();
       this.endDate = new Date(this.startDate.getFullYear()+1, this.startDate.getMonth(),this.startDate.getDay());
       for (const [key,value] of Object.entries(BookingStatus)){
         this.statuses.push({
           id:key,
           value:value
         })
       }
       console.log(this.statuses);
    }
    

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(){
    let id = this.route.snapshot.paramMap.get('id');
    let resp = this.service.getAll({startDate:this.startDate.toISOString().slice(0,10),endDate:this.endDate.toISOString().slice(0,10),
                                    telNumber:this.telNumber,page:0,size:10,sanId:id?id:undefined,status:this.status})
    resp.subscribe(res=>{
      this.originalSource.data = res['data'] as Booking[]
      this.dataSource.data = this.originalSource.data.filter((_,index)=> index<this.size)
      this.total = res['data']['total']
      this.calcPageCount();
    })
  }
  public editRow(id:string){
    this.router.navigate(['/main/booking/edit', id])
  }
  public deleteRow(row:Booking){
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
  onSearch(){
    console.log("asd");
    if(this.timeout) clearTimeout(this.timeout)
   this.timeout = setTimeout(()=>{
      this.getAll();
    },1500)
  }
  clear(){
      this.maxPrice =undefined;
      this.minPrice =undefined;
      this.startDate =undefined;
      this.endDate =undefined;
      this.telNumber =undefined;
    this.getAll();
  }
  
}
