import { Component, OnInit } from '@angular/core';

import * as utils from '../../utils/utils';

@Component({
  selector: 'app-qrcode-creation',
  templateUrl: './qrcode-creation.component.html',
  styleUrls: ['./qrcode-creation.component.scss'],
})
export class QrcodeCreationComponent implements OnInit {
  date: string;
  constructor() {}

  ngOnInit(): void {
    this.date = utils.getValidDateFormat();
  }
}
