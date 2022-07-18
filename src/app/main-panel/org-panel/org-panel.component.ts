import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/model/Organization';
import { Router } from '@angular/router';
import { OrgFormData,OrgService} from 'src/app/services/organization.service';
import { Notify} from 'notiflix'



@Component({
  selector: 'app-org-panel',
  templateUrl: './org-panel.component.html',
  styleUrls: ['./org-panel.component.css', "../main-panel.component.css"]
})
export class OrgPanelComponent implements OnInit {

  title = 'Организации';

  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Organization[];

  displayedColumns = ['id','name','managerFullName','email','telNumber','address','action'];

  dataSource = new MatTableDataSource<Organization>(this.ELEMENT_DATA);

  form:FormGroup;

  originalSource = new MatTableDataSource<Organization>(this.ELEMENT_DATA);

  size:number=10;

  total:number;

  currentPage:number = 0;

  pageCount:number;

  pages:number[];

  params:OrgFormData = {
    size:undefined,
    address:undefined,
    companyCategoryCode:undefined,
    companyName:undefined,
    confirmationStatus:undefined,
    name:undefined,
    page:undefined,
  }

  constructor(
    private service:OrgService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll() 
  }

  public getAll(){
    this.params.size = this.size.toString();
    this.params.page = this.currentPage.toString();
    let resp = this.service.getAll(this.params)
    resp.subscribe(res=>{
      this.originalSource.data = res['data']['content'] as Organization[]
      this.dataSource.data = this.originalSource.data.filter((_,index)=> index<=this.size)
      this.total = res['data']['total']
      this.calcPageCount();
    })
  }
  public editRow(id:string){
    this.router.navigate(['/main/org/edit', id])
  }
 
  public deleteRow(row:Organization){
    this.dialog.open(OrgApproveDialog,{data:{id:row.id}}).afterClosed().subscribe(res=>{
      if(res) this.getAll();
    })}

   public filterSource(value:Event){
     this.size = Number((value.target as HTMLSelectElement).value);
     this.dataSource.data = this.originalSource.data.filter((_,index) => index<=this.size);
     this.calcPageCount()
   }

   public changeCurrentPage(value:number){
      this.currentPage = value;
      this.getAll();
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
  public onOpenDialog(id:string,status:number){
    this.dialog.open(ApproveDialog,{data:{id:id,status:status}}).afterClosed().subscribe(res=>{
      if(res) this.getAll();
    })
  }

}
@Component({
  selector: 'approve-dialog',
  templateUrl: 'approve-dialog.component.html',
})

export class ApproveDialog {

  title:string = '';
  rejectionMessage:string ='';
  constructor(private dialogRef: MatDialogRef<any>, private service:OrgService, @Inject(MAT_DIALOG_DATA) public data:any){

  if(this.data.status === 1){
    this.title = "Вы уверены, что хотите утвердить заявку?";
    this.onOk = () =>{
      this.service.approveOrg(this.data.id)
      .subscribe({
        next:(v)=>Notify.success('Заявка успешно утверждена'),
        error:(e)=>Notify.failure('Произошла ошибка при утверждении заявки'),
        complete:()=>dialogRef.close(true)
      });
    }
  }
  if(this.data.status === 2){
    this.title = "Вы уверены, что хотите отклонить заявку?"
    this.onOk = () =>{
      if(this.rejectionMessage.length>=12){
        this.service.rejectOrg(this.data.id,this.rejectionMessage)
        .subscribe({
          next:(v)=>Notify.success('Заявка была отклонена'),
          error:(e)=>Notify.failure('Произошла ошибка при отклонении заявки'),
          complete:()=>dialogRef.close(true)
        });
      }
      else Notify.failure('Сообщение при отклонении заявки должна быть минимум 12 символов') 
    }
  }
  }
  public onOk(){}
}
@Component({
  selector: 'org-approve-dialog',
  templateUrl: 'org-approve-dialog.component.html',
})

export class OrgApproveDialog {

  title:string = 'Вы уверены, что хотите удалить данную запись?';
  constructor(private dialogRef: MatDialogRef<any>, private service:OrgService, @Inject(MAT_DIALOG_DATA) public data:any){
  this.onOk = () => this.service.deleteOneById(this.data.id).subscribe({
      next:(v)=>Notify.success('Запись удалена'),
      error:(e)=>Notify.failure('Произошла ошибка при удалении записи'),
      complete:()=>dialogRef.close(true)
    });
  }

  public onOk(){
  }
}