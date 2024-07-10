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

  private userList: User[] = [];
  subscriptions = new Subscription();
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'Action'];

  ngOnInit(): void {
    // Get users from server.
    this.userService.getUsers().subscribe(u => {
      this.dataSource = new MatTableDataSource(u);
      this.userList = u;
    });

    // Get newlly added user and push him to the table so fetch from the server can be avoided.
    this.subscriptions.add(
      this.userService.userAddedSubject.subscribe(newUser => {
        this.dataSource.data.push(newUser);
      })
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(DialogAddUserComponent);
  }

  openAbscenceDialog(element: any) {

  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks.
    this.subscriptions.unsubscribe()
  }
}
