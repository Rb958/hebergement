import { ButtonLoaderModule } from './../../shared/components/button-loader/button-loader.module';
import { FileUploaderModule } from './../../shared/components/file-uploader/file-uploader.module';
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
import { UserProfileComponent } from './dialog/user-profile/user-profile.component';
import { ClientComponent } from './client/client.component';
import { InitPassComponent } from './dialog/init-pass/init-pass.component';


@NgModule({
  declarations: [
    NewUserComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteUserComponent,
    EnableUserComponent,
    UserProfileComponent,
    ClientComponent,
    InitPassComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TranslateModule,
    FileUploaderModule,
    ButtonLoaderModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class UserModule { }
