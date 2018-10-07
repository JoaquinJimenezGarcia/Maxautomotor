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
  public vehiculo : Vehiculo;
  public identity;
  public token;
  public errorMessage;

  constructor(private _cocheServices: CochesServices, private _usuarioService: UsuarioServices, private router: Router) {
    this.usuario = new Usuario('', '', '', '');
    this.vehiculo =  new Vehiculo('', '', '', false, '', '', 0, false, false, false, 0);
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

  marcarReservado(id) {
    console.log();
    this._cocheServices.marcarReservado(id).subscribe(
      response => {
        console.log(response);
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

    this.ngOnInit()
  }

  marcarNoReservado(id) {
    console.log();
    this._cocheServices.marcarNoReservado(id).subscribe(
      response => {
        console.log(response);
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

    this.ngOnInit()
  }

  marcarVendido(id) {
    console.log();
    this._cocheServices.marcarVendido(id).subscribe(
      response => {
        console.log(response);
        if (!response.vehiculos) {
          //this.alert = 'No deletions were made.';
        } else {
          this.ngOnInit()
        }
      },
      error => {
        var body = JSON.parse(error._body)
        console.log(body);
        //this.alert = <any>error;

        /*if (this.alert != null) {
            var body = JSON.parse(error._body)
            //this.alert = body.message
        }*/
      }
    )

    this.ngOnInit()
  }

  marcarDisponible(id) {
    console.log();
    this._cocheServices.marcarDisponible(id).subscribe(
      response => {
        console.log(response);
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

    this.ngOnInit()
  }

  marcarNoDisponible(id) {
    console.log();
    this._cocheServices.marcarNoDisponible(id).subscribe(
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
    this.ngOnInit()
  }

  ponerEnOferta(id, vehiculo) {
    this.vehiculo._id = id;
    var precioOferta = this.vehiculo.precioOferta;
    this.vehiculo = vehiculo;
    this.vehiculo.precioOferta = precioOferta;

    this._cocheServices.ponerEnOferta(this.vehiculo._id, this.vehiculo).subscribe(
      response => {
        console.log(response);
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

    this.ngOnInit()
  }

  quitarEnOferta(id) {
    console.log();
    this._cocheServices.quitarEnOferta(id).subscribe(
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
    this.ngOnInit()
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