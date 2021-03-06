import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  Date: string;
  Cours: string;
  PDF: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { Date: '13/02/2021', Cours: 'Ux Design', PDF: 'Ux Design' },
  { Date: '12/02/2021', Cours: 'Methodologie de recherche', PDF: 'Ux Design' },
  { Date: '11/02/2021', Cours: 'DevOps', PDF: 'Ux Design' },
];

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  displayedColumns: string[] = ['Date', 'Cours', 'PDF', 'Sup'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
