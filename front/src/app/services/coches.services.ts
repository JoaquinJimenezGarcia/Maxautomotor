import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class CochesServices {
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    crear(coche_a_insertar) {
        let json = JSON.stringify(coche_a_insertar);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json',
        'Authorization': this.getToken()});

        return this._http.post(this.url+'agregar-vehiculo', params, {headers: headers})
            .pipe(map(res => res.json()));
    }

    getCoches() {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers})

        return this._http.get(this.url+'vehiculos/', options)
            .pipe(map(res => res.json()));
    }

    borrarCoche(id: string) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()})
        let options = new RequestOptions({headers: headers})

        return this._http.delete(this.url+'eliminar-vehiculo/'+id, options)
            .pipe(map(res => res.json()))
    }

    marcarVendido(id: string) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()})
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'marcar-vendido/'+id, options)
            .pipe(map(res => res.json()))
    }

    ponerEnOferta(id, vehiculo){
        let json = JSON.stringify(vehiculo);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()});
        let options = new RequestOptions({headers: headers})

        console.log('justo antes de enviar el put');

        return this._http.put(this.url+'poner-en-oferta/'+id, params, options)
            .pipe(map(res => res.json()));
    }

    quitarEnOferta(id){
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()});
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'quitar-en-oferta/'+id, options)
            .pipe(map(res => res.json()));
    }

    marcarDisponible(id) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()});
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'marcar-disponible/'+id, options)
            .pipe(map(res => res.json()));
    }

    marcarNoDisponible(id) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()});
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'marcar-nodisponible/'+id, options)
            .pipe(map(res => res.json()));
    }

    marcarReservado(id) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()});
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'marcar-reservado/'+id, options)
            .pipe(map(res => res.json()));
    }

    marcarNoReservado(id) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()});
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'marcar-no-reservado/'+id, options)
            .pipe(map(res => res.json()));
    }

    /*marcarVendido(id) {
        console.log('identity');
        console.log(this.getIdentity());
        console.log('token');
        console.log(this.getToken());
        let token = this.getToken();
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': token
        });
        console.log('headers');
        console.log(headers);
        let options = new RequestOptions({headers: headers})
        console.log('options');
        console.log(options);

        return this._http.put(this.url+'marcar-vendido/'+id, {headers: headers})
            .pipe(map(res => res.json()));
    }*/

    getIdentity() {
        let identity = JSON.parse(localStorage.getItem('identity'));

        if(identity != 'undefined') {
            this.identity = identity;
        } else {
            this.identity = null;
        }

        return this.identity;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if(token != 'undefined') {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }
}