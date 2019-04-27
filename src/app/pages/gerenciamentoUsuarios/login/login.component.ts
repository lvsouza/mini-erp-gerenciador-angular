import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { LoginService } from './../../../share/services/loginContas/loginService/login.service';
import { ConstantesService, AvisoService } from 'src/app/share';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public emailFormControl = new FormControl('', [ Validators.required, Validators.email, ]);
  
  public buttonOrProgress: boolean = false;
  public empresasSelect = [];
  public emailInput = '';
  public senhaInput = '';

  constructor(
    private CONSTANTES: ConstantesService,
    private loginService: LoginService,
    private avisoService: AvisoService,
    private router: Router,
    
  ) { }

  ngOnInit() {
    LoginService.desativaProgressBar.subscribe(res => this.buttonOrProgress = res);
    this.tryLogin();
  }

  public efetuarLogin() {
    this.buttonOrProgress = true;
    this.loginService.efetuarLogin(this.emailInput, this.emailInput, this.senhaInput);
  }

  public criarUsuario() {
    this.avisoService.createDialog(
      this.CONSTANTES.AVISO.SIZES.SIZE_P.WIDTH,
      this.CONSTANTES.AVISO.SIZES.SIZE_P.HEIGHT,
      this.CONSTANTES.AVISO.TIPOERROAVISO.AVISO,
      "Ainda não é possivel criar usuários!",
    );
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
