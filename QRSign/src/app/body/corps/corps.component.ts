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
    this.getTime();
  }

  getTime() {
    this.todayDate = utils.getTodayDate() + 'T' + utils.getTodayTime();
  }

  qrcode() {
    this.test = !this.test;
  }
}
