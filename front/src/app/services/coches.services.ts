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

    cambiarDisponibilidad(id: string) {
        let headers = new Headers({'Content-Type':'application/json',
            'Authorization': this.getToken()})
        let options = new RequestOptions({headers: headers})

        return this._http.put(this.url+'actualizar-vehiculo/'+id, options)
            .pipe(map(res => res.json()))
    }

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