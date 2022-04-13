import { Component, OnInit, Input } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CompCatService } from 'src/app/services/compCat.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { DictEntity } from 'src/app/model/DictEntity';

@Component({
  selector: 'app-comp-cat-edit-panel',
  templateUrl: './comp-cat-edit-panel.component.html',
  styleUrls: ['./comp-cat-edit-panel.component.css']
})
export class CompCatEditPanelComponent implements OnInit {
  title = 'Категории компании';

  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  DictEntity[];

  displayedColumns = ['id','code','name','nameKz','description','descriptionKz','action'];

  dataSource = new MatTableDataSource<DictEntity>(this.ELEMENT_DATA);

  form:FormGroup;

  constructor(
    private http: HttpClient,
    private service:CompCatService,
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
      this.dataSource.data = res['data'] as DictEntity[]
      console.log(this.dataSource.data);
    })
  }
  public editRow(row:DictEntity){
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

