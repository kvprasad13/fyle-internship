import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  searchQuery: string = 'johnpapa';
  user: any = {};
  paginatedRepos: any = {};
  page: number = 1;
  limit: number = 10;

  selectedCity: any;
  repositories: [] = [];


  totalItems = Number(this.user.public_repos || '0'); // Total number of items
  itemsPerPage = this.limit; // Number of items per page
  currentPage = this.page; // Current page

  isLoading: boolean = false;
  onPageChange(page: number): void {
    this.currentPage = page;
    this.page = page;
    this.changePage(this.currentPage);
    // Handle page change, e.g., fetch new data
  }
  constructor(private apiService: ApiService) {

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchUserDetails();
    this.fetchRepositories();
    this.isLoading = false;
  }
  changePage(page: number): void {
    this.isLoading = true;
    this.page = page;
    console.log("change to page " + this.page);
    this.fetchRepositories()
    this.isLoading = false;

  }
  onLimitSubmit(limit: number): void {
    this.isLoading = true;
    this.limit = limit;
    this.itemsPerPage = limit;
    this.fetchRepositories();
    this.isLoading = false;


  }
  getAllReposLength(): void {
    this.apiService.getAllReposLength(this.searchQuery).subscribe(data => {
      const resData: any = data;
      console.log("res data",resData);
      this.totalItems = resData.length;
    });
  }
  fetchUserDetails(): void {
    if (!localStorage.getItem(this.searchQuery))
      this.apiService.getUser(this.searchQuery).subscribe(data => {
        console.log(data);
        this.user = data;
        this.getAllReposLength();
        localStorage.setItem(this.searchQuery, JSON.stringify(data));
      });
    else {
      this.user = JSON.parse(localStorage.getItem(this.searchQuery) || '{}');
      this.getAllReposLength();
    }

  }
  fetchRepositories(): void {


    if (!localStorage.getItem(this.searchQuery + this.page + this.limit))
      this.apiService.getRepos(this.searchQuery, this.page, this.limit).subscribe(data => {
        console.log(data);
        const results: any = data;
        this.repositories = results.results;
        localStorage.setItem(this.searchQuery + this.page + '' + this.limit, JSON.stringify(data));

      });
    else {


      const results = JSON.parse(localStorage.getItem(this.searchQuery + this.page + "" + this.limit) || '{}');
      this.repositories = results.results;
    }
  }



  onSearch(): void {
    this.isLoading = true;
    console.log('Search query:', this.searchQuery);
    this.fetchUserDetails();
    this.fetchRepositories();
    this.isLoading = false;
  }

}
