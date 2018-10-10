import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ConfigServices {
    public url: string;
    public identity;
    public token;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    crear(config) {
        let json = JSON.stringify(config);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json',
        'Authorization': this.getToken()});

        return this._http.post(this.url+'crear-config', params, {headers: headers})
            .pipe(map(res => res.json()));
    }

    actualizaConfig(config) {
        var id = config._id;
        let json = JSON.stringify(config);
        let params = json;
        let headers = new Headers({'Content-Type':'application/json',
        'Authorization': this.getToken()});

        return this._http.put(this.url+'actualizar-config/'+id, params, {headers: headers})
            .pipe(map(res => res.json()));
    }

    mostrarConfig() {
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers: headers})

        return this._http.get(this.url+'mostrar-config', options)
            .pipe(map(res => res.json()));
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