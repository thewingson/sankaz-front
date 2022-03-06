import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServCatService } from 'src/app/services/servCat.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DictEntity } from 'src/app/model/DictEntity';
import {Router} from '@angular/router'

@Component({
  selector: 'app-san-panel',
  templateUrl: './san-panel.component.html',
  styleUrls: ['./san-panel.component.css', "../main-panel.component.css"]
})
export class SanPanelComponent implements OnInit {

  title = 'Санатории';
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  DictEntity[];

  displayedColumns = ['code','name','nameKz','description','descriptionKz','action'];

  dataSource = new MatTableDataSource<DictEntity>(this.ELEMENT_DATA);

  form:FormGroup;

  constructor(
    private http: HttpClient,
    private service:ServCatService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.getAll();
    this.form = this.formBuilder.group({
      id:'',
      code:'',
      currentLocaleDescription:'',
      currentLocaleName:'',
      description:'',
      descriptionKz:'',
      name:'',
      nameKz:''
    })
  }

  public getAll(){
    let resp = this.service.getAll()
    resp.subscribe(res=>{
      this.dataSource.data = res['data'] as DictEntity[]
      console.log(this.dataSource.data);
    })
  }
  public editRow(id:string){
    this.router.navigate(['/main/sanEdit', id])
  }

  public saveForm(){
    const data:DictEntity = this.form.getRawValue();
    if(data.id) this.service.setById(this.form.getRawValue()).subscribe(()=>this.getAll());

    else this.service.addOne(data).subscribe(()=>this.getAll());
   }

  public deleteRow(row:DictEntity){
   this.service.deleteOneById(row.id.toString()).subscribe(()=>this.getAll())
   }
   public clearRow(){
    this.form.patchValue({
      id:'',
      code:'',
      currentLocaleDescription:'',
      currentLocaleName:'',
      description:'',
      descriptionKz:'',
      name:'',
      nameKz:''
    })
  }

}
