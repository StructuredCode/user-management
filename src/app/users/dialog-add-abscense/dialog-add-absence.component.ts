import { Component, Input, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AbsenceService } from '../../services/absence.service';
import { Absence } from '../../models/absence';
import { MatSelectModule } from '@angular/material/select';
import { AbsenceDefinition } from '../../models/absence-definition';
import { User } from '../../models/user';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dialog-add-absence',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatDialogModule, MatSelectModule],
  templateUrl: './dialog-add-absence.component.html',
  styleUrl: '../share/dialog.component.scss'
})
export class DialogAddAbsenceComponent {
  @Input({ required: true }) user: User = {} as User;

  fb = inject(FormBuilder);
  absenceService = inject(AbsenceService);
  toastService = inject(ToastService);

  absenceForm: FormGroup = this.fb.group({});
  definitions: AbsenceDefinition[] = [];
  now = new Date().toISOString().substring(0, 16);

  ngOnInit(): void {
    this.absenceForm = this.fb.group({
      userId: [this.user.Id],
      absenceDefinitionId: ['', [Validators.required]],
      timeStamp: [this.now, [Validators.required]],
      partialTimeFrom: [this.now],
      partialTimeTo: [this.now]
    })

    this.absenceService.getAbsenceDefinitions().subscribe({
      next: res => { this.definitions = res; console.log(res) }
    });
  }

  onSubmit() {
    if (this.absenceForm.valid) {
      let absence: Absence = { ...this.absenceForm.value };
      this.absenceService.addAbsence(absence).subscribe({
        next: res => {
          this.toastService.showSuccess('Absence added successfully.');
          this.absenceForm.reset();
        }
      });
    }
  }

}
