import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { DocumentService, QualityImage } from 'src/app/shared/services/document.service';
import { SweetAlertService, AlertService } from 'dharma-ui-alert';
import { LoaderService, FileUploadComponent } from 'dharma-ui-components';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-selfie-upload',
  templateUrl: './selfie-upload.component.html',
  styleUrls: ['./selfie-upload.component.scss']
})
export class SelfieUploadComponent implements OnInit {

  @ViewChild(FileUploadComponent, { static: false }) fileUploadComponent: FileUploadComponent;

  @Output() submit: EventEmitter<any> = new EventEmitter();

  @Input() data: any = {};

  form: FormGroup;
  formSubmitted = false;
  isFileExceed = false;
  file: File;

  constructor(
    private userStorage: UserStorage,
    private documentService: DocumentService,
    private sweetAlertService: SweetAlertService,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  saveFile(file: File) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      fileType: file[0].type,
    };
    imageCompression(file[0], options).then((fileCompressed) => {
      const fileFinal: File = this.documentService.blobToFile(fileCompressed, file[0].name, file[0].fileType);

      const isSizeExceed = this.documentService.isFileExceedSize(fileFinal);
      this.isFileExceed = isSizeExceed;
      if (isSizeExceed === true) {
        this.alertService.danger('Sua imagem excede o limite de 1mb');
        this.fileUploadComponent.clearFiles();
        return;
      }
      this.file = fileFinal;
    }, (err) => {
      const isSizeExceed = this.documentService.isFileExceedSize(file[0]);
      this.isFileExceed = isSizeExceed;
      if (isSizeExceed === true) {
        this.alertService.danger('Sua imagem excede o limite de 1mb');
        this.fileUploadComponent.clearFiles();
        return;
      }
      this.file = file[0];
    });
  }

  removeFile() {
    this.file = null;
  }

  selfieSubmit() {
    const poorImageAlert = () => {
      this.sweetAlertService.show({
        icon: 'error',
        title: 'Sua selfie está com qualidade baixa',
        html: `
          <img src="assets/images/selfie.png" style="width: 150px">
          <div class="gray bold md-font access-account-text">Sua foto pode ter ficado escura. Vamos tentar de novo?</div>
          <div class="gray bold md-font access-account-text">Procure um local bem iluminado para suas informações ficarem legíveis :)</div>
          <div class="gray bold md-font access-account-text">Tire uma selfie e envie novamente</div>
        `
      });
    };


    const formData: FormData = new FormData();
    formData.append('file', this.file);
    this.loaderService.show();
    this.checkQualitySelfie(formData).subscribe((result: QualityImage) => {
      this.loaderService.hide();
      const isFailed = result.success === false;
      if (isFailed) { return; }
      const isPoorImage = result.data.poorImage;
      if (!isPoorImage) {
        this.documentService.saveImageID('selfie', 0, result.data.imageId);
        const imagesId = this.documentService.getImageID('selfie');
        this.submit.emit(imagesId[0]);
      } else {
        poorImageAlert();
        this.fileUploadComponent.clearFiles();
      }
    }, (err) => {
      this.loaderService.hide();
      poorImageAlert();
      this.fileUploadComponent.clearFiles();
    });
  }

  checkQualitySelfie(formData: FormData) {
    const document = this.userStorage.getDocument();
    return this.documentService.uploadSelfie(document, formData);
  }

}
