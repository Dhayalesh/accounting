import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  expenses = [
    { id: 1, description: 'Office Rent', amount: 15000, billNumber: 'BR2023-10-001', imageUrl: '' },
    { id: 2, description: 'Snacks', amount: 2000, billNumber: 'SN-NOV-23-05', imageUrl: '' }
  ];

  showForm = false;
  editingExpenseId: number | null = null;

  formData = {
    description: '',
    amount: '',
    billNumber: '',
    image: null,
    imageUrl: '' // To display the image if it exists
  };

  toggleForm() {
    this.showForm = !this.showForm;
    this.editingExpenseId = null;
    this.formData = { description: '', amount: '', billNumber: '', image: null, imageUrl: '' };
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.image = file;
      // You might want to implement a service to upload this to a server
      // For this example, we'll just store a local URL for display
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleAddOrUpdateExpense() {
    if (!this.formData.description || !this.formData.amount || !this.formData.billNumber) return;

    const amount = parseFloat(this.formData.amount as any);

    if (this.editingExpenseId) {
      this.expenses = this.expenses.map(exp =>
        exp.id === this.editingExpenseId
          ? { ...exp, description: this.formData.description, amount, billNumber: this.formData.billNumber, imageUrl: this.formData.imageUrl }
          : exp
      );
    } else {
      const newId = this.expenses.length ? Math.max(...this.expenses.map(e => e.id)) + 1 : 1;
      this.expenses.push({
        id: newId,
        description: this.formData.description,
        amount,
        billNumber: this.formData.billNumber,
        imageUrl: this.formData.imageUrl
      });
    }

    this.toggleForm();
  }

  handleEdit(expense: any) {
    this.formData = {
      description: expense.description,
      amount: expense.amount.toString(),
      billNumber: expense.billNumber,
      image: null,
      imageUrl: expense.imageUrl || ''
    };
    this.editingExpenseId = expense.id;
    this.showForm = true;
  }
}