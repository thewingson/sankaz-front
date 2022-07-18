import { OnInit, Input, Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FaqService } from 'src/app/services/faq.service';
import { Faq } from 'src/app/model/Faq';
import { Notify } from 'notiflix';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'faq-panel',
  templateUrl: './faq-panel.component.html',
  styleUrls: ['./faq-panel.component.css']
})
export class FaqPanelComponent implements OnInit {

  title = 'Часто задаваемые вопросы';

  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Faq[];

  displayedColumns = ['id','question','answer','action'];

  dataSource = new MatTableDataSource<Faq>(this.ELEMENT_DATA);

  originalSource = new MatTableDataSource<Faq>(this.ELEMENT_DATA);

  size:number=10;

  total:number;

  currentPage:number = 0;

  pageCount:number;

  pages:number[];

  currentRow:Faq;

  mode:string;

  @ViewChild('childModal') public childModal:ModalDirective;

  constructor(
    private service:FaqService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAll() 
  }

  public getAll(){
    let resp = this.service.getAll(this.currentPage,this.size)
    resp.subscribe(res=>{
      this.originalSource.data = res['data']['content'] as Faq[]
      this.dataSource.data = this.originalSource.data.filter((_,index)=> index<=this.size)
      this.total = res['data']['totalElements']
      this.calcPageCount();
    })
  }
  public editRow(row:Faq){
    console.log('EDIT CLICK');
    this.currentRow = row;
    this.mode='EDIT'
  }
  public deleteRow(row:Faq){
    this.dialog.open(FaqApproveDialog,{data:{id:row.id}}).afterClosed().subscribe(res=>{
      if(res) this.getAll();
    })
   }

   public filterSource(value:Event){
     this.size = Number((value.target as HTMLSelectElement).value);
     this.dataSource.data = this.originalSource.data.filter((_,index) => index<=this.size);
     this.calcPageCount()
     this.getAll()
   }

   public changeCurrentPage(value:number){
      this.currentPage = value-1;
      this.getAll();
  }

  public onRowClick(row:Faq){
    console.log('ROW CLICK');
      this.currentRow = row;
      this.mode = 'VIEW';
  }

  public  onCreateClick(){
    console.log('CREATE Click')
    this.mode = 'CREATE'
  }

  incrementPage(){
    if(this.currentPage< this.pageCount - 1)
    this.currentPage = this.currentPage + 1
    else this.currentPage = 1;
    this.getAll()
  }

  decrementPage(){
    if(this.currentPage>0)
    this.currentPage = this.currentPage - 1
    else this.currentPage = this.pageCount;
    this.getAll()
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

@Component({
  selector: 'faq-edit-modal',
  templateUrl: './faq-edit-modal.component.html',
  styleUrls: ['./faq-panel.component.css']
})
export class FaqEditModal implements OnInit {


  @Input() row:Faq;
  @Input() mode:string;

  constructor(
    private service:FaqService,
    ) {
      if(this.mode==='CREATE')
      this.row = undefined;
     }

  ngOnInit(): void {
    console.log(this.mode)
  }

  public onSave(){
    if(this.mode==='EDIT')
    this.service.editOne(this.row).subscribe((res)=>console.log(res))
    if(this.mode==='CREATE'){
      this.service.addOne(this.row).subscribe((res)=>console.log(res))
    }
  }

  public changeQuestion(e:Event){
    if(this.row) this.row.question = (e.target as HTMLInputElement).value;
    else {
      this.row = {question:(e.target as HTMLInputElement).value,answer:undefined,id:undefined}
    }
  }

  public changeAnswer(e:Event){
    if(this.row)
    this.row.answer = (e.target as HTMLInputElement).value;
    else {
      this.row = {question:undefined,answer:(e.target as HTMLInputElement).value,id:undefined}
    }
  }

}

@Component({
  selector: 'faq-approve-dialog',
  templateUrl: 'faq-approve-dialog.component.html',
})

export class FaqApproveDialog {

  title:string = 'Вы уверены, что хотите удалить данную запись?';
  constructor(private dialogRef: MatDialogRef<any>, private service:FaqService, @Inject(MAT_DIALOG_DATA) public data:any){
  this.onOk = () => this.service.deleteOne(this.data.id).subscribe({
      next:(v)=>Notify.success('Запись удалена'),
      error:(e)=>Notify.failure('Произошла ошибка при удалении записи'),
      complete:()=>dialogRef.close(true)
    });
  }

  public onOk(){
  }
}
