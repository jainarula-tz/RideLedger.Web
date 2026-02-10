import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button.component';
import { PaymentApiService } from '../../services/payment-api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { PaymentRequest, PaymentMode } from '../../models/payment.model';
import { CustomValidators } from '../../../../shared/validators/custom-validators';
import { ComponentCanDeactivate } from '../../../../core/guards/unsaved-changes.guard';

@Component({
  selector: 'app-record-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './record-payment.component.html',
  styleUrls: ['./record-payment.component.scss'],
})
export class RecordPaymentComponent implements OnInit, ComponentCanDeactivate {
  paymentForm!: FormGroup;
  isSubmitting = false;
  private formSubmitted = false;
  paymentModes = [PaymentMode.Cash, PaymentMode.Card, PaymentMode.BankTransfer];

  constructor(
    private fb: FormBuilder,
    private paymentApiService: PaymentApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];

    this.paymentForm = this.fb.group({
      accountId: ['00000000-0000-0000-0000-000000000001', [Validators.required]], // Using test account from database
      paymentReferenceId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      amount: [
        null,
        [
          Validators.required,
          CustomValidators.positiveNumber(),
          CustomValidators.maxDecimals(2),
          Validators.max(999999.99),
        ],
      ],
      paymentDate: [today, [Validators.required, CustomValidators.notFutureDate()]],
      paymentMode: [PaymentMode.Card, [Validators.required]],
      notes: ['', [Validators.maxLength(500)]],
    });
  }

  canDeactivate(): boolean {
    // Allow navigation if form is pristine or already submitted
    if (this.paymentForm.pristine || this.formSubmitted) {
      return true;
    }
    return false; // This will trigger the confirmation dialog
  }

  getFieldError(fieldName: string): string {
    const control = this.paymentForm.get(fieldName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (control.errors['pattern']) {
      return 'Invalid format. Use only letters, numbers, and hyphens';
    }

    if (control.errors['positiveNumber']) {
      return 'Amount must be greater than 0';
    }

    if (control.errors['maxDecimals']) {
      return `Maximum ${control.errors['maxDecimals'].maxDecimals} decimal places allowed`;
    }

    if (control.errors['max']) {
      return 'Amount must be less than $999,999.99';
    }

    if (control.errors['notFutureDate']) {
      return 'Date cannot be in the future';
    }

    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    return '';
  }

  getPaymentModeLabel(mode: PaymentMode): string {
    const labels: Record<PaymentMode, string> = {
      [PaymentMode.Cash]: 'Cash',
      [PaymentMode.Card]: 'Credit/Debit Card',
      [PaymentMode.BankTransfer]: 'Bank Transfer',
    };
    return labels[mode];
  }

  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      this.notificationService.error('Please fix the form errors before submitting');
      return;
    }

    this.isSubmitting = true;
    const formValue = this.paymentForm.value;

    // Convert paymentDate to ISO format if needed
    const paymentDate =
      formValue.paymentDate instanceof Date
        ? formValue.paymentDate.toISOString()
        : new Date(formValue.paymentDate).toISOString();

    const request: PaymentRequest = {
      accountId: formValue.accountId,
      paymentReferenceId: formValue.paymentReferenceId,
      amount: parseFloat(formValue.amount),
      paymentDate: paymentDate,
      paymentMode: parseInt(formValue.paymentMode, 10),
      notes: formValue.notes || undefined,
    };

    this.paymentApiService.recordPayment(request).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.formSubmitted = true; // Mark as submitted to allow navigation
        this.notificationService.success(
          `Payment recorded successfully! Transaction ID: ${response.transactionId}`,
          'Success'
        );
        this.paymentForm.reset();
        this.initializeForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.notificationService.error('Failed to record payment. Please try again.', 'Error');
        console.error('Error recording payment:', error);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
