import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-parameter',
  templateUrl: './edit-parameter.component.html',
  styleUrls: ['./edit-parameter.component.scss']
})
export class EditParameterComponent implements OnInit {
  paramaterForm: UntypedFormGroup;

  constructor(
    private matDialogRef: MatDialogRef<EditParameterComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: UntypedFormBuilder
  ) {
    this.paramaterForm = {} as  UntypedFormGroup;
  }

  ngOnInit(): void {
    if (!this.data.edition){
      this.paramaterForm = this.fb.group({
        name: ['', Validators.required],
        key: ['', Validators.required],
        value: ['', Validators.required],
        description: [''],
      })
    }
  }

}
