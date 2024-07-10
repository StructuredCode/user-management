import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../models/user';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from './user.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  userService = inject(UserService);

  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['Id', 'FirstName', 'LastName', 'Email', 'Action'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngOnInit(): void {
    this.userService.getUsers().subscribe(u => this.dataSource = new MatTableDataSource(u));
  }

  ngAfterViewInit() {
    if (this.paginator)
      this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
