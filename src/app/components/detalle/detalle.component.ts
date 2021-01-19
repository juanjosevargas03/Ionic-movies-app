import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { AndroidExoplayer } from '@ionic-native/android-exoplayer/ngx';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  oculto = 150;
  actores: Cast[] = [];
  existe: boolean;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };

  constructor( private moviesservice:MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private videoPlayer: VideoPlayer,
    private platform:Platform,
    private androidExoPlayer: AndroidExoplayer) {

     }

  async ngOnInit() {
    try {
      this.existe = await this.dataLocal.existePelicula( this.id );
    
    this.moviesservice.getPeliculaDetalle(this.id)
    .subscribe(resp => {
    
      this.pelicula = resp;
    });

    this.moviesservice.getActoresPelicula(this.id)
    .subscribe(resp => {
     
      this.actores = resp.cast;
    });
    } catch (error) {
      
    }
    
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.existe = this.dataLocal.guardarPelicula(this.pelicula);
  }


  playVideoHosted(){
    
    this.androidExoPlayer.show({url: 'http://www.youtube.com/api/manifest/dash/id/bf5bb2419360daf1/source/youtube'});
   
   /*  if(this.platform.is('cordova') ) {

      this.videoPlayer.play('https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4').then(() => {
    console.log('video completed');
    }).catch(err => {
    console.log(err);
    });
    } */
    
  }
    

}
