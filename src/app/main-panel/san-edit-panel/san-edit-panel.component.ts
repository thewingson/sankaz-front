import { Component, OnInit, Input } from '@angular/core';
import { SanService } from 'src/app/services/san.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sanatory } from 'src/app/model/Sanatory';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderService } from 'src/app/services/gender.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DictEntity } from 'src/app/model/DictEntity';
import { ConfirmationStatusEnum, userTypeEnum } from 'src/app/enums';
import { SanTypeService } from 'src/app/services/sanType.service';

type Option = {
  id:string,
  value:string
}

@Component({
  selector: 'app-san-edit-panel',
  templateUrl: './san-edit-panel.component.html',
  styleUrls: ['./san-edit-panel.component.css']
})
export class SanEditPanelComponent implements OnInit {
  title = 'Редактирование санатория';

  form:FormGroup;

  data:Sanatory;

  genders:DictEntity[];

  cities:DictEntity[] = [];

  statuses:Option[] = [];

  userTypes:Option[] = [];

  sanTypes:DictEntity[] = [];

  constructor(
    private service:SanService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private router:Router,
    private cityService:CitiesService,
    private sanTypesService:SanTypeService
    ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl(),
      description: new FormControl(),
      instagramLink:new FormControl(),
      siteLink:new FormControl(),
      sanTypeId: new FormControl(),
      telNumbers: new FormControl(),
      pic:new FormControl(),
      cityId: new FormControl(),
      orgId: new FormControl(),
      longitude:new FormControl(),
      latitude:new FormControl(),
      pics: new FormControl(),
    })
  }

  public getData(){
    this.getStatuses();
    this.getSanTypes();
    this.getCities();
    let id = this.route.snapshot.paramMap.get('id');
    if(id==='new'){
      return
    }
    let resp = this.service.getById(id)
    resp.subscribe(res=>{ 
      this.data = res['data'] as Sanatory
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setValue(this.data[key])
        console.log(this.form.controls['telNumbers'].get);
      })
    })
  }


  public getCities(){
    let resp = this.cityService.getAll()
    resp.subscribe(res=>{
      this.cities = res['data'] as DictEntity[]
    })
  }

  public getStatuses(){
    for (const value in ConfirmationStatusEnum) {
      this.statuses.push({
        id:value,
        value:ConfirmationStatusEnum[value]
      });
    }
  }

  public getUserTypes(){
    for (const value in userTypeEnum) {
      this.userTypes.push({
        id:value,
        value:userTypeEnum[value]
      });
    }
  }

  public saveForm(){
    const data:Sanatory = this.form.getRawValue();
    console.log(data);
      if(data.id) {
        this.service.setById(data).subscribe((res)=>console.log(res));
      }
      else this.service.addOne(data).subscribe((res)=>console.log(res));
   }

  public deleteRow(id){
   this.service.deleteOneById(id).subscribe(()=>this.getData())
   }
   public cancel(){
    this.router.navigate(['/main/san'])
  }
  public openFileDialog(){
    document.getElementById('upload').click()
  }
  public getCityNameById(id:number){
      return this.cities.find(c=>c.id === id).name
  }
  public getSanTypes(){
    this.sanTypesService.getAll().subscribe({
      next: (res) => this.sanTypes = res['data'] 
    })
  }  public getSanTypeById(id:number){
    return this.sanTypes.find(c=>c.id === id).name
}

}
