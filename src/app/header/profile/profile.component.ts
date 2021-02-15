import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() profil;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profil = this.authService.getProfil();
  }

  logout(): void {
    this.authService.logout();
  }
  navigate(value = ''): void {
    this.router.navigate(['/', value]);
  }
}
