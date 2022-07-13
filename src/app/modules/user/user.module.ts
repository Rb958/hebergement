import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NewUserComponent } from './dialog/new-user/new-user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { DeleteUserComponent } from './dialog/delete-user/delete-user.component';
import { EnableUserComponent } from './dialog/enable-user/enable-user.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NewUserComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteUserComponent,
    EnableUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class UserModule { }
