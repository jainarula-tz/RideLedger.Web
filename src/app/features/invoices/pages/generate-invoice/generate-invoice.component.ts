import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceApiService } from '../../services/invoice-api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { GenerateInvoiceRequest, BillingFrequency } from '../../models/invoice.model';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { ComponentCanDeactivate } from '../../../../core/guards/unsaved-changes.guard';

@Component({
  selector: 'app-generate-invoice',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './generate-invoice.component.html',
  styleUrls: ['./generate-invoice.component.scss'],
})
export class GenerateInvoiceComponent implements OnInit, ComponentCanDeactivate {
  generateForm!: FormGroup;
  isSubmitting = false;
  private formSubmitted = false;
  today = new Date().toISOString().split('T')[0];
  billingFrequencies = [
    BillingFrequency.PerRide,
    BillingFrequency.Daily,
    BillingFrequency.Weekly,
    BillingFrequency.Monthly,
  ];
  BillingFrequency = BillingFrequency;

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
      accountId: ['00000000-0000-0000-0000-000000000001', [Validators.required]], // Using test account from database
      billingPeriodStart: ['', [Validators.required, CustomValidators.notFutureDate()]],
      billingPeriodEnd: ['', [Validators.required, CustomValidators.notFutureDate()]],
      billingFrequency: [BillingFrequency.Monthly, [Validators.required]],
    });
  }

  canDeactivate(): boolean {
    // Allow navigation if form is pristine or already submitted
    if (this.generateForm.pristine || this.formSubmitted) {
      return true;
    }
    return false; // This will trigger the confirmation dialog
  }

  onSubmit(): void {
    if (this.generateForm.invalid) {
      Object.keys(this.generateForm.controls).forEach((key) => {
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

    // Convert dates to ISO format
    const startDate = new Date(this.generateForm.value.billingPeriodStart).toISOString();
    const endDate = new Date(this.generateForm.value.billingPeriodEnd).toISOString();

    const request: GenerateInvoiceRequest = {
      accountId: this.generateForm.value.accountId,
      billingPeriodStart: startDate,
      billingPeriodEnd: endDate,
      billingFrequency: parseInt(this.generateForm.value.billingFrequency, 10),
    };

    this.invoiceApiService.generateInvoice(request).subscribe({
      next: (invoice) => {
        this.formSubmitted = true; // Mark as submitted to allow navigation
        this.notificationService.success(`Invoice ${invoice.invoiceNumber} generated successfully`);
        this.isSubmitting = false;
        this.generateForm.reset();
        this.router.navigate(['/invoices']);
      },
      error: (error) => {
        console.error('Error generating invoice:', error);
        this.notificationService.error('Failed to generate invoice. Please try again.');
        this.isSubmitting = false;
      },
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
      billingPeriodEnd: 'End date',
      billingFrequency: 'Billing frequency',
    };
    return labels[fieldName] || fieldName;
  }

  getBillingFrequencyLabel(frequency: BillingFrequency): string {
    const labels = {
      [BillingFrequency.PerRide]: 'Per Ride',
      [BillingFrequency.Daily]: 'Daily',
      [BillingFrequency.Weekly]: 'Weekly',
      [BillingFrequency.Monthly]: 'Monthly',
    };
    return labels[frequency];
  }
}
