import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvService } from '../services/csv.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  csvData: any[] = [];
  errorMessages: string[] = [];

  constructor(private router: Router, private csvService: CsvService) { }

  ngOnInit() {
    this.csvService.getCsvData().then(data => {
      this.csvData = data;
      this.extractErrors();
    }).catch(error => {
      console.error(error);
      this.router.navigate(['/upload']);
    });
  }

  extractErrors() {
    this.errorMessages = [];
    this.csvData.forEach(row => {
      if (row.errors) {
        this.errorMessages.push(JSON.stringify(row.errors));
      }
    });
  }

  nextPage() {
    this.router.navigate(['/results']);
  }
}
