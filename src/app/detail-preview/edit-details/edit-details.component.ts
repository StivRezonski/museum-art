import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {

  public editForm: FormGroup;
  public titleInternally: any;
  public urlInternally: any;
  public descriptionInternally: any;

  private isPreview = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router) {
    this.editForm = formBuilder.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      description: ['']
    })
  }

  get registerFormControl() {
    return this.editForm.controls;
  }


  ngOnInit(): void {
    this.fetchLocalStorageData();
    this.setupFormData();
  }

  private setupFormData() {
    this.editForm.patchValue({title: this.titleInternally});
    this.editForm.patchValue({url: this.urlInternally});
    this.editForm.patchValue({description: this.descriptionInternally});
  }

  private fetchLocalStorageData() {
    this.titleInternally = this.title;
    this.urlInternally = this.url;
    this.descriptionInternally = this.description;
  }

  saveEditedDetails() {
    const inputtedTitle = this.editForm.get('title')?.value;
    const inputtedUrl = this.editForm.get('url')?.value;
    const description = this.editForm.get('description')?.value;
    EditDetailsComponent.saveToLocalStorage(inputtedUrl, inputtedTitle, description);

    this.router.navigate(['/detail-preview']);
  }

  private static saveToLocalStorage(inputtedUrl: string, inputtedTitle: string, description: string) {
    localStorage.setItem('url-key', inputtedUrl);
    localStorage.setItem('art-title-key', inputtedTitle);
    localStorage.setItem('art-description-key', description);
  }

  previewEditedDetails(): void {
    this.isPreview = true;
  }

  /**
   * returns title
   */
  public get title() {
    if (this.isPreview) {
      return this.titleInternally;
    } else {
      return localStorage.getItem('art-title-key');
    }
  }

  /**
   * returns url
   */
  public get url() {
    if (this.isPreview) {
      return this.urlInternally;
    } else {
      return localStorage.getItem('url-key');
    }
  }

  /**
   * returns description
   */
  public get description() {
    if (this.isPreview) {
      return this.descriptionInternally;
    } else {
      return localStorage.getItem('art-description-key');
    }
  }
}
