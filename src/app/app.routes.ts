import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Go to login by default
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./components/login/register.component').then(m => m.RegisterComponent) },
  { path: 'home', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
  { path: 'reports', loadComponent: () => import('./components/reports/reports.component').then(m => m.ReportsComponent) },
  { path: 'expenses', loadComponent: () => import('./components/expenses/expenses.component').then(m => m.ExpensesComponent) },
  { path: 'invoices', loadComponent: () => import('./components/invoices/invoices.component').then(m => m.InvoicesComponent) },
  { path: 'settings', loadComponent: () => import('./components/settings/settings.component').then(m => m.SettingsComponent) }
];
