import { Component, OnInit } from '@angular/core';
import { CompBrnhService} from '../app/comp-brnh.service';
import { DataService } from './data.service';
import { ThrowStmt } from '../../node_modules/@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sample Application!';
  SubmitButton:string;
  CompName1 :string='';
  CompAddress1:string ='';
  ErrorMessage1 : string='';
  newCompanies : Array<ClsCompany> ;
  NextID : number =0;

  currentManipulationID :number;
  
  constructor(private dataService:DataService){

  }
  ngOnInit(){
    this.newCompanies = [];
    this.currentManipulationID = 9999;
    this.SubmitButton = 'Submit Form';
    this.ErrorMessage1 = '';
  }
  logInfo(message:string){
    console.log('');
    console.log(message);
  }
  showError(message:string){
    this.ErrorMessage1 = message;
  }
  isItemsEmpty(){
    if(this.CompName1=='' || this.CompAddress1==''){
      this.logInfo('Failed Empty Test!');
      this.showError('Not to be empty!');
      return true;
    }else{
      this.logInfo('Passed Empty Test!');
      this.showError('');
      return false;
    }
  }
  isDuplicateExists(){
    let dupCompName =  this.newCompanies.find(
      X=>X.ClsCompanyName.toUpperCase()===this.CompName1.toUpperCase()
      && 
      X.ClsCompanyAddress.toUpperCase()===this.CompAddress1.toUpperCase());           
      if(dupCompName!=undefined){
        this.logInfo('Failed isDuplicateExists Test!');
        this.showError('Duplicate Entry, please enter details correctly!');
        return true;
      }else{
        this.logInfo('Passed isDuplicateExists Test!');
        this.showError('');
        return false;
      }
  }
  isDuplicateExistsForEdit(currentID: number){
    let dupCompName =  this.newCompanies.find(
      X=>X.ClsCompanyName.toUpperCase()==this.CompName1.toUpperCase() 
      && 
      X.ClsCompanyAddress.toUpperCase()==this.CompAddress1.toUpperCase()
      && 
      X.ClsCompanyID!=this.currentManipulationID);           
      if(dupCompName!=undefined){
        this.logInfo('Failed isDuplicateExistsForEdit Test!');
        this.showError('Duplicate Entry, please enter details correctly!');
        return true;
      }else{
        this.logInfo('Passed isDuplicateExistsForEdit Test!');
        this.showError('');
        return false;
      }
  }
    submitForm(){    
    // this.CompName1 = 'No';
    // this.CompAddress1 = 'London';
    //alert('Form Submitted!');   
    //this.dataService.companies.push();
    //this.dataService.myCompanyName = this.CompName1;
    //this.dataService.myCompanyAddress = this.CompAddress1 ;
    // console.log(this.dataService.myCompanyName);
    // console.log(this.dataService.myCompanyAddress);
    // this.dataService.companies.push(this.dataService.myCompanyName,this.dataService.myCompanyAddress);
    //console.log(this.dataService.companies);
    //this.dataService.newCompanies.push(new )
    this.logInfo('In Initial Submit Form!');
  if(this.currentManipulationID ==9999){
    this.logInfo('In New Insert!');
      this.NextID = this.newCompanies.length+1;
  
      if(!this.isItemsEmpty()){
        
      // let dupCompAddress =  this.newCompanies.find(
      //   X=>X.ClsCompanyAddress==this.CompAddress1); 
        
        // if(this.CompName1==dupCompName.ClsCompanyName 
        //   && this.CompAddress1==dupCompName.ClsCompanyAddress){
          if(!this.isDuplicateExists()){
              this.newCompanies.push(
                new ClsCompany(
                  this.NextID,
                  this.CompName1,
                  this.CompAddress1));
                  this.logInfo('New Insert Successful!');

            }

        }
      //console.log(this.newCompanies);
        }else{

        // let updateItem =  this.newCompanies.find(X=>X.ClsCompanyID==this.currentManipulationID);

        // //let updateIndex = this.newCompanies.indexOf()

        //   let index = this.newCompanies.indexOf(updateItem);

        //     this.newCompanies[index].ClsCompanyName =this.CompName1 ;
        //     this.newCompanies[index].ClsCompanyAddress = this.CompAddress1 ;
        if(!this.isItemsEmpty())
        {
          if(!this.isDuplicateExistsForEdit(this.currentManipulationID))
          {
            this.newCompanies.find(X=>X.ClsCompanyID==this.currentManipulationID).ClsCompanyName = this.CompName1; 
            this.newCompanies.find(X=>X.ClsCompanyID==this.currentManipulationID).ClsCompanyAddress =this.CompAddress1;
            this.logInfo('Update Successful!');
            this.resetToInitialState();
          }
        }
      }
  }
  resetToInitialState(){
    this.CompName1 ='';
    this.CompAddress1='';
    this.currentManipulationID = 9999;
    this.SubmitButton = 'Submit Form';
    this.logInfo('Reset Initiated!');
  }
  editCompany(ClsID:number){
    //alert(ClsID-1);
    this.currentManipulationID = this.newCompanies.find(X=>X.ClsCompanyID==ClsID).ClsCompanyID; 
    this.CompName1 = this.newCompanies.find(X=>X.ClsCompanyID==ClsID).ClsCompanyName; 
    this.CompAddress1 = this.newCompanies.find(X=>X.ClsCompanyID==ClsID).ClsCompanyAddress; 
    //this.CompName1 = this.newCompanies[this.currentManipulationIndex].ClsCompanyName;
    //this.CompAddress1 = this.newCompanies[this.currentManipulationIndex].ClsCompanyAddress;
    //this.SubmitButton = "Update Company Details";
    this.logInfo('Update Initiated!');
    this.SubmitButton = 'Update Company Details';
  }
  deleteCompany(ClsID:number){
    this.currentManipulationID = this.newCompanies.find(X=>X.ClsCompanyID==ClsID).ClsCompanyID; 
    let updateItem =  this.newCompanies.find(X=>X.ClsCompanyID==this.currentManipulationID);
    //let updateIndex = this.newCompanies.indexOf(updateItem);
    //this.newCompanies.splice(updateIndex,1);
    this.newCompanies = this.newCompanies.filter(X=>X!=updateItem);
    //alert(ClsID-1);
    //this.currentManipulationID = ClsID-1;
    this.logInfo('Delete Successful!');
    this.resetToInitialState();
    
  }
  clearInMemeory(){
    this.newCompanies = [];
    this.showError('');
    this.resetToInitialState();
  }
}

export class ClsCompany{
  ClsCompanyID: number;
  ClsCompanyName : string;
  ClsCompanyAddress:string;
  constructor(
      public ClsCompanyID1:number,
      public ClsCompanyName1:string, 
      public ClsCompanyAddress1:string  
    ){
    this.ClsCompanyID = ClsCompanyID1;
    this.ClsCompanyName = ClsCompanyName1;
    this.ClsCompanyAddress = ClsCompanyAddress1;
  }
}
