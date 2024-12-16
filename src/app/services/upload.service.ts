import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = 'https://ritchyrpl2022.my.id/upload/upload.php'; // Ganti ini ke endpoint upload server Anda

  constructor(private http: HttpClient) {}

  uploadImage(file: Blob, fileName: string) {
    const formData = new FormData();
    formData.append('file', file, fileName); // Kirim file dengan nama "file"

    return this.http.post(this.uploadUrl, formData);
  }
}