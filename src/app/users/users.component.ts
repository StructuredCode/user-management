import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from './user.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs'
import { DialogAddAbsenceComponent } from './dialog-add-abscense/dialog-add-absence.component';
import { ComponentType } from '@angular/cdk/portal';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, OnDestroy {
  userService = inject(UserService);
  dialog = inject(MatDialog);
  toastService = inject(ToastService);

  subscriptions = new Subscription();
  dialogComponent = {DialogAddUserComponent}
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'Action'];

  ngOnInit(): void {
    // Get users from server.
    this.userService.getUsers().subscribe(u => {
      this.dataSource = new MatTableDataSource(u);
      this.userService.users.set(u);
    });

    // Get newlly added user and push him to the table so fetch from the server can be avoided.
    this.subscriptions.add(
      this.userService.userAddedSubject.subscribe(newUser => {
        this.dataSource.data.push(newUser);
        this.toastService.showSuccess('User added successfully.');
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Opens type of dialog based on provided parameter.
   */
  openDialog(element?: any) {
    const comopnentType = element ? DialogAddAbsenceComponent : DialogAddUserComponent;
    const dialogRef = this.dialog.open(comopnentType as ComponentType<any>);
    dialogRef.componentInstance.user = element;
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks.
    this.subscriptions.unsubscribe()
  }
}
