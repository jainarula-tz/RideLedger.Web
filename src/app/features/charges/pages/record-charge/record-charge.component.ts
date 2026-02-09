import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button.component';
import { InputComponent } from '../../../../shared/components/input.component';
import { ChargeApiService } from '../../services/charge-api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ChargeRequest } from '../../models/charge.model';

@Component({
  selector: 'app-record-charge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './record-charge.component.html',
  styleUrls: ['./record-charge.component.scss']
})
export class RecordChargeComponent implements OnInit {
  chargeForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private chargeApiService: ChargeApiService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    const today = new Date().toISOString().split('T')[0];
    
    this.chargeForm = this.fb.group({
      accountId: ['acc-001', [Validators.required]], // Mock account ID
      rideId: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
      fareAmount: [null, [Validators.required, Validators.min(0.01), Validators.max(999999.99)]],
      serviceDate: [today, [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]]
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.chargeForm.get(fieldName);
    
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }
    
    if (control.errors['pattern']) {
      return 'Invalid format. Use only letters, numbers, and hyphens';
    }
    
    if (control.errors['min']) {
      return 'Amount must be greater than 0';
    }
    
    if (control.errors['max']) {
      return 'Amount must be less than $999,999.99';
    }
    
    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required`;
    }
    
    if (control.errors['maxlength']) {
      return `Maximum ${control.errors['maxlength'].requiredLength} characters allowed`;
    }

    return '';
  }

  onSubmit(): void {
    if (this.chargeForm.invalid) {
      this.chargeForm.markAllAsTouched();
      this.notificationService.error('Please fix the form errors before submitting');
      return;
    }

    this.isSubmitting = true;
    const formValue = this.chargeForm.value;

    const request: ChargeRequest = {
      accountId: formValue.accountId,
      rideId: formValue.rideId,
      fareAmount: parseFloat(formValue.fareAmount),
      serviceDate: formValue.serviceDate,
      description: formValue.description
    };

    this.chargeApiService.recordCharge(request).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.notificationService.success(
          `Charge recorded successfully! Transaction ID: ${response.transactionId}`,
          'Success'
        );
        this.chargeForm.reset();
        this.initializeForm();
        // Optionally navigate back to dashboard
        // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.notificationService.error(
          'Failed to record charge. Please try again.',
          'Error'
        );
        console.error('Error recording charge:', error);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
