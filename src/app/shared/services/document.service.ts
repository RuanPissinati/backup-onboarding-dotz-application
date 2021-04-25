import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export interface QualityImage {
  data: {
    poorImage: boolean | string,
    imageId: string,
  },
  success: string | boolean,
};


@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient,) { }

  uploadDocument(cpf: string, data): Observable<QualityImage> {
    return this.http.post<QualityImage>(`${environment.DOCUMENT_API}v1/checkquality/document/${cpf}`, data, {
    });
  }

  uploadSelfie(cpf: string, data: FormData): Observable<QualityImage> {
    return this.http.post<QualityImage>(`${environment.DOCUMENT_API}v1/checkquality/selfie/${cpf}`, data, {
    });
  }

  blobToFile(theBlob: Blob, fileName: string, type: string): File {
    return new File([theBlob], fileName, { type, lastModified: Date.now() });
  }

  isFileExceedSize(file, maxSize: number = 1000000) {
    if (+file.size > +maxSize) {
      return true;
    }
    return false;
  }

  saveImageID(type: string, position: number = 0, id: string) {
    const imageList = JSON.parse(localStorage.getItem('image-id-list')) || {};
    if (!imageList[type]) {
      imageList[type] = [];
    }
    imageList[type][position] = id;
    localStorage.setItem('image-id-list', JSON.stringify(imageList));
  }

  getImageID(type: string) {
    const imageList = JSON.parse(localStorage.getItem('image-id-list')) || {};
    return imageList[type];
  }

}
