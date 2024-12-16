import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../providers/post-providers';
import { ModalController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  nama: string = '';
  nohp: string = '';
  nosim: string = '';
  jenissim: string = '';
  email: string = '';
  photo: string | undefined; // URL sementara untuk preview
  expiryDate: string = ''; // Tambahkan properti untuk tanggal kedaluwarsa SIM
  isLoading = false;

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPvdr: PostProvider,
    private modalController: ModalController,
    private uploadService: UploadService,
  ) {}

  async takePhoto() {
    try {
      // Ambil foto dari kamera
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      if (image?.webPath) {
        this.photo = image.webPath;
        this.uploadImage(image);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }
async uploadImage(image: any) {
    this.isLoading = true;

    // Ambil file blob dari URI
    const response = await fetch(image.webPath!);
    const blob = await response.blob();

    // Kirim file ke server
    const fileName = `photo_${new Date().getTime()}.jpg`; // Nama file unik
    this.uploadService.uploadImage(blob, fileName).subscribe({
      next: (res) => {
        console.log('Upload berhasil:', res);
        alert('Photo berhasil di upload!');
      },
      error: (err) => {
        console.error('Upload gagal:', err);
        alert('Photo gagal di upload.');
      },
      complete: () => (this.isLoading = false),
    });
  }

  ngOnInit() {
  }
  
  closeModal() {
    this.modalController.dismiss();
   }

  async addRegister() {
    if (this.nama == '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.nohp == '') {
      const toast = await this.toastController.create({
        message: 'No HP/WA harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.nosim == '') {
      const toast = await this.toastController.create({
        message: 'No SIM harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.jenissim == '') {
      const toast = await this.toastController.create({
        message: 'Jenis SIM harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.email == '') {
      const toast = await this.toastController.create({
        message: 'Email harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.expiryDate == '') { // Tambahkan validasi untuk tanggal kedaluwarsa
      const toast = await this.toastController.create({
        message: 'Tanggal kedaluwarsa SIM harus di isi',
        duration: 2000
      });
      toast.present();
    } else if (this.photo == '') { // 
      const toast = await this.toastController.create({
        message: 'Photo harus di isi',
        duration: 2000
      });
      toast.present();
    } else {
      let body = {
        nama: this.nama,
        nohp: this.nohp,
        nosim: this.nosim,
        jenissim: this.jenissim,
        email: this.email,
        expiryDate: this.expiryDate, // Sertakan tanggal kedaluwarsa
        photo: this.photo,
        aksi: 'add_register'
      };
      this.postPvdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['/tab4']);
          const toast = await this.toastController.create({
            message: 'Selamat! Pengajuan Perpanjangan SIM sukses.',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
        }
      });

    }
  }
}