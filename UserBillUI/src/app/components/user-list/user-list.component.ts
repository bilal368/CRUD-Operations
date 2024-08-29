import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [HttpClientModule],
  providers:[ApiService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getUsers().subscribe((data) => {      
      this.users = data;
    });
  }

  viewBills(userId: string) {
    this.router.navigate([`/users/${userId}/bills`]);
  }

  vacateUser(userId: string) {
    this.apiService.vacateUser(userId).subscribe(
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