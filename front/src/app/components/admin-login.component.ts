import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { Vehiculo } from '../models/vehiculo';
import { UsuarioServices } from '../services/usuario.services';
import { CochesServices } from '../services/coches.services';

@Component({
  selector: 'admin-login',
  templateUrl: '../views/admin-login.html',
  providers: [UsuarioServices]
})

export class AdminLoginComponent implements OnInit {
  public usuario: Usuario;
  public coches: Vehiculo[];
  public identity;
  public token;
  public errorMessage;

  constructor(private _cocheServices: CochesServices, private _usuarioService: UsuarioServices, private router: Router) {
    this.usuario = new Usuario('', '', '', '');
  }

  ngOnInit() {
    this.identity = this._usuarioService.getIdentity();
    this.token = this._usuarioService.getToken();

    this._cocheServices.getCoches().subscribe(
      response => {
        if (!response.vehiculos) {
          alert('Error obteniendo los coches.');
        } else {
          this.coches = response.vehiculos;
        }
      },
      error => {
        var body = JSON.parse(error._body);
        alert(body.message);
      }
    );
  }

  public onSubmit() {
    console.log('entra al boton');
    this._usuarioService.signup(this.usuario)
      .subscribe(response => {
        console.log('entra al subscribe');
        let identity = response.user;
        this.identity = identity;

        if (!this.identity._id) {
          alert('El usuario no está correctamente identificado');
        } else {
          localStorage.setItem('identity', JSON.stringify(this.identity));

          this._usuarioService.signup(this.usuario, 'true')
            .subscribe(response => {
              let token = response.token;
              this.token = token;

              if (this.token.length <= 0) {
                alert('El token no se ha generado correctamente.');
              } else {
                localStorage.setItem('token', this.token);
                console.log('logueao');

                this.usuario = new Usuario('', '', '', '');
              }
            }, error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                var body = JSON.parse(error._body);
                this.errorMessage = body.message;
              }
            });
        }
      }, error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
        }
      });
  }

  public logout() {
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;
  }

  cambiarDisponibilidad(id) {
    this._cocheServices.cambiarDisponibilidad(id).subscribe(
      response => {
        if (!response.vehiculos) {
          //this.alert = 'No deletions were made.';
        } else {
          this.ngOnInit()
        }
      },
      error => {
        var body = JSON.parse(error._body)
        //this.alert = <any>error;

        /*if (this.alert != null) {
            var body = JSON.parse(error._body)
            //this.alert = body.message
        }*/
      }
    )
  }

  borrarCoche(id) {
    this._cocheServices.borrarCoche(id).subscribe(
      response => {
        if (!response.vehiculo) {
          //this.alert = 'No deletions were made.';
        } else {
          this.ngOnInit()
        }
      },
      error => {
        var body = JSON.parse(error._body)
        //this.alert = <any>error;

        /*if (this.alert != null) {
            var body = JSON.parse(error._body)
            //this.alert = body.message
        }*/
      }
    )
  }
}