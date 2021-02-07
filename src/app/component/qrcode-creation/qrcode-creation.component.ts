import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as utils from '../../utils/utils';

@Component({
  selector: 'app-qrcode-creation',
  templateUrl: './qrcode-creation.component.html',
  styleUrls: ['./qrcode-creation.component.scss'],
})
export class QrcodeCreationComponent implements OnInit {
  date: string;
  title: string = 'Créer un nouveau cours';

  newCourseForm: FormGroup;
  course_name = new FormControl('', [Validators.required]);

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.date = utils.getValidDateFormat();
    this.newCourseForm = this.fb.group({
      course_name: this.course_name,
    });
  }

  onSubmit(): void {
    console.log('submited');
  }
}
