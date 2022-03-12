import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { OrgService } from 'src/app/services/organization.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Organization } from 'src/app/model/Organization';
import { ActivatedRoute, Router } from '@angular/router';
import { DictEntity } from 'src/app/model/DictEntity';
import { ConfirmationStatusEnum } from 'src/app/enums';
import { Pic } from 'src/app/model/Pic';
import { CompCatService } from 'src/app/services/compCat.service';
import { User } from 'src/app/model/User';
import { Notify} from 'notiflix'


type Option = {
  id:string,
  value:string
}

@Component({
  selector: 'app-org-edit-panel',
  templateUrl: './org-edit-panel.component.html',
  styleUrls: ['./org-edit-panel.component.css']
})
export class OrgEditPanelComponent implements OnInit {
  title = 'Редактирование организации';

  @Input('ELEMENT_DATA')  ELEMENT_DATA!:  Organization[];

  form:FormGroup;

  data:Organization;

  categories:DictEntity[] = [];

  statuses:Option[] = [];

  OrganizationTypes:Option[] = [];

  images:Pic[];

  imgPaths:string[] = [];

  savingImages:File[]

  constructor(
    private service:OrgService,
    private formBuilder:FormBuilder,
    public dialog: MatDialog,
    private route:ActivatedRoute,
    private router:Router,
    private categoryService:CompCatService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: new FormControl(),
      companyCategory: new FormControl(),
      companyName: new FormControl(),
      confirmationStatus: new FormControl(),
      description: new FormControl(),
      email: new FormControl(),
      iban: new FormControl(),
      id: new FormControl(),
      iin:new FormControl(),
      instagramLink: new FormControl(),
      managerFullName: new FormControl(),
      name: new FormControl(),
      siteLink: new FormControl(),
      telNumber: new FormControl(),
      user:new FormControl(),
      companyCategoryId:new FormControl(),
      userId:new FormControl(),
      pics:new FormControl()
  })
  this.getData();
  this.getStatuses();
  this.getCategories();
  }
  public getData(){
    let id = this.route.snapshot.paramMap.get('id');
    if(id==='new'){
      return
    }
    let resp = this.service.getById(id)
    resp.subscribe(res=>{ 
      this.data = res['data'] as Organization
      Object.keys(this.data).forEach(key => {
        this.form.addControl(key,new FormControl());
        this.form.controls[key].setValue(this.data[key])
      });
      this.form.controls['companyCategoryId'].setValue(this.data.companyCategory.id)
      this.form.controls['userId'].setValue(this.data.user.id)
      this.imgPaths = this.form.controls['pics'].value.map((pic:Pic)=>pic.url)
      console.log(this.form.value);
      
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

  public getCategories(){
    this.categoryService.getAll().subscribe((res)=>this.categories = res['data'])
  }
  public saveForm(){
    this.form.removeControl('companyCategory');
    this.form.removeControl('user');
    const data:Organization = this.form.getRawValue();
      if(data.id) {
       this.service.setById(data).subscribe({
         next:(res)=>Notify.success('Изменения организации сохранены'),
         error:(res)=>Notify.failure('Произошла ошибка при изменении данных организации')
       });
       this.service.addPics(data,this.savingImages).subscribe((res)=>console.log(res))
      }
      else {
        this.service.addOne(data).subscribe((res)=>this.service.addPics(res['data'],this.savingImages).subscribe({
          next:(res)=> Notify.success('Организация успешно зарегистрирована'),
          error:(res)=>Notify.failure('Произошла ошибка при создании организации')
        }));
      }
   }

  public deleteRow(row:Organization){
   this.service.deleteOneById(row.id.toString()).subscribe(()=>this.getData())
   }
   public cancel(){
    this.router.navigate(['/main/Organization'])
  }

  public setUser(user:User){
    this.form.controls['user'].patchValue(user);
    this.form.controls['userId'].patchValue(user.id);
    this.form.controls['managerFullName'].patchValue(`${user.firstName} ${user.lastName}`);
    this.form.controls['telNumber'].patchValue(`${user.telNumber}`);
  }

  public openFileDialog(){
    document.getElementById('upload').click()
  }
 
  public onSelect(event:Event){
    const images = Array.from((event.target as HTMLInputElement).files);
    images.forEach(i=>{
      let reader = new FileReader();
      reader.readAsDataURL(i);
      reader.onload=()=>{
        i['imageResult'] = reader.result
        this.imgPaths.push(reader.result.toString())
      }
    this.savingImages = [...images]
    })
  }
}
