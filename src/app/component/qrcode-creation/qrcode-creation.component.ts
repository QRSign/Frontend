import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-creation',
  templateUrl: './qrcode-creation.component.html',
  styleUrls: ['./qrcode-creation.component.scss'],
})
export class QrcodeCreationComponent implements OnInit {
  title: string = 'Créer un nouveau cours';
  now: Date = new Date();

  newCourseForm: FormGroup;
  prof_name = new FormControl('', [Validators.required]);
  course_name = new FormControl('', [Validators.required]);
  date = new FormControl(this.now);
  time = new FormControl('', [Validators.required]);
  timer = new FormControl('30', [Validators.required]);
  timeUnity = new FormControl('min', [Validators.required]);

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    console.log('time', new Date().getTimezoneOffset());
    this.newCourseForm = this.fb.group({
      prof_name: this.prof_name,
      course_name: this.course_name,
      date: this.date,
      time: this.time,
      timer: this.timer,
      timeUnity: this.timeUnity,
    });
  }

  onSubmit(): void {
    console.log(this.newCourseForm.value);
  }
}
