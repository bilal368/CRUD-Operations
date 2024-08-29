import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers:[ApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { name: '', password: '' };

  constructor(private apiService: ApiService, private router: Router) {}

  login() {
    this.apiService.login(this.credentials).subscribe(
      (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/users']);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
