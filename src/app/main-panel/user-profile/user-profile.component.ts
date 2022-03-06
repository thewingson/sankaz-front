import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderService } from 'src/app/services/gender.service';
import { CitiesService } from 'src/app/services/cities.service';
import { DictEntity } from 'src/app/model/DictEntity';
import { ConfirmationStatusEnum, userTypeEnum } from 'src/app/enums';

type Option = {
  id:string,
  value:string
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  title = 'Профиль пользователя'

  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  User[];

  form:FormGroup;

  data:User;

  genders:DictEntity[];

  cities:DictEntity[] = [];

  statuses:Option[] = [];

  userTypes:Option[] = [];

  constructor(
    private http: HttpClient,
    private service:UserService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private router:Router,
    private genderService:GenderService,
    private cityService:CitiesService
    ) { }

  ngOnInit(): void {
    this.getData();
    this.form = this.formBuilder.group({
      id:new FormControl(),
      username:new FormControl(),
      userType:new FormControl(),
      confirmationStatus:new FormControl(),
      email:new FormControl(),
      cityId:new FormControl(),
      genderId:new FormControl(),
      telNumber:new FormControl(),
      firstName:new FormControl(),
      lastName:new FormControl()
    })
  }

  public getData(){
    this.getGenders();
    this.getStatuses();
    this.getUserTypes();
    this.getCities();
    let id = this.route.snapshot.paramMap.get('id')
    let resp = this.service.getById(id)
    resp.subscribe(res=>{
      this.data = res['data'] as User
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].setValue(this.data[key])
      });
      this.form.controls['gender'].setValue(this.data.gender.id)
      this.form.controls['city'].setValue(this.data.city.id)
    })
  }

  public getGenders(){
    let resp = this.genderService.getAll()
    resp.subscribe(res=>{
      this.genders = res['data'] as DictEntity[]
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
    const data:User = this.form.getRawValue();
    console.log(data);
    
      if(data.id) {
        this.service.setById(data).subscribe((res)=>console.log(res));
      }
      else this.service.addOne(data).subscribe((res)=>console.log(res));
   }

  public deleteRow(row:User){
   this.service.deleteOneById(row.id).subscribe(()=>this.getData())
   }
   public cancel(){
    this.router.navigate(['/main/user'])
  }

}
