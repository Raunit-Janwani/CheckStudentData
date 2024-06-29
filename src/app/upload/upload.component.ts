import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {
  isFileValid = false;
  showModal = false;
  errorMessage: string = '';

  constructor(private router: Router, private csvService: CsvService) { }

   onFileChange(event: any) {
    const file = event.target.files[0];
    this.errorMessage = '';
    this.isFileValid = false;

    if (file) {
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (fileExtension !== 'csv') {
        this.errorMessage = 'Invalid file format. Please upload a CSV file';
        return;
      }

      this.csvService.uploadFile(file).then(isValid => {
        this.isFileValid = isValid; 
        if (isValid) {
          this.showModal = true;
        } else {
          this.errorMessage = 'Invalid CSV content. Please upload a valid CSV file.';
        }
      }).catch(() => {
        this.errorMessage = 'File upload failed. Please try again.';
        this.isFileValid = false;
      });
    } else {
      this.errorMessage = 'No file selected. Please upload a file.';
    }
  }

  closeModal() {
    this.showModal = false;
  }

  nextPage() {
    if (this.isFileValid) {
      this.router.navigate(['/preview']);
    }
  }
}
