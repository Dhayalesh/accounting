import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface Product {
  name: string;
  description: string;
  rate: number;
  unit: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  products: Product[] = [
    { name: 'Accounting', description: 'Accounts management service', rate: 1500, unit: 'Hour' },
    { name: 'HR Management', description: 'Employment Management Service', rate: 50, unit: 'Piece' }
  ];

  showForm = false;

  newProduct: { name: string; description: string; rate: number | null; unit: string } = {
    name: '',
    description: '',
    rate: null,
    unit: ''
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addProduct() {
    if (this.newProduct.name && this.newProduct.rate !== null && this.newProduct.unit) {
      const product: Product = {
        name: this.newProduct.name,
        description: this.newProduct.description,
        rate: this.newProduct.rate,
        unit: this.newProduct.unit
      };
      this.products.push(product);
      this.newProduct = { name: '', description: '', rate: null, unit: '' };
      this.showForm = false;
    }
  }
}
