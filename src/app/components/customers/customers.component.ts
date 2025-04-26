import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

interface Customer {
  name: string;
  contact: string;
  email: string;
  phone: string;
  status: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: Customer[] = [
    { name: 'Galaxy Corp', contact: 'Anita Roy', email: 'galaxy@example.com', phone: '9001234567', status: 'Active' },
    { name: 'Star Industries', contact: 'Ravi Kumar', email: 'star@example.com', phone: '9007654321', status: 'Pending' }
  ];

  showForm = false;

  newCustomer: Customer = {
    name: '',
    contact: '',
    email: '',
    phone: '',
    status: 'Active'
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addCustomer() {
    if (this.newCustomer.name && this.newCustomer.contact && this.newCustomer.email && this.newCustomer.phone) {
      this.customers.push({ ...this.newCustomer });
      this.newCustomer = { name: '', contact: '', email: '', phone: '', status: 'Active' };
      this.showForm = false;
    }
  }
}
