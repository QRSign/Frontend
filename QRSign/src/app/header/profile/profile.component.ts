import { Component, Input, OnInit } from '@angular/core';
import { Profil } from 'src/app/utils/models/profil';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() profil;

  constructor() {}

  ngOnInit(): void {}
}
