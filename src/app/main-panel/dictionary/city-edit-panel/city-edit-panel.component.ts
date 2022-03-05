import { Component, Input, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { CitiesService } from 'src/app/services/cities.service';
import { MatTableDataSource } from '@angular/material/table';
import { DictEnity } from '../../../model/DictEntity';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-city-edit-panel',
  templateUrl: './city-edit-panel.component.html',
  styleUrls: ['./city-edit-panel.component.css']
})

export class CityEditPanelComponent implements OnInit {
  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  DictEnity[];

  displayedColumns = ['code','name','nameKz','description','descriptionKz','action'];

  dataSource = new MatTableDataSource<DictEnity>(this.ELEMENT_DATA);

  title = 'Город';

  form:FormGroup;

  constructor(
    private http: HttpClient,
    private service:CitiesService,
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
    let resp = this.service.getAllCities()
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
    if(data.id) this.service.setCityById(this.form.getRawValue()).subscribe(()=>this.getAll());

    else this.service.addOne(data).subscribe(()=>this.getAll());
   }

  public deleteRow(row:DictEnity){

   this.service.deleteOneById(row).subscribe(()=>this.getAll())
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

