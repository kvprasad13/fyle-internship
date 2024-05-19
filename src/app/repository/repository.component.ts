import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: []
})
export class RepositoryComponent {
  @Input() repo: any = {};
  @Input() isLoading:boolean=false;


}
