import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface Service {
  name: string;
  description: string;
  rate: number;
  unit: string;
}

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  products: Service[] = [
    { name: 'Consulting Service', description: 'Business consulting hourly rate', rate: 1500, unit: 'Hour' },
    { name: 'Devops Service', description: 'Company', rate: 50, unit: 'Hour' }
  ];

  showForm = false;

  newService: { name: string; description: string; rate: number | null; unit: string } = {
    name: '',
    description: '',
    rate: null,
    unit: ''
  };

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addService() {
    if (this.newService.name && this.newService.rate !== null && this.newService.unit) {
      const service: Service = {
        name: this.newService.name,
        description: this.newService.description,
        rate: this.newService.rate,
        unit: this.newService.unit
      };
      this.products.push(service);
      this.newService = { name: '', description: '', rate: null, unit: '' };
      this.showForm = false;
    }
  }
}
