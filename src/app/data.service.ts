import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  myCompanyName : string;
  myCompanyAddress: string;
  constructor() { }

  companies =[];

  newCompanies : Array<ClsCompany>;

  myData(){
    return 'The data is from Service!';
  }
}

export class ClsCompany{

  ClsCompanyName : string;
  ClsCompanyAddress:string;

}
