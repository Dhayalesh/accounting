import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {
  invoices = [
    { id: 1, description: 'Website Design', amount: 50000, invoiceNumber: 'INV-2024-001', imageUrl: '' },
    { id: 2, description: 'Monthly Subscription', amount: 10000, invoiceNumber: 'SUB-NOV-24-12', imageUrl: '' }
  ];

  showForm = false;
  editingInvoiceId: number | null = null;

  formData = {
    description: '',
    amount: '',
    invoiceNumber: '',
    image: null,
    imageUrl: '' 
  };

  toggleForm() {
    this.showForm = !this.showForm;
    this.editingInvoiceId = null;
    this.formData = { description: '', amount: '', invoiceNumber: '', image: null, imageUrl: '' };
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.formData.image = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.formData.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  handleAddOrUpdateInvoice() {
    if (!this.formData.description || !this.formData.amount || !this.formData.invoiceNumber) return;

    const amount = parseFloat(this.formData.amount as any);

    if (this.editingInvoiceId) {
      this.invoices = this.invoices.map(inv =>
        inv.id === this.editingInvoiceId
          ? { ...inv, description: this.formData.description, amount, invoiceNumber: this.formData.invoiceNumber, imageUrl: this.formData.imageUrl }
          : inv
      );
    } else {
      const newId = this.invoices.length ? Math.max(...this.invoices.map(i => i.id)) + 1 : 1;
      this.invoices.push({
        id: newId,
        description: this.formData.description,
        amount,
        invoiceNumber: this.formData.invoiceNumber,
        imageUrl: this.formData.imageUrl
      });
    }

    this.toggleForm();
  }

  handleEdit(invoice: any) {
    this.formData = {
      description: invoice.description,
      amount: invoice.amount.toString(),
      invoiceNumber: invoice.invoiceNumber,
      image: null,
      imageUrl: invoice.imageUrl || ''
    };
    this.editingInvoiceId = invoice.id;
    this.showForm = true;
  }
}