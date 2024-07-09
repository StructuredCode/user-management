import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { AbsencesComponent } from './absences/absences.component';

export const routes: Routes = [
    {path: 'settings', component: SettingsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'absences', component: AbsencesComponent},
    {path: '', redirectTo:'/users', pathMatch: 'full'}
];
