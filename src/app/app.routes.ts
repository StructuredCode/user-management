import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import { AbsencesComponent } from './absences/absences.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path: 'settings', component: SettingsComponent},
    {path: 'users', component: UsersComponent, canActivate: [authGuard]},
    {path: 'absences', component: AbsencesComponent, canActivate: [authGuard]},
    {path: '', redirectTo:'/users', pathMatch: 'full'}
];
