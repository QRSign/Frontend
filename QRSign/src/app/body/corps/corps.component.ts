import { Component, OnInit } from '@angular/core';

import * as utils from '../../utils/utils';

@Component({
  selector: 'app-corps',
  templateUrl: './corps.component.html',
  styleUrls: ['./corps.component.scss'],
})
export class CorpsComponent implements OnInit {
  todayDate: String;
  test: boolean = false;

  constructor() {}

  ngOnInit(): void {
    var now = new Date().toString().split(' ');
    console.log('now', now);
  }

  getTime() {
    this.todayDate = utils.getTodayDate();
  }

  qrcode() {
    this.test = !this.test;
  }
}
