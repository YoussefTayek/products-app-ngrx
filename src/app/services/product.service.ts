import { Product } from './../model/product.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ok } from 'assert';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host = (Math.random()>0.2) ? environment.host : environment.unreachableHost;
  constructor(private http: HttpClient) { 

  }

  getAllProducts(): Observable<Product[]> {
    
   return this.http.get<Product[]>(this.host+"/products");
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+"/products?selected=true");
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+"/products?available=true");
  }

  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.host+"/products?name_like="+keyword);
  }

  selectProduct(product:Product): Observable<Product> {
    product.selected=!product.selected;
    return this.http.put<Product>(this.host+"/products/"+product.id, product);
  }

  deleteProduct(product:Product): Observable<void> {
    return this.http.delete<void>(this.host+"/products/"+product.id);
  }

  addProduct(product:Product): Observable<Product> {
    return this.http.post<Product>(this.host+"/products", product);
  }
  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>(this.host+"/products/"+id);
  }
  updateProduct(product: Product) : Observable<Product> {
    return this.http.put<Product>(this.host+"/products/"+product.id, product);
  }

}
