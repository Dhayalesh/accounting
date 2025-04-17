import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  filter: 'monthly' | 'yearly' = 'monthly';
  selectedMonth: string = '';
  selectedYear: string = '';

  monthlyData = [
    { month: 'Jan', revenue: 50000, expenses: 30000, profit: 20000 },
    { month: 'Feb', revenue: 60000, expenses: 35000, profit: 25000 },
    { month: 'Mar', revenue: 70000, expenses: 40000, profit: 30000 },
    { month: 'Apr', revenue: 80000, expenses: 45000, profit: 35000 },
    { month: 'May', revenue: 75000, expenses: 42000, profit: 33000 },
    { month: 'Jun', revenue: 82000, expenses: 46000, profit: 36000 }
  ];

  yearlyData = [
    { year: '2021', revenue: 600000, expenses: 350000, profit: 250000 },
    { year: '2022', revenue: 750000, expenses: 400000, profit: 350000 },
    { year: '2023', revenue: 850000, expenses: 450000, profit: 400000 }
  ];

  get filteredData() {
    if (this.filter === 'monthly') {
      return this.monthlyData.filter(d =>
        !this.selectedMonth || d.month === this.selectedMonth
      );
    } else {
      return this.yearlyData.filter(d =>
        !this.selectedYear || d.year === this.selectedYear
      );
    }
  }
  

  get chartLabels(): string[] {
    return this.filteredData.map(d =>
      this.filter === 'monthly' && 'month' in d ? d.month :
      this.filter === 'yearly' && 'year' in d ? d.year : ''
    );
  }
  

  get chartData(): ChartDataset[] {
    return [
      {
        label: 'Revenue',
        data: this.filteredData.map(d => d.revenue),
        borderColor: '#003dd6',
        fill: false
      },
      {
        label: 'Expenses',
        data: this.filteredData.map(d => d.expenses),
        borderColor: '#c62828',
        fill: false
      },
      {
        label: 'Profit',
        data: this.filteredData.map(d => d.profit),
        borderColor: '#2e7d32',
        fill: false
      }
    ];
  }

  changeFilter(type: 'monthly' | 'yearly') {
    this.filter = type;
    this.selectedMonth = '';
    this.selectedYear = '';
  }
}
