import { Component, OnInit } from '@angular/core';
import { AuthService } from '../utils/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  profil;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.profil = this.auth;
  }
}
