import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corps',
  templateUrl: './corps.component.html',
  styleUrls: ['./corps.component.scss']
})
export class CorpsComponent implements OnInit {
test:boolean=false
  constructor() { }

  ngOnInit(): void {
  }
  qrcode(){
    this.test=!this.test
  }
}
