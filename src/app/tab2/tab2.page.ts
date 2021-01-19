import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { Pelicula } from '../interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor( private moviesService: MoviesService,
    private modalCtrl: ModalController) {}


  peliculas: Pelicula[] = [];
  textoBuscar = '';
  ideas: string[] = ['Spiderman','Avengers','El señor de los anillos'];
  buscando = false;

  buscar(event){

    const valor: string  = event.detail.value;
    this.buscando = true;

    if (valor.length == 0) {
    this.buscando = false;
    this.peliculas = [];
      return;
    }

    this.moviesService.searchMovie( valor )
    .subscribe( resp => {

      
      this.peliculas = resp['results'];
      this.buscando = false;

    });

  }

  async detalle(id: string){

    try {
      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {
          id
        }
      });
  
      modal.present();
    } catch (error) {
      
    }
   
  }

}
