import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Vendor {
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-vendors',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent {
  vendors: Vendor[] = [
    { name: 'Alpha Traders', contact: 'John Doe', email: 'alpha@example.com', phone: '9876543210', status: 'Active' },
    { name: 'Beta Supplies', contact: 'Jane Smith', email: 'beta@example.com', phone: '9876543211', status: 'Inactive' }
  ];

  showForm = false;

  newVendor: Vendor = {
    name: '',
    contact: '',
    email: '',
    phone: '',
    status: 'Active'
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addVendor() {
    if (this.newVendor.name && this.newVendor.contact && this.newVendor.email && this.newVendor.phone) {
      this.vendors.push({ ...this.newVendor });
      this.newVendor = { name: '', contact: '', email: '', phone: '', status: 'Active' };
      this.showForm = false;
    }
  }
}
