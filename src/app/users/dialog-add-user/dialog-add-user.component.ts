import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../user.service';
import { User } from '../../models/user';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: '../share/dialog.component.scss'
})
export class DialogAddUserComponent implements OnInit {
  fb = inject(FormBuilder);
  userService = inject(UserService);
  toastService = inject(ToastService);

  userForm: FormGroup = this.fb.group({});

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit() {
    if (this.userForm.valid) {
      const user:User = this.userForm.value
      
      // If user sucesfully added, push him to the subject. 
      // Can be used as event emmiter.
      this.userService.addUser(user).subscribe({
        next: user => {
          if(user) {
            this.userService.userAddedSubject.next(user);
            this.toastService.showSuccess('User added successfully.');
            this.userForm.reset();
          }
        } 
      });
    }
  }

}
