/**
*  Object interface of Company Stock api
**/
export interface Companystock {
  id: number;  //Primary key
  alphaID: string;  //Alpha code of company
  compName: string;  //Company Name
  price: number;  //Current Price
  ystPrice: number;  //Closing Price from previous day
  url: string;  //Url associated with company

}
