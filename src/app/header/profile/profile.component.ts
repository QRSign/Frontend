import { Component, Injectable, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
@Injectable({
  providedIn: 'root',
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
      if (new Date(element.end_time) < today) {
        if (this.passedCourses.indexOf(1) === -1) {
          this.passedCourses.push(element);
        }
      } else {
        if (this.courses.indexOf(1) === -1) {
          this.courses.push(element);
        }
      }
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

  updateDeleteCourse(id) {
    this.courses.forEach((element) => {
      if (element.id == id) {
        this.courses.splice(element, 1);
      }
    });
    this.passedCourses.forEach((element) => {
      if (element.id == id) {
        this.passedCourses.splice(element, 1);
      }
    });
  }

  deleteCourse(id): void {
    this.authService.deleteCourse(this, this.updateDeleteCourse, id);
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
