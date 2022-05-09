import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public imgUrl = '';
  public artTitle = '';
  public description = '';

  constructor() { }

  ngOnInit(): void {
    localStorage.clear();
  }

  getDataForDetailPreview($event: any){
    this.imgUrl = $event.url;
    this.artTitle = $event.name;
    this.description = $event.description;
  }

}
