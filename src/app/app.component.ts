import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { Companystock } from './model/companystock';
import { StockService } from './services/stockservice';
import { Observable, interval, Subscription  } from "rxjs";
import { HttpErrorResponse, HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})

/**
* Main component for the WebStock app. Calls service and returns companystock data
* from api. Html holds table and displays out all data along with making it sortable.
**/
export class AppComponent implements OnInit, OnDestroy{

  @Input() public stocks: Companystock[];
  public tableHeaders: string[] = ["#", "Company Name", "Price","Change", "Chg%"];
  colors = ["green" , "red","black"];  //Color array
  private sorted: boolean = false;
  public stock: Companystock;
  public color: string;  //Color variable used in the getColor method
  source;
  subscription: Subscription;

  constructor(private stockService: StockService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
   //this.source = interval(1000);
  //this.subscription = this.source.subscribe(val => this.getStocks());
  this.getStocks();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  /**
  *  Sorting algorithm for columns. Takes in column name, changes it to the api field name.
  *  Then sorts either by descending or ascending order.
  **/
  sort(colName, sorted){

    switch(colName){
      case("#"):
        colName = "alphaID";
        break;
      case("Company Name"):
        colName = "compName";
        break;
      case("Price"):
        colName = "price";
        break;
    }

    if(this.sorted == true){
      this.stocks.sort((a, b) => a[colName] < b[colName] ? 1: a[colName] > b[colName] ? -1 : 0);
      this.sorted = !this.sorted;
    }else{
      this.stocks.sort((a, b) => a[colName] > b[colName] ? 1: a[colName] < b[colName] ? -1 : 0);
      this.sorted = !this.sorted;
    }
  }

  /**
  *  Determines value of column change total
  **/
  public detectPriceChanges(newPrice: number, oldPrice: number): string{

    var value = newPrice - oldPrice;

    this.getColor(value);

    return value.toFixed(2);

  }

  /**
  *  Determines value of column change total
  **/
  public detectPricePercentage(newPrice: number, oldPrice: number): string{

    var value = newPrice - oldPrice;
    var percent = value / oldPrice * 100;

    this.getColor(value);

    return percent.toFixed(2) + "%";

  }

  /**
  *  Changes variable of color to either Green for Positive, Red for negative, or
  *  Black if neutral.
  **/
  private getColor(value){
    this.color = "";

    if(value > 0){
     this.color = this.colors[0];
    }else if(value < 0){
      this.color = this.colors[1];
    }else{
      this.color = this.colors[2];
    }
  }


  /**
  *  Returns companystock api data using the service class.
  **/
  public getStocks(): void{
      this.stockService.getStocks().subscribe(
      (response: Companystock[]) => {
        this.stocks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });

  }

  /**
  *  Opens new tab from the click event on the row name.
  **/
  openNewTab(id){
    if(Array.isArray(this.stocks) && this.stocks.length){
      const stocks = this.stocks.find((url) => url.id === id);

      window.open(stocks.url, "_blank");
    }


  }
}
