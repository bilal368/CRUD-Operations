import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers:[ApiService],
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.css'
})
export class BillListComponent implements OnInit {
  bills: any[] = [];
  userId: string;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.apiService.getUserBills(this.userId).subscribe((data) => {
      this.bills = data;
    });
  }

  payBill(billId: string) {
    this.apiService.payBill(billId).subscribe(
      (res) => {
        alert(res.message);
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
      }
    );
  }

  createBill() {
    const billData = {
      amount: 100,
      dueDate: new Date(),
      userId: this.userId,
      billType: 'other',
    };
    this.apiService.createBill(billData).subscribe(
      (res) => {
        alert(res.message);
        this.ngOnInit();
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
