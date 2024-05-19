import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: []
})
export class PaginationComponent implements OnChanges, OnInit {
  @Input() totalItems: number = 100;
  @Input() itemsPerPage: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number = 0;
  pages: number[] = [];

  ngOnChanges() {
    this.calculatePages();
  }
  ngOnInit(): void {
    console.log("Total pages: " + this.totalPages)
    console.log("Total Items: " + this.totalItems);
    console.log("itemsPerPage: " + this.itemsPerPage);
    this.calculatePages();
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    console.log("Total pages: " + this.totalPages)
    console.log("Total Items: " + this.totalItems);
    console.log("itemsPerPage: " + this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }


  goToPage(page: number): void {

    if (page < 1 || page > this.totalPages) {
      return;
    }

    console.log("go to page", page)
    console.log("Total pages: " + this.totalPages)
    console.log("Total Items: " + this.totalItems);
    console.log("itemsPerPage: " + this.itemsPerPage);
    this.pageChange.emit(page);
  }
}
