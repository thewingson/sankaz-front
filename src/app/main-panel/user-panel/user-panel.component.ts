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

  displayedColumns = ['username','fullName','userType','confirmationStatus','action'];
 

  dataSource = new MatTableDataSource<User>(this.ELEMENT_DATA);

  form:FormGroup;

  total:number;

  constructor(
    private service:UserService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll() 
  }

  public getAll(){
    let resp = this.service.getAll()
    resp.subscribe(res=>{
      this.dataSource.data = res['data']['content'] as User[]
      console.log(this.dataSource.data);
    })
  }
  public editRow(row:User){
    this.router.navigate(['/main/user/edit', row.id])
  }
  public deleteRow(row:User){
   this.service.deleteOneById(row.id).subscribe(()=>this.getAll())
   }
}
