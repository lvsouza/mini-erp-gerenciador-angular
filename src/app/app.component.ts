import { ConstantesService, LoginService, AvisoService } from './share';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmissorEventosService } from './share/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Erp Loja de Informatica';
  public loadBar: boolean = false;
  public estaLogado: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private avisoService: AvisoService,
    private CONSTANTES: ConstantesService,
  ) {

    EmissorEventosService.loadBar.subscribe((value: boolean) => this.loadBar = value);
  }

  ngOnInit() {
    this.tryLogin();
  }

  private tryLogin() {
    this.loginService.verificaEstaLogado().subscribe(
      (data: boolean) => {
        this.estaLogado = data;
        if (this.estaLogado == true) {
        } else {
          this.router.navigate(['/login']);
          this.loginService.encerraLogin();
          location.reload();
        }
      },
      error => {
        this.avisoService.createDialog(
          this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
          this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTANTES.AVISO.TIPOERROAVISO.ERRO,
          this.CONSTANTES.AVISO.MSGS.ERRO_SERVIDOR
        )
      });
  }

}
