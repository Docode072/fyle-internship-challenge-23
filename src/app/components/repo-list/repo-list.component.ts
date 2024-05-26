import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnChanges {
  @Input() repos: any[] = [];
  @Input() totalCount: number = 0;
  @Output() pageChange = new EventEmitter<{ page: number, perPage: number }>();

  page: number = 1;
  perPage: number = 10;
  totalPages: number = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalCount']) {
      this.totalPages = Math.ceil(this.totalCount / this.perPage);
    }
  }

  changePageSize(event: Event) {
    this.perPage = +(event.target as HTMLSelectElement).value;
    this.page = 1;
    this.emitPageChange();
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.emitPageChange();
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.emitPageChange();
    }
  }

  emitPageChange() {
    this.pageChange.emit({ page: this.page, perPage: this.perPage });
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.emitPageChange();
  }
  
}
