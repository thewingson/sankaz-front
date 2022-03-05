import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SanTypeService } from 'src/app/services/sanType.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DictEnity } from 'src/app/model/DictEntity';

@Component({
  selector: 'app-san-type-edit-panel',
  templateUrl: './san-type-edit-panel.component.html',
  styleUrls: ['./san-type-edit-panel.component.css']
})
export class SanTypeEditPanelComponent implements OnInit {
  title = 'Тип санатория';
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  DictEnity[];

  displayedColumns = ['code','name','nameKz','description','descriptionKz','action'];

  dataSource = new MatTableDataSource<DictEnity>(this.ELEMENT_DATA);

  form:FormGroup;

  constructor(
    private http: HttpClient,
    private service:SanTypeService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog
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
      this.dataSource.data = res['data'] as DictEnity[]
      console.log(this.dataSource.data);
    })
  }
  public editRow(row:DictEnity){
    this.form.patchValue({
      id:row.id,
      code:row.code,
      currentLocaleDescription:row.currentLocaleDescription,
      currentLocaleName:row.currentLocaleName,
      description:row.description,
      descriptionKz:row.descriptionKz,
      name:row.name,
      nameKz:row.nameKz
    })
  }


  public saveForm(){
    const data:DictEnity = this.form.getRawValue();
    if(data.id) this.service.setById(this.form.getRawValue()).subscribe(()=>this.getAll());

    else this.service.addOne(data).subscribe(()=>this.getAll());
   }

  public deleteRow(row:DictEnity){
   this.service.deleteOneById(row).subscribe(()=>this.getAll())
   }
   public clearRow(){
    const data:DictEnity = this.form.getRawValue();
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
