import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../auth/auth.service';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatSlideToggle],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  hide = signal(true);
  useProxy = signal(true);
  private auth = inject(AuthService);

  authForm: FormGroup = new FormGroup({
    clientId: new FormControl<string>('', [Validators.required]),
    clientSecret: new FormControl<string>('', [Validators.required])
  });

  onAuthSubmit() {
    if (this.authForm.valid) {
      const formVal = this.authForm.value;
      
      // Requests a token from the server and saves it to local storage.
      this.auth.handleTokenRequest(formVal.clientId, formVal.clientSecret, this.useProxy());
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
