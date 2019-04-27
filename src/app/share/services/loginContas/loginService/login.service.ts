import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AvisoService } from '../../avisoPopup/aviso.service';
import { ConstantesService } from './../../CONSTANTS/constantes.service';
import { Usuario } from './../../../';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  static desativaProgressBar = new EventEmitter<boolean>();

  constructor(
    private CONSTANTES: ConstantesService,
    private avisoService: AvisoService,
    private http: HttpClient,
    private router: Router,

  ) {

  }

  /**
   * Verifica se a um usuário logado e returna true ou false.
   *
   * @return Boolean Retorna verdadeiro ou falso.
   */
  public verificaEstaLogado(): any {
    const logado = JSON.parse(localStorage.getItem(this.CONSTANTES.LOCALSTORAGE_KEYS.ISLOGADO));
    if (logado !== null) {
      return this.http.get(this.CONSTANTES.URI_VALIDA_TOKEN_USERS_IN_OUTSYSTEMS + "Id=" + logado.Id + "&Token=" + logado.KeyValida);
    } else {
      this.router.navigate(['/login']);
    }
  }

  /**
   * Retorna todas as informações de login.
   *
   * @return Any Todas as informçõesd e login do usuário.
   */
  public informacoesUserLogado(): any {
    var logado: any;
    if (this.verificaEstaLogado()) {
      logado = JSON.parse(localStorage.getItem(this.CONSTANTES.LOCALSTORAGE_KEYS.ISLOGADO));
    }
    return logado;
  }

  /**
   * Efetua o login gravando as informações no localstorage.
   *
   * @return Void Não retorna nada.
   */
  public efetuarLogin(email: string, empresa: string, senha: string): any {
    var user_a_validar = {
      "Email": email,
      "NomeEmpresa": empresa,
      "Senha": senha
    };
    this.http.get(this.CONSTANTES.URI_VALIDA_USERS_IN_OUTSYSTEMS +
      "Email=" + user_a_validar.Email + "&Senha=" + user_a_validar.Senha).subscribe(
        (data: Usuario) => {
          if (data.Id == 0) {
            this.avisoService.createDialog(
              this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTANTES.AVISO.TIPOERROAVISO.ERRO,
              this.CONSTANTES.AVISO.MSGS.ERRO_CREDENCIAIS
            );
            LoginService.desativaProgressBar.emit(false);
          } else {
            localStorage.setItem(this.CONSTANTES.LOCALSTORAGE_KEYS.ISLOGADO, JSON.stringify(data));
            this.router.navigate(['/pages/mais/aguarde']);
            location.reload();
          }
        },
        error => {
          this.avisoService.createDialog(
            this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
            this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
            this.CONSTANTES.AVISO.TIPOERROAVISO.ERRO,
            this.CONSTANTES.AVISO.MSGS.ERRO_SERVIDOR
          );
          LoginService.desativaProgressBar.emit(false);
        }
      );
  }

  /**
   * Encerra o login do usuário, apagendo as informações do localstorage.
   *
   */
  public encerraLogin() {
    localStorage.removeItem(this.CONSTANTES.LOCALSTORAGE_KEYS.ISLOGADO);
    location.reload();
  }

  /**
   * Ainda não implementado.
   *
   * @param nome Nome do novo usuario.
   * @param email Email do usuario.
   * @param senha Senha do usuário.
   */
  public createUser(nome: string, email: string, senha: string) {
    let user_a_criar = {
      "Nome": nome,
      "Email": email,
      "Senha": senha
    };
    this.http.get(this.CONSTANTES.URI_CREATE_USERS_IN_OUTSYSTEMS +
      "Nome=" + user_a_criar.Nome + "&Email=" + user_a_criar.Email + "&Senha=" + user_a_criar.Senha).subscribe(
        (data: Usuario) => {
          if (data.Id == 0) {
            this.avisoService.createDialog(
              this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTANTES.AVISO.TIPOERROAVISO.ERRO,
              this.CONSTANTES.AVISO.MSGS.AVISO_USUARIO_CRIADO
            );
            LoginService.desativaProgressBar.emit(false);
            this.router.navigate(['/pages/login']);
          } else {
            this.avisoService.createDialog(
              this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTANTES.AVISO.TIPOERROAVISO.ERRO,
              this.CONSTANTES.AVISO.MSGS.ERRO_SERVIDOR
            );
            LoginService.desativaProgressBar.emit(false);
          }
        },
        error => {
          this.avisoService.createDialog(
            this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
            this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
            this.CONSTANTES.AVISO.TIPOERROAVISO.ERRO,
            this.CONSTANTES.AVISO.MSGS.ERRO_SERVIDOR
          );
          LoginService.desativaProgressBar.emit(false);
        }
      );
  }

  /**
   * editar o nome de usuario.
   *
   * @param id string O id do usuario a ser alterado as informações.
   * @param nome string novo nome o usuario.
   * @param email string email atual do usuario.
   */
  public editarUser(id: string, nome: string, email: string) {
    let user_a_criar = {
      "Id": id,
      "Nome": nome,
      "Email": email
    };
    this.http.get(
      this.CONSTANTES.URI_EDITAR_USERS_IN_OUTSYSTEMS +
      "Id=" + user_a_criar.Id +
      "&Nome=" + user_a_criar.Nome +
      "&Email=" + user_a_criar.Email
    ).subscribe(
      data => {
        localStorage.setItem(this.CONSTANTES.LOCALSTORAGE_KEYS.ISLOGADO, JSON.stringify(data));
        location.reload();
      }, erro => {
        LoginService.desativaProgressBar.emit(false);
      }
    );
  }

  /**
   * Edita a senha desse usuario.
   *
   * @param id string Id o usuário a ser alterado.
   * @param senhaAtual string Senha atual do usuario.
   * @param senhaNova string nova senha do usuario.
   */
  public editarSenha(id: string, senhaAtual: string, senhaNova: string) {
    let user_a_criar = {
      "Id": id,
      "SenhaAtual": senhaAtual,
      "SenhaNova": senhaNova
    };
    this.http.get(
      this.CONSTANTES.URI_EDITAR_SENHA_IN_OUTSYSTEMS +
      "Id=" + user_a_criar.Id +
      "&SenhaAtual=" + user_a_criar.SenhaAtual +
      "&SenhaNova=" + user_a_criar.SenhaNova
    ).subscribe(
      (data: Usuario) => {
        console.log(data);
        if (data.Nome == "erro senha") {
          this.avisoService.createDialog(
            this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
            this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
            this.CONSTANTES.AVISO.TIPOERROAVISO.AVISO,
            this.CONSTANTES.AVISO.MSGS.ERRO_CREDENCIAIS
          );
          LoginService.desativaProgressBar.emit(false);
        } else {
          this.avisoService.createDialog(
            this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
            this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
            this.CONSTANTES.AVISO.TIPOERROAVISO.AVISO,
            this.CONSTANTES.AVISO.MSGS.AVISO_SENHAS_ALTERADAS_SUCESSO
          );
        }
        LoginService.desativaProgressBar.emit(false);
      }, erro => {
        this.avisoService.createDialog(
          this.CONSTANTES.AVISO.SIZES.SIZE_M.WIDTH,
          this.CONSTANTES.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTANTES.AVISO.TIPOERROAVISO.AVISO,
          this.CONSTANTES.AVISO.MSGS.ERRO_SERVIDOR
        );
        LoginService.desativaProgressBar.emit(false);
      }
    );
  }
}
