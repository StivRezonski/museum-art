import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-preview',
  templateUrl: './detail-preview.component.html',
  styleUrls: ['./detail-preview.component.scss']
})
export class DetailPreviewComponent implements OnInit {

  @Input() imageUrl: string | null = '';
  @Input() artSelected: string | null = '';
  @Input() artDescription: string | null = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.imageUrl = localStorage.getItem('url-key');
      this.artSelected = localStorage.getItem('art-title-key');
      this.artDescription = localStorage.getItem('art-description-key');

  }

  editSelectedArt() {
    localStorage.setItem('url-key', this.isNull(this.imageUrl));
    localStorage.setItem('art-title-key', this.isNull(this.artSelected));
    localStorage.setItem('art-description-key', this.isNull(this.artDescription));
    this.router.navigate(['/edit-details']);
  }

  isNull(prop: string | null) {
    return prop ? prop : '';
  }
}
