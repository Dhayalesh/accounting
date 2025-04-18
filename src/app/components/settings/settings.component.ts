import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add CommonModule and ReactiveFormsModule to imports
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  isSaved: boolean = false;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router // Inject the Router service
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')],
      existingPassword: [''],
      newPassword: ['', Validators.minLength(8)], // Increased minimum length to 8
      confirmNewPassword: ['']
    });
  }

  ngOnInit(): void {
    // You might have some initialization logic here
  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      // Process the form data
      this.isSaved = true;
      this.errors = {}; // Clear any previous errors
      console.log('Settings saved:', this.settingsForm.value);
      // Simulate saving process (replace with your actual save logic)
      setTimeout(() => {
        this.isSaved = false;
        // Redirect to the home page after successful save
        this.router.navigate(['/home']); // Adjust '/home' to your actual home route
      }, 2000); // Simulate a 2-second saving delay
    } else {
      // Mark all controls as touched to trigger validation messages
      Object.values(this.settingsForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errors = {}; // Optionally reset error messages before displaying new ones
      // Specific error handling
      if (this.settingsForm.get('newPassword')?.errors?.['minlength']) {
        this.errors['newPassword'] = 'Password must be at least 8 characters long.';
      }
      if (this.settingsForm.get('email')?.errors?.['email']) {
        this.errors['email'] = 'Please enter a valid email address.';
      }
      if (this.settingsForm.get('phone')?.errors?.['pattern']) {
        this.errors['phone'] = 'Please enter a valid 10-digit phone number.';
      }
      // Add password confirmation validation
      if (this.settingsForm.controls['newPassword'].value !== this.settingsForm.controls['confirmNewPassword'].value && this.settingsForm.controls['confirmNewPassword'].touched) {
        this.errors['confirmNewPassword'] = 'Passwords do not match.';
      }
    }
  }

  // You might have other methods here
}