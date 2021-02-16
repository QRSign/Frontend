import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/utils/services/auth.service';
import {
  CreationCoursPayload,
  CreationService,
} from 'src/app/utils/services/creation.service';
import { MessageService } from 'src/app/utils/services/message.service';

@Component({
  selector: 'app-qrcode-creation',
  templateUrl: './qrcode-creation.component.html',
  styleUrls: ['./qrcode-creation.component.scss'],
})
export class QrcodeCreationComponent implements OnInit {
  title: string = 'Créer un nouveau cours';
  now: Date = new Date();

  newCourseForm: FormGroup;
  course_name = new FormControl('', [Validators.required]);
  date = new FormControl(this.now);
  time = new FormControl(
    `${
      ('' + this.now.getHours()).length < 2
        ? '0' + this.now.getHours()
        : this.now.getHours()
    }:${
      ('' + this.now.getMinutes()).length < 2
        ? '0' + this.now.getMinutes()
        : this.now.getMinutes()
    }`,
    [Validators.required]
  );
  timer = new FormControl('30', [Validators.required]);
  timeUnity = new FormControl('min', [Validators.required]);

  coursCreationInfos: CreationCoursPayload = {
    title: '', // "DevOps2"
    user: 0, // "1"
    start_time: '', // "1999-07-11 10:30"
    end_time: '', // "1999-07-11 10:35"
  };

  constructor(
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private authService: AuthService,
    private creationService: CreationService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.dateAdapter.setLocale('fr');
    this.newCourseForm = this.fb.group({
      course_name: this.course_name,
      date: this.date,
      time: this.time,
      timer: this.timer,
      timeUnity: this.timeUnity,
    });
  }

  format(): void {
    const title = this.newCourseForm.value.course_name;
    const user = this.authService.getProfil().id;
    const start_time = this.formatDateTime(this.newCourseForm.value.date);
    const end_time = this.formatDateTime(
      this.newCourseForm.value.date,
      this.newCourseForm.value.timer
    );

    this.coursCreationInfos = {
      title: title,
      user: user,
      start_time: start_time,
      end_time: end_time,
    };
  }

  formatDateTime(dateToFormat: Date, timeToAdd = 0) {
    const validity =
      this.newCourseForm.value.timeUnity == 'min'
        ? parseInt('' + timeToAdd)
        : 60 * parseInt('' + timeToAdd);
    const time = this.newCourseForm.value.time;
    const date = dateToFormat.toLocaleDateString().split('/');
    const year = date[2];
    const month = date[1];
    const day = date[0];
    const tempDate = `${year}-${month}-${day} ${time}`;

    const newDate = new Date(tempDate);
    const minutes = newDate.getMinutes();
    newDate.setMinutes(minutes + validity);
    const newTime = `${
      ('' + newDate.getHours()).length < 2
        ? '0' + newDate.getHours()
        : newDate.getHours()
    }:${
      ('' + newDate.getMinutes()).length < 2
        ? '0' + newDate.getMinutes()
        : newDate.getMinutes()
    }`;

    const res = newDate.toLocaleDateString().split('/');
    const newYear = res[2];
    const newMonth = res[1];
    const newDay = res[0];

    return `${newYear}-${newMonth}-${newDay} ${newTime}`;
  }

  onSubmit(): void {
    this.format();
    this.creationService.create(this.coursCreationInfos).subscribe(
      (res) => {
        this.router.navigate(['/qrcode', res.token]);
      },
      (err) => {
        this.messageService.openSnackBar(err.error.message, 'error');
      }
    );
  }
}
