import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient

  ) { }

  getUser(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(githubUsername: string, page: number, limit: number) {
    return this.httpClient.get(`https://fyle-frontend-development-challenge.onrender.com/api/repos/?username=${githubUsername}&page=${page}&limit=${limit}`);
  }
  getAllReposLength(githubUsername: string) {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos`);
  }


  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
