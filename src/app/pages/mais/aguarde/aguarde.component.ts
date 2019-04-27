import { Component, OnInit } from '@angular/core';
import { LoginService, ConstantesService, AvisoService } from 'src/app/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aguarde',
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export class AguardeComponent implements OnInit {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private CONSTANTES: ConstantesService,
    private avisoService: AvisoService,

  ) { }

  ngOnInit() {
    this.tryLogin();
  }
  
  private tryLogin() {
    this.loginService.verificaEstaLogado().subscribe(
      (data: boolean) => {
        if (data == true) {
          this.router.navigate(['pages/dashboard']);
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
