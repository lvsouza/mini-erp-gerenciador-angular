import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService, UtilidadesService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-funcionario',
  templateUrl: './cad-funcionario.component.html',
  styleUrls: ['./cad-funcionario.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadFuncionarioComponent implements OnInit {
  public serverAtual = this.CONSTS.OUTROS.SERVIDOR_ATUAL;
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.PESSOAS.FUNCIONARIO,
    rota: 'pages/listagems/pessoal/listfuncionario'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public itemGravar = {
    nomeItem: "",
    enderecoItem: "",
    numeroCasaItem: "",
    cidadeItem: "",
    bairroItem: "",
    estadoItem: "",
    telefoneItem: "",
    emailItem: "",
    emailConfirmaItem: "",
    nascimentoItem: "",
    sexoItem: "v",
    dataAdmissaoItem: "",
    salario: "0",
    cargo: "",
  };

  public resSelects = {
    selectCargo: []

  }

  constructor(
    private readDados: ReadDadosDatabaseService,
    private updateDados: UpdateDatabaseService,
    private postDados: PostDatabaseService,
    private activeRouter: ActivatedRoute,
    private CONSTS: ConstantesService,
    private avisoErro: AvisoService,
    private router: Router,

  ) {
    this.inicializaSelects();
    this.verificaEditar();
  }

  ngOnInit() {
  }

  public salvarItem() {
    if (this.verificacoes()) {
      if (this.editarItem.editar === false) {
        let item = {
          Nome: this.itemGravar.nomeItem,
          Rua: this.itemGravar.enderecoItem,
          Numero: Number(this.itemGravar.numeroCasaItem),
          Bairro: this.itemGravar.bairroItem,
          Cidade: this.itemGravar.cidadeItem,
          Estado: this.itemGravar.estadoItem,
          Telefone: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)),
          Email: this.itemGravar.emailItem,
          Sexo: this.itemGravar.sexoItem,
          Nascimento: this.itemGravar.nascimentoItem,
          DataAdmicao: this.itemGravar.dataAdmissaoItem,
          Salario: Number(this.itemGravar.salario),
          idCargo: this.itemGravar.cargo,
        }
        this.postDados.gravaDados(item, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_P.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_P.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_OK,
            );
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.ERRO,
              this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR
            );
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      } else if (this.editarItem.editar === true) {
        let item = {
          id: this.editarItem.id,
          Nome: this.itemGravar.nomeItem,
          Rua: this.itemGravar.enderecoItem,
          Numero: Number(this.itemGravar.numeroCasaItem),
          Bairro: this.itemGravar.bairroItem,
          Cidade: this.itemGravar.cidadeItem,
          Estado: this.itemGravar.estadoItem,
          Telefone: Number(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)),
          Email: this.itemGravar.emailItem,
          Sexo: this.itemGravar.sexoItem,
          Nascimento: this.itemGravar.nascimentoItem,
          DataAdmicao: this.itemGravar.dataAdmissaoItem,
          Salario: Number(this.itemGravar.salario),
          idCargo: this.itemGravar.cargo,
        }
        this.updateDados.atualizaDados(item, this.editarItem.id, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
              this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_ATUALIZADO_OK,
            );
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      }
    }
  }

  public inicializaSelects() {
    this.readDados.carregaDados(this.CONSTS.PESSOAS.CARGO).subscribe(data => {
      this.resSelects.selectCargo = data;
      EmissorEventosService.loadBar.emit(false);
    },
    error=> {
      EmissorEventosService.loadBar.emit(false);
    });
  }

  public onTelefoneChange() {
    this.itemGravar.telefoneItem = UtilidadesService.maskTelefone(this.itemGravar.telefoneItem);
  }

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id !== undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              this.editarItem.id = data.id;
              this.itemGravar.nomeItem = data.nome;
              this.itemGravar.sexoItem = data.sexo;
              this.itemGravar.emailItem = data.email;
              this.itemGravar.emailConfirmaItem = data.email;
              this.itemGravar.enderecoItem = data.rua;
              this.itemGravar.bairroItem = data.bairro;
              this.itemGravar.cidadeItem = data.cidade;
              this.itemGravar.estadoItem = data.estado;
              this.itemGravar.nascimentoItem = data.nascimento;
              this.itemGravar.dataAdmissaoItem = data.dataAdmicao;
              this.itemGravar.cargo = data.idCargo;
              this.itemGravar.salario = data.salario;
              this.itemGravar.numeroCasaItem = data.numero;
              this.itemGravar.telefoneItem = data.telefone;
              EmissorEventosService.loadBar.emit(false);
            }, error => EmissorEventosService.loadBar.emit(false));
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
    try {
      arrayEmail = this.itemGravar.emailItem.split('@');
      arrayEmailPonto = arrayEmail[1].split('.');
    } catch (e) { }
    if (this.itemGravar.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_FUN_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_FUN_MENOR3,
      );
      retorno = false;
    } else if (this.itemGravar.sexoItem == "v") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_SEXO_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.nascimentoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NASCIMENTO_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.enderecoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_RUA_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.enderecoItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_RUA_CAD_FUN_MENOR3,
      )
      retorno = false;
    } else if (String(this.itemGravar.numeroCasaItem) == "" || String(this.itemGravar.numeroCasaItem) == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUM_CASA_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (String(this.itemGravar.numeroCasaItem).length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUM_CAD_FUN_MENOR2
      )
      retorno = false;
    } else if (this.itemGravar.bairroItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_BAIRRO_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.bairroItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_BAIRRO_CAD_FUN_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.cidadeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CIDADE_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.cidadeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CIDADE_CAD_FUN_MENOR3,
      )
      retorno = false;
    } else if (this.itemGravar.estadoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_ESTADO_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)) == "0" || String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)) == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NUMERO_TELEFONE_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)).length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_FUN_MENOR2,
      )
      retorno = false;
    } else if (String(UtilidadesService.removeTudoNaoNumero(this.itemGravar.telefoneItem)).length > 12) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_TELEFONE_CAD_FUN_MAIOR12,
      )
      retorno = false;
    } else if (this.itemGravar.emailItem != this.itemGravar.emailConfirmaItem) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_EMAILS_ERRADOS,
      )
      retorno = false;
    } else if (arrayEmail.length < 2 || arrayEmailPonto.length < 2) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_EMAILS_INVALIDOS,
      );
      retorno = false;
    } else if (String(this.itemGravar.salario) == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_SALARIO_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (String(this.itemGravar.salario).length > 10) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_SALARIO_GRANDE_CAD_FUN,
      )
      retorno = false;
    } else if (this.itemGravar.dataAdmissaoItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_DATA_ADMICAO_CAD_FUN_VASIO,
      )
      retorno = false;
    } else if (this.itemGravar.cargo == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_DATA_ADMICAO_CAD_FUN_VASIO,
      )
      retorno = false;
    }
    return retorno;
  }

}
