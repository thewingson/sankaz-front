import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css', "../main-panel.component.css"]
})
export class UserPanelComponent implements OnInit {

  title = 'Пользователи';

  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  User[];

  displayedColumns = ['id','username','fullName','userType','confirmationStatus','action'];

  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  form:FormGroup;

  originalSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  size:number=10;

  total:number;

  currentPage:number = 1;

  pageCount:number;

  pages:number[]

  constructor(
    private service:UserService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll() 
  }

  public getAll(){
    let resp = this.service.getAll(this.currentPage-1,this.size)
    resp.subscribe(res=>{
      this.originalSource.data = res['data']['content'] as User[]
      this.dataSource.data = this.originalSource.data.filter((_,index)=> index<=this.size)
      this.total = res['data']['total']
      this.calcPageCount();
    })
  }
  public editRow(id:string){
    this.router.navigate(['/main/user/edit', id])
  }
  public deleteRow(row:User){
   this.service.deleteOneById(row.id).subscribe(()=>this.getAll())
   }

   public filterSource(value:Event){
     this.size = Number((value.target as HTMLSelectElement).value);
     this.dataSource.data = this.originalSource.data.filter((_,index) => index<=this.size);
     this.calcPageCount()
     this.getAll()
   }

   public changeCurrentPage(value:number){
      this.currentPage = value;
      this.getAll();
  }

  incrementPage(){
    if(this.currentPage< this.pageCount)
    this.currentPage = this.currentPage + 1
    else this.currentPage = 1;
    this.getAll()
  }

  decrementPage(){
    if(this.currentPage>1)
    this.currentPage = this.currentPage - 1
    else this.currentPage = this.pageCount;
    this.getAll();
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
