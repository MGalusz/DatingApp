import { ListsComponent } from './lists/lists.component';
import { HomeComponent } from './home/home.component';
import {Routes} from '@angular/router'
import { MemberListComponent } from './member-list/member-list.component';
import { AuthGuard } from './_guards/auth.guard';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'members', component: MemberListComponent},
            {path: 'messages', component: MemberListComponent},
            {path: 'lists', component: ListsComponent},
        ]
    },

    { path: '**', redirectTo: 'home', pathMatch: 'full'},
];
