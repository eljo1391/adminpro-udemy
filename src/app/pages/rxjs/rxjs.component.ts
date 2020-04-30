import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
//import { truncate } from 'fs';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().pipe(
      // veces que vuelve a intentar luego de producirse el error
      // retry(1)
    )
    .subscribe(
      numero => console.log( 'Subs', numero),
      error => console.error('Error en el obs', error ),
      () => console.log( 'El observador termino'),
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    console.log('la pgina se cerrara');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable <any> {

    return new Observable ( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        /* if ( contador === 10 ){
          clearInterval( intervalo );
          observer.complete();
        }*/

       // if ( contador === 2){
          // clearInterval( intervalo );
          // observer.error('Auxilio');
       // }

    }, 1000 );

   }).pipe(
      map( resp =>  resp.valor),
      filter( ( valor, index ) => {
        if ( (valor % 2) === 1 ){
          // impar
          return true;
        }else{
          // par
          return false;
        }
      })
    );
  }

}
