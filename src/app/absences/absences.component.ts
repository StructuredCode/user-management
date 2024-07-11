import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AbsenceService } from '../services/absence.service';
import { UserService } from '../users/user.service';
import { UserAbsence } from '../models/user-absence';
import { forkJoin, map, merge } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-absences',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule],
  providers: [MatDatepickerModule],
  templateUrl: './absences.component.html',
  styleUrl: './absences.component.scss'
})
export class AbsencesComponent implements OnInit {
  http = inject(HttpClient);
  fb = inject(FormBuilder);
  absenceService = inject(AbsenceService);
  usersService = inject(UserService);

  dateForm: FormGroup = this.fb.group({});
  dataSource: UserAbsence[] = [];
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'AbsenceDefinitionName', 'Timestamp'];

  ngOnInit(): void {
    this.dateForm = this.fb.group({
      dateFrom: ['', [Validators.required]]
    })
  }

  onSubmit() {
    ///// Don't do this in production :) just for demonstration purpose! /////
    forkJoin({
      // Execute both HTTP requests simultaneously
      absences: this.absenceService.getAbsence(this.dateForm.value.dateFrom),
      users: this.usersService.getUsers()
    }).pipe(
      // After both requests complete, process the results
      map(res => {
        const absences = res.absences;
        const users = res.users;

        // Merge absences with coresponding user
        return absences.map(a => {
          const user = users.find(u => u.Id === a.UserId);
          return <UserAbsence>{ ...a, ...user };
        })
      })
    ).subscribe(userAbsence => {
      this.dataSource = userAbsence;
    })
    /////////////////////////////////////////////////////////////
  }
}
