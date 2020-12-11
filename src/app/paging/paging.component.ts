import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  constructor() { }
  @Input() page;

  @Output() newPage = new EventEmitter();

  prevPage() {
    if (this.page > 1) {
      this.newPage.emit(this.page - 1);
    }
  }
  NextPage() {
    this.newPage.emit(this.page + 1);
  }

  ngOnInit(): void {
  }

}
