import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService, UtilidadesService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-cliente',
  templateUrl: './cad-cliente.component.html',
  styleUrls: ['./cad-cliente.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadClienteComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.PESSOAS.CLIENTE,
    rota: 'pages/listagems/pessoal/listcliente'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public itemGravar = {
    nomeItem: "",
    sexoItem: "v",
    nascimentoItem: "",
    cpfItem: "",
    telefoneItem: "",
    emailItem: "",
    emailConfirmaItem: "",
    enderecoItem: "",
    bairroItem: "",
    numeroCasaItem: "",
    cidadeItem: "",
    estadoItem: "",
    cepItem: "",
  };

  constructor(
    private readDados: ReadDadosDatabaseService,
    private postDados: PostDatabaseService,
    private updateDados: UpdateDatabaseService,
    private activeRouter: ActivatedRoute,
    private CONSTS: ConstantesService,
    private avisoErro: AvisoService,
    private router: Router,

  ) {
    this.verificaEditar();
  }

  ngOnInit() {
  }

  public salvarItem() {
    if (this.verificacoes()) {
      if (this.editarItem.editar === false) {
        let item = {
          Nome: this.itemGravar.nomeItem,
          Sexo: this.itemGravar.sexoItem,
          Email: this.itemGravar.emailItem,
          Rua: this.itemGravar.enderecoItem,
          Bairro: this.itemGravar.bairroItem,
          Cidade: this.itemGravar.cidadeItem,
          Estado: this.itemGravar.estadoItem,
          Nascimento: this.itemGravar.nascimentoItem,
          Cpf: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cpfItem)),
          Cep: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cepItem)),
          Numero: Number(this.itemGravar.numeroCasaItem),
          Telefone: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)),
        }
        this.postDados.gravaDados(item, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_P.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_P.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_OK,
            );
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      } else if (this.editarItem.editar === true) {
        let item = {
          id: this.editarItem.id,
          Nome: this.itemGravar.nomeItem,
          Sexo: this.itemGravar.sexoItem,
          Email: this.itemGravar.emailItem,
          Rua: this.itemGravar.enderecoItem,
          Bairro: this.itemGravar.bairroItem,
          Cidade: this.itemGravar.cidadeItem,
          Estado: this.itemGravar.estadoItem,
          Nascimento: this.itemGravar.nascimentoItem,
          Cpf: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cpfItem)),
          Cep: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cepItem)),
          Numero: Number(this.itemGravar.numeroCasaItem),
          Telefone: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)),
        }
        this.updateDados.atualizaDados(item, this.editarItem.id, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_ATUALIZADO_OK,
            );
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      }
    }
  }

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id !== undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              console.log(data)
              this.editarItem.id = data.id;
              this.itemGravar.nomeItem = data.nome;
              this.itemGravar.sexoItem = data.sexo;
              this.itemGravar.emailItem = data.email;
              this.itemGravar.emailConfirmaItem = data.email;
              this.itemGravar.enderecoItem = data.rua;
              this.itemGravar.bairroItem = data.bairro;
              this.itemGravar.cidadeItem = data.cidade;
              this.itemGravar.estadoItem = data.estado;
              this.itemGravar.nascimentoItem = this.formatData(data.nascimento);
              this.itemGravar.cpfItem = data.cpf;
              this.itemGravar.cepItem = data.cep;
              this.itemGravar.numeroCasaItem = data.numero;
              this.itemGravar.telefoneItem = data.telefone;
            });
        } else {
          this.editarItem.editar = false;
        }
      }
    );
  }

  private verificacoes(): boolean {
    let retorno: boolean = true;
    let arrayEmail;
    let arrayEmailPonto;
    let cpfString = "";
    try {
      arrayEmail = this.itemGravar.emailItem.split('@');
      arrayEmailPonto = arrayEmail[1].split('.');
    } catch (e) { }
    try {
      cpfString = UtilidadesService.removeTudoNaoNumero(this.itemGravar.cpfItem);
    } catch (e) { cpfString = "" }
    if (this.itemGravar.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_CLI_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_CLI_MENOR3,
      );
      retorno = false;
    } else if (String(this.itemGravar.numeroCasaItem) == "" || String(this.itemGravar.numeroCasaItem) == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUM_CASA_CAD_CLI_VASIO,
      )
      retorno = false;
    } else if (String(this.itemGravar.numeroCasaItem).length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUM_CASA_CAD_CLI_MENOR2,
      );
      retorno = false;
    } else if (this.itemGravar.enderecoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_RUA_CAD_CLI_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.enderecoItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_RUA_CAD_CLI_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.bairroItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_BAIRRO_CAD_CLI_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.bairroItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_BAIRRO_CAD_CLI_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.cidadeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CIDADE_CAD_CLI_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.cidadeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CIDADE_CAD_CLI_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.estadoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_ESTADO_CAD_CLI_VASIO
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.cepItem)).length != 8) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CEP_INVALIDOS,
      );
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)) == "0" || String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)) == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_CLI_VASIO,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)).length < 5) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_CLI_MENOR5,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)).length > 12) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_CLI_MAIOR12,
      )
      retorno = false;
    } else if (String(cpfString) == "" || String(cpfString) == "0" || String(cpfString) == null || String(cpfString) == undefined) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CPF_CAD_CLI_VASIO,
      )
      retorno = false;
    } else if (String(cpfString).length != 11) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CPF_CAD_CLI_TAMANHO,
      )
      retorno = false;
    } else if (this.itemGravar.sexoItem == "v") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_SEXO_CAD_CLI_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.nascimentoItem ==  "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NASCIMNETO_CAD_CLI_VASIO,
      );
      retorno = false;
    } else if (arrayEmail.length < 2 || arrayEmailPonto.length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_EMAIL_CAD_CLI_VASIO,
      );
      retorno = false;
    }
    return retorno;
  }

  private formatData(data) {
    let arraydata = data.split('-');
    return arraydata[2] + "-" + arraydata[1] + "-" + arraydata[0];
  }

  public onCepKeyPress() {
    this.itemGravar.cepItem = UtilidadesService.maskCep(this.itemGravar.cepItem);
  }

  public onCpfKeyPress() {
    this.itemGravar.cpfItem = UtilidadesService.maskCpf(this.itemGravar.cpfItem);
  }
  
  public onTelefoneChange() {
    this.itemGravar.telefoneItem = UtilidadesService.maskTelefone(this.itemGravar.telefoneItem);
  }
}
