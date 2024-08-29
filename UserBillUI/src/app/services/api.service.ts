import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  getUserBills(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${userId}/bills`);
  }

  createBill(billData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bills`, billData);
  }

  payBill(billId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/bills/${billId}/pay`, {});
  }

  vacateUser(userId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/vacate`, {});
  }
}
