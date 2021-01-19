import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
    private toastCrtl: ToastController) {

      this.cargarFavoritos();
     }


    async presentToast(message: string){
      try {
        const toast = await this.toastCrtl.create({
          message,
          duration: 1500
      });
      toast.present();
      } catch (error) {
        
      }
      
    }

  guardarPelicula(pelicula: PeliculaDetalle){

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ){
      if(peli.id === pelicula.id){
        existe = true;
        break;
      }
    }

    if(existe){
      this.peliculas = this.peliculas.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de favoritos';
    }else{
       this.peliculas.push( pelicula );
       mensaje = 'Agregado a favoritos';

    }


    this.storage.set('peliculas', this.peliculas);
    this.presentToast(mensaje);

    return !existe;
  }

  async cargarFavoritos(){
    try {
      const peliculas = await this.storage.get('peliculas');
      this.peliculas = peliculas || [];
      
      return this.peliculas;
    } catch (error) {
      
    }
   
  }

   async existePelicula( id ){

    try {
      await this.cargarFavoritos();
      const existe = this.peliculas.find( peli => peli.id === id);
   
      return (existe) ? true : false;
    } catch (error) {
      
    }
   
  }

}
