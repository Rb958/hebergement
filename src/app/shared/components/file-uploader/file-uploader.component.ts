import { map } from 'rxjs';
import { UploadService } from './../../services/services/upload.service';
import { UploaderInputDirective } from './uploader-input.directive';
import { Attribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostBinding, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { HttpEvent, HttpEventType, HttpUploadProgressEvent, HttpProgressEvent, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'rb-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploaderComponent implements OnInit {

  @HostBinding('class.loading')
  @HostBinding('attr.aria-disabled')
  loading = false;

  @Input('multipleFile')
  multipleFile = false;

  @Input('title')
  title: string = 'Import your file';

  @Output('onError')
  onError: EventEmitter<any> = new EventEmitter();
  @Output('onFinish')
  onFinish: EventEmitter<any> = new EventEmitter();

  @ContentChild(UploaderInputDirective)
  inputFile: UploaderInputDirective = {} as UploaderInputDirective;

  uploadMessage: string = '';
  uploadPercent: number = 0;
  uploadFinish: boolean = false;

  constructor(
    private uploadService: UploadService
  ) { }

  ngOnInit(): void {
  }

  loadFile(inputFile: HTMLInputElement) {
    inputFile.click();
  }


  loadStart($event: any) {
    this.loading = true;
    const uploadInput: HTMLInputElement = <HTMLInputElement>event?.target;

    if (uploadInput.files && uploadInput.files[0]) {
      let file: File = uploadInput.files[0];

      if (file.size > 2097152) {
        this.loading = false;
        this.uploadMessage = "Only file with size";
        this.onError.emit(this.uploadMessage);
        uploadInput.files = null;
      } else {
        this.uploadService.uploadFile(file).subscribe(event => this.processEvent(event))
      }
    }
  }

  processEvent(event: HttpEvent<any>) {
    const progress = document.getElementById("progress");
    switch (event.type) {
      case HttpEventType.Sent:
        this.uploadMessage = `Uploading file of size `;
        break;

      case HttpEventType.UploadProgress:
        this.uploadPercent = Math.round(100 * event.loaded / (event.total ?? 0));
        if (progress) {
          progress.style.strokeDashoffset = String(145 - (145 * this.uploadPercent) / 100);
        }
        break;
      case HttpEventType.Response:
        if (event.body.code == HttpStatusCode.Ok.valueOf()) {
          this.uploadFinish = true;
          this.onFinish.emit(event.body.result);
          this.uploadMessage = "Successfully Updated";
        }else{
          this.loading = false;
          this.onError.emit(event.body);
        }

        break;
      default:
        break;
    }
  }

}
