import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';

interface RepaymentTensure {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  monthlyIncome;
  monthlyExpense;
  min=100000;
  max=300000;
  minExp;
  maxExp;
  selectedValue: number;
  repayTensure: RepaymentTensure[] = [
    {value: 6, viewValue: '6 Months'},
    {value: 12, viewValue: '12 Months'},
    {value: 18, viewValue: '18 Months'}
  ];
  grantToBeAmt: number=0;
  loanAmt: number =0;
  constructor() { }

  ngOnInit(): void {
    this.monthlyIncome = 100000;
    this.monthlyExpense = 0;
    this.minExp = 0;
    this.selectedValue=6;
    this.maxExp = this.monthlyIncome;
  }
  onMonthlyIncomeChanges(){
    if(this.monthlyIncome > this.monthlyExpense){
      this.grantToBeAmt = this.monthlyIncome-this.monthlyExpense;
    this.loanAmt= this.grantToBeAmt/this.selectedValue;
   }else if(this.monthlyIncome == this.monthlyExpense){
     alert('Sorry loan amt cannot be granted');
     this.grantToBeAmt = 0.00;
     this.loanAmt = 0.00;
   }
  }
  onSliderChange(event?: MatSliderChange){
    this.maxExp = this.monthlyIncome;
    let expense = event.value;
    if(this.monthlyIncome > expense){
       this.grantToBeAmt = this.monthlyIncome-expense;
     this.loanAmt= this.grantToBeAmt/this.selectedValue;
    }else if(this.monthlyIncome == expense){
      alert('Sorry loan amt cannot be granted');
      this.grantToBeAmt = 0.00;
      this.loanAmt = 0.00;
    }
  }
  onChanges() {
      this.loanAmt= this.grantToBeAmt/this.selectedValue;
  }
}
