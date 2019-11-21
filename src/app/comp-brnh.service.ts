import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompBrnhService {
  CompName: string;
  CompAddress:string;

  constructor(public compName: string ='', public compAddress:string='') { }
}
