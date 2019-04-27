import { Component, OnInit } from '@angular/core';
import { LoginService, Usuario, AvisoService, ConstantesService } from 'src/app/share';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css'],
  animations: [
    trigger('inicializaConfiguracao', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class ConfiguracaoComponent implements OnInit {

  public itemGravar = {
    nome: "",
    senhaAtual: "",
    senhaNova: "",
    senhaNovaConfirmar: "",
  }

  public user: Usuario;

  constructor(
    private loginService: LoginService,
    private avisoService: AvisoService,
    private CONSTS: ConstantesService,

  ) { }

  ngOnInit() {
    this.user = this.loginService.informacoesUserLogado();
    this.itemGravar.nome = this.user.Nome;
  }

  public salvarSenha() {
    if (this.itemGravar.senhaNova == "" || this.itemGravar.senhaNovaConfirmar == "" || this.itemGravar.senhaAtual == "") {
      this.avisoService.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_SENHAS_VASIA
      );
      LoginService.desativaProgressBar.emit(false);
    } else if (this.itemGravar.senhaNova != this.itemGravar.senhaNovaConfirmar) {
      this.avisoService.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_SENHAS_NAO_CONFEREM
      );
      LoginService.desativaProgressBar.emit(false);
    } else {
      this.loginService.editarSenha(this.user.Id.toString(), this.itemGravar.senhaAtual, this.itemGravar.senhaNova);
    }
  }

  public salvarUsuario() {
    LoginService.desativaProgressBar.emit(true);
    this.itemGravar.nome = this.itemGravar.nome.replace(/ /g, '|');
    if (this.verificacoes()) {
      this.loginService.editarUser(String(this.user.Id), this.itemGravar.nome, this.user.Email);
    }
  }

  private verificacoes(): boolean {
    let retorno = true;
    if (this.itemGravar.nome == "") {
      this.avisoService.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_NOME_VASIO
      );
      retorno = false;
      LoginService.desativaProgressBar.emit(false);
    }
    return retorno;
  }

}
