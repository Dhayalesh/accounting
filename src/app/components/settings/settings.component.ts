import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  isSaved: boolean = false;
  errors: { [key: string]: string } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router 
  ) {
    this.settingsForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.pattern('^[0-9]{10}$')],
      existingPassword: [''],
      newPassword: ['', Validators.minLength(8)], 
      confirmNewPassword: ['']
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.settingsForm.valid) {
      this.isSaved = true;
      this.errors = {}; 
      console.log('Settings saved:', this.settingsForm.value);
      setTimeout(() => {
        this.isSaved = false;
        this.router.navigate(['/home']); 
      }, 2000); 
    } else {
      Object.values(this.settingsForm.controls).forEach(control => {
        control.markAsTouched();
      });
      this.errors = {}; 
      if (this.settingsForm.get('newPassword')?.errors?.['minlength']) {
        this.errors['newPassword'] = 'Password must be at least 8 characters long.';
      }
      if (this.settingsForm.get('email')?.errors?.['email']) {
        this.errors['email'] = 'Please enter a valid email address.';
      }
      if (this.settingsForm.get('phone')?.errors?.['pattern']) {
        this.errors['phone'] = 'Please enter a valid 10-digit phone number.';
      }
      if (this.settingsForm.controls['newPassword'].value !== this.settingsForm.controls['confirmNewPassword'].value && this.settingsForm.controls['confirmNewPassword'].touched) {
        this.errors['confirmNewPassword'] = 'Passwords do not match.';
      }
    }
  }
}