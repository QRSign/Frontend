import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode-creation',
  templateUrl: './qrcode-creation.component.html',
  styleUrls: ['./qrcode-creation.component.scss'],
})
export class QrcodeCreationComponent implements OnInit {
  title: string = 'Créer un nouveau cours';

  newCourseForm: FormGroup;
  prof_name = new FormControl('', [Validators.required]);
  course_name = new FormControl('', [Validators.required]);
  date = new FormControl(new Date());

  constructor(
    private _adapter: DateAdapter<any>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._adapter.setLocale('fr');
    this.newCourseForm = this.fb.group({
      prof_name: this.prof_name,
      course_name: this.course_name,
      date: this.date,
    });
  }

  onSubmit(): void {
    console.log(this.newCourseForm.value);
  }
}
