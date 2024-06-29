import { Injectable } from '@angular/core';
import * as Papa from 'papaparse';

@Injectable({
  providedIn: 'root'
})
export class CsvService {
  private csvData: any[] = [];

  async uploadFile(file: File): Promise<boolean> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const { data, errors } = result;
          if(data.length>1){
            data.pop();
          }
          this.csvData = data.map(row => this.validateRow(row));
          resolve(true);
        },
        error: (error) => {
          console.error(error);
          reject(error);
        }
      });
    });
  }

  getCsvData(): Promise<any[]> {
    return Promise.resolve(this.csvData);
  }

  private validateRow(row: any): any {
    const errors = [];

    if (!row.Name || typeof row.Name !== 'string') {
      errors.push('Invalid or missing Name');
    }

    if (!row.Email || !this.isValidEmail(row.Email)) {
      errors.push('Invalid or missing Email');
    }

    if (!row['Phone number'] || !/^\d{10}$/.test(row['Phone number'])) {
      errors.push('Invalid or missing Phone number');
    }

    if (!row.City || typeof row.City !== 'string') {
      errors.push('Invalid or missing City');
    }

    if (!row.Address || typeof row.Address !== 'string') {
      errors.push('Invalid or missing Address');
    }

    if (!row.GPA || !this.isValidGPA(row.GPA)) {
      errors.push('Invalid or missing GPA');
    }

    if (errors.length > 0) {
      return { ...row, errors };
    }

    return row;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidGPA(gpa: string): boolean {
    const gpaNumber = parseFloat(gpa);
    return !isNaN(gpaNumber) && gpaNumber >= 0 && gpaNumber <= 10;
  }
}
