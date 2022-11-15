import { ClientComponent } from './client/client.component';
import { UserProfileComponent } from './dialog/user-profile/user-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: UserListComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'client',
    component: ClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
