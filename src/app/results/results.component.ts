import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CsvService } from '../services/csv.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  csvData: any[] = [];
  correctRows: number = 0;
  incorrectRows: number = 0;

  constructor(protected router: Router, private csvService: CsvService) { }

  ngOnInit() {
    this.csvService.getCsvData().then(data => {
      this.csvData = data;
      this.calculateResults();
    }).catch(error => {
      console.error(error);
      this.router.navigate(['/upload']);
    });
  }

  calculateResults() {
    this.correctRows = this.csvData.filter(row => !row.errors).length;
    this.incorrectRows = this.csvData.length - this.correctRows;
  }


}
