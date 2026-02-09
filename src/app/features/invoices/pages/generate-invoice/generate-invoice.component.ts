import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { GenerateInvoiceRequest } from '../../models/invoice.model';

@Component({
  selector: 'app-generate-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss']
})
export class GenerateInvoiceComponent implements OnInit {
  generateForm!: FormGroup;
  isSubmitting = false;
  today = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private invoiceApiService: InvoiceApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.generateForm = this.fb.group({
      accountId: ['acc-001', [Validators.required]],
      billingPeriodStart: ['', [Validators.required]],
      billingPeriodEnd: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.generateForm.invalid) {
      Object.keys(this.generateForm.controls).forEach(key => {
        this.generateForm.get(key)?.markAsTouched();
      });
      return;
    }

    const startDate = new Date(this.generateForm.value.billingPeriodStart);
    const endDate = new Date(this.generateForm.value.billingPeriodEnd);

    if (startDate > endDate) {
      this.notificationService.error('End date must be after start date');
      return;
    }

    this.isSubmitting = true;

    const request: GenerateInvoiceRequest = {
      accountId: this.generateForm.value.accountId,
      billingPeriodStart: this.generateForm.value.billingPeriodStart,
      billingPeriodEnd: this.generateForm.value.billingPeriodEnd
    };

    this.invoiceApiService.generateInvoice(request).subscribe({
      next: (invoice) => {
        this.notificationService.success(`Invoice ${invoice.invoiceNumber} generated successfully`);
        this.isSubmitting = false;
        this.generateForm.reset();
        this.router.navigate(['/invoices']);
      },
      error: (error) => {
        console.error('Error generating invoice:', error);
        this.notificationService.error('Failed to generate invoice. Please try again.');
        this.isSubmitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/invoices']);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.generateForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.generateForm.get(fieldName);
    if (!field || !field.errors || !field.touched) {
      return '';
    }

    if (field.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }

    return '';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      accountId: 'Account',
      billingPeriodStart: 'Start date',
      billingPeriodEnd: 'End date'
    };
    return labels[fieldName] || fieldName;
  }
}
