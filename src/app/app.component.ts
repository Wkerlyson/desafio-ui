
import { Component } from '@angular/core';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Upload } from './utils/upload';
import { UploadService } from './services/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  file: File | null | undefined;

  upload$: Observable<Upload> = EMPTY;

  constructor(private uploads: UploadService) { }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
    }
  }

  onSubmit() {
    if (this.file) {
      this.upload$ = this.uploads
        .upload(this.file);
    }
  }
}