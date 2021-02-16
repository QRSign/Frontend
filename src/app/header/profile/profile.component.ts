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
  passedCourses = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profil = this.authService.getProfil();
    this.updateCourses();
  }

  updateCourses(): void {
    this.authService.getCourses(this, this.getCourses);
  }

  getCourses(result): void {
    const today = new Date();
    result.forEach((element) => {
      new Date(element.end_time) < today
        ? this.passedCourses.push(element)
        : this.courses.push(element);
    });
  }

  logout(): void {
    this.authService.logout();
  }

  navigate(value?): void {
    value ? this.router.navigate(['/', value]) : this.router.navigateByUrl('/');
  }

  navigateToCourse(token): void {
    this.router.navigate(['/qrcode', token]);
  }

  deleteCourse(token): void {
    // TODO
    console.log('delete', token);
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
