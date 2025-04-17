import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) {}

  financeSummary = [
    { label: 'Total Revenue', value: '₹5,40,000', icon: 'bar_chart', color: '#003dd6' },
    { label: 'Total Expenses', value: '₹2,80,000', icon: 'account_balance_wallet', color: '#c62828' },
    { label: 'Net Profit', value: '₹2,60,000', icon: 'description', color: '#2e7d32' }
  ];

  modules = [
    { name: 'Invoices', icon: 'description' },
    { name: 'Expense', icon: 'account_balance_wallet' },
    { name: 'Reports', icon: 'bar_chart' },
    { name: 'Settings', icon: 'settings' }
  ];

  navigateTo(name: string) {
    if (name === 'Reports') this.router.navigate(['/reports']);
  else if (name === 'Expense') this.router.navigate(['/expenses']);
  else if (name === 'Invoices') this.router.navigate(['/invoices']);
  else if (name === 'Settings') this.router.navigate(['/settings']);
  }
  
}

