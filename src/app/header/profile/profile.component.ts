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
  courses = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profil = this.authService.getProfil();
    this.updateCourses();
  }

  updateCourses(): void {
    this.authService.getCourses(this, this.getCourses);
  }

  getCourses(result): void {
    this.courses = result;
    console.log(this.courses);
  }

  logout(): void {
    this.authService.logout();
  }

  navigate(value = ''): void {
    this.router.navigate(['/', value]);
  }

  navigateToCourse(token): void {
    this.router.navigate(['/qrcode', token]);
  }

  formatDate(date: string) {
    const newDate = new Date(date);
    const result = `${
      newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()
    }/${
      newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth()
    }/${newDate.getFullYear()}`;
    return result;
  }

  onHover(event) {
    event.currentTarget.classList.add('over');
  }

  onLeave(event) {
    event.currentTarget.classList.remove('over');
  }
}
