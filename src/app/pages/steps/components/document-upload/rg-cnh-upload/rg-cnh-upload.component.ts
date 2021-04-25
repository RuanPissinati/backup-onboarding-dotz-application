import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserStorage } from 'src/app/shared/services/user.storage';
import { DocumentService, QualityImage } from 'src/app/shared/services/document.service';
import { SweetAlertService, AlertService } from 'dharma-ui-alert';
import { LoaderService, FileUploadComponent } from 'dharma-ui-components';
import { formEvents } from 'dharma-ui-common';
import imageCompression from 'browser-image-compression';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rg-cnh-upload',
  templateUrl: './rg-cnh-upload.component.html',
  styleUrls: ['./rg-cnh-upload.component.scss']
})
export class RgCnhUploadComponent implements OnInit {

  question = {
    query: 'Que tipo de documento você irá enviar?',
    index: 1,
    answer: [
      'RG',
      'CNH',
      'RNE',
    ]
  }

  @ViewChild(FileUploadComponent, { static: false }) fileUploadComponent: FileUploadComponent;

  @Output() submit: EventEmitter<any> = new EventEmitter();

  @Input() data: any = {};
  @Input() type: string = 'RG | CNH';

  form: FormGroup;
  formSubmitted: boolean = false;
  file: File;

  style = { 'width': '500px' };
  rgImagesId = [];
  rgFiles: any = [];
  cnhFile: File;
  isFileExceed: boolean = false;
  showQuestions: boolean = true
  imageUploaded: boolean = false;

  constructor(
    private userStorage: UserStorage,
    private documentService: DocumentService,
    private sweetAlertService: SweetAlertService,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    formEvents.init(this);
  }

  saveFile(file: File, position?: number) {
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
      if (this.type === 'RG' || this.type === 'RNE') {
        this.rgFiles[position] = fileFinal;
      } else if (this.type === 'CNH') {
        this.cnhFile = fileFinal;
      }
    }, (err) => {
      const isSizeExceed = this.documentService.isFileExceedSize(file[0]);
      this.isFileExceed = isSizeExceed;
      if (isSizeExceed === true) {
        this.alertService.danger('Sua imagem excede o limite de 1mb');
        this.fileUploadComponent.clearFiles();
        return;
      }
      if (this.type === 'RG' || this.type === 'RNE') {
        this.rgFiles[position] = file[0];
      } else if (this.type === 'CNH') {
        this.cnhFile = file[0];
      }
    });
  }

  removeFileCNH() {
    this.cnhFile = null;
  }

  removeDocumentFront() {
    this.rgFiles[0] = null;
  }

  removeDocumentBack() {
    this.rgFiles[1] = null;
  }

  changeType(type: string = 'RG | RNE | CNH') {
    this.type = type;
  }

  onSelect(event) {
    let type = event.target.id
    this.changeType(type)
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.type === 'RG' || this.type === 'RNE') {
      this.checkQualityRG();
    } else {
      this.checkQualityCNH();
    }
  }

  prev() {
    this.showQuestions = true;
    this.type = 'RG | CNH';
  }

  checkQualityRG() {
    const poorImageAlert = () => {
      this.sweetAlertService.show({
        icon: 'error',
        title: 'Seu RG está com qualidade baixa',
        html: `
          <img src="assets/images/rg_how.png" style="width: 640px">
        `
      });
    };

    const formData: FormData = new FormData();
    let qualityAsync: any = [];
    this.rgFiles.forEach(file => {
      formData.append('file', file, file.name);
      qualityAsync.push(this.checkQuality(formData));
    });

    this.loaderService.show();
    forkJoin(qualityAsync).subscribe((result: QualityImage[]) => {
      this.loaderService.hide();
      const isFailed = result.map(resultItem => resultItem.success).includes(false);
      if (isFailed) { return; }
      const isPoorImage = result.map(resultItem => resultItem.data)
        .map(resultItem => resultItem.poorImage)
        .includes(true);

      if (!isPoorImage) {
        this.rgImagesId = result.map(item => item.data).map(item => item.imageId);
        this.documentService.saveImageID(this.type, 0, this.rgImagesId[0]);
        this.documentService.saveImageID(this.type, 1, this.rgImagesId[1]);
        const imagesId = this.documentService.getImageID(this.type);
        this.submit.emit(imagesId);
      } else {
        this.fileUploadComponent.clearFiles();
        poorImageAlert();
      }
    }, (err) => {
      this.loaderService.hide();


      this.fileUploadComponent.clearFiles();
      poorImageAlert();
    });
  }

  checkQualityCNH() {
    const poorImageAlert = () => {
      this.sweetAlertService.show({
        icon: 'error',
        title: 'Sua CNH está com qualidade baixa',
        html: `
          <img src="assets/images/cnh_how.jpg" style="width: 200px">
          <div class="gray bold md-font access-account-text">Sua foto pode ter ficado escura. Vamos tentar de novo?</div>
          <div class="gray bold md-font access-account-text">Procure um local bem iluminado para suas informações ficarem legíveis :)</div>
          <div class="gray bold md-font access-account-text">Tire uma selfie e envie novamente</div>
          <div class="gray bold md-font access-account-text">Digitalize sua CNH aberta.</div>
        `
      });
    };

    const formData: FormData = new FormData();
    formData.append('file', this.cnhFile);
    this.loaderService.show();
    this.checkQuality(formData).subscribe((result: QualityImage) => {
      const isFailed = result.success === false;
      if (isFailed) { return; }
      const isPoorImage = result.data.poorImage;

      if (!isPoorImage) {
        this.documentService.saveImageID(this.type, 0, result.data.imageId);
        const imagesId = this.documentService.getImageID(this.type);

        this.submit.emit({ images: imagesId });
      } else {
        poorImageAlert();
        this.fileUploadComponent.clearFiles();
      }
      this.imageUploaded = true;
      this.loaderService.hide();
    }, (err) => {
      console.log('err', err)
      this.loaderService.hide();
      // poorImageAlert();
      this.fileUploadComponent.clearFiles();
    });
  }

  checkQuality(formData: FormData) {
    const document = this.userStorage.getDocument();
    return this.documentService.uploadDocument(document, formData);
  }

}
