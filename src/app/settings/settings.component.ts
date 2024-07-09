import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  hide = signal(true);
  private fb = inject(FormBuilder);

  authForm: FormGroup = new FormGroup({
    clientId: new FormControl<string>('', [Validators.required]),
    clientSecret: new FormControl<string>('', [Validators.required])
  });

  onAuthSubmit() {
    if (this.authForm.valid) {
      console.error('Form submitted', this.authForm.value);
      throw new Error('Method not implemented: TODO');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
