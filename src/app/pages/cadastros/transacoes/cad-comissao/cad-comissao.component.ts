import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-comissao',
  templateUrl: './cad-comissao.component.html',
  styleUrls: ['./cad-comissao.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})

export class CadComissaoComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.OUTROS.COMISSAO,
    rota: 'pages/listagems/transacoes/listcomissao'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public itemGravar = {
    nomeItem: "",
    qtdVendas: 0,
    valorVenda: 0,
    porcentagemComissao: 0,
    valorComissao: 0,
    selectFuncionario: "",
  };

  public resSelect = {
    selectFuncionario: []
  }

  public serverAtual = this.CONSTS.OUTROS.SERVIDOR_ATUAL;

  constructor(
    private readDados: ReadDadosDatabaseService,
    private postDados: PostDatabaseService,
    private updateDados: UpdateDatabaseService,
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
          QtdVendas: this.itemGravar.qtdVendas,
          ValorVendas: this.itemGravar.valorVenda,
          PorcentoComissao: this.itemGravar.porcentagemComissao,
          ValorComissao: this.itemGravar.valorComissao,
          idFuncionario: this.itemGravar.selectFuncionario,
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
          }
        );
      } else if (this.editarItem.editar === true) {
        let item = {
          id: this.editarItem.id,
          Nome: this.itemGravar.nomeItem,
          QtdVendas: this.itemGravar.qtdVendas,
          ValorVendas: this.itemGravar.valorVenda,
          PorcentoComissao: this.itemGravar.porcentagemComissao,
          ValorComissao: this.itemGravar.valorComissao,
          idFuncionario: this.itemGravar.selectFuncionario,
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
            this.avisoErro.createDialog(
              this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
              this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
              this.CONSTS.AVISO.TIPOERROAVISO.ERRO,
              this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR
            );
            EmissorEventosService.loadBar.emit(false);
          }
        );
      }
    }
  }

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id != undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              this.itemGravar.nomeItem = data.nome;
              this.itemGravar.qtdVendas = data.qtdVendas;
              this.itemGravar.valorVenda = data.valorVendas;
              this.itemGravar.porcentagemComissao = data.porcentoComissao;
              this.itemGravar.valorComissao = data.valorComissao;
              this.itemGravar.selectFuncionario = data.idFuncionario;
              EmissorEventosService.loadBar.emit(false);
            }
          );
        } else {
          this.editarItem.editar = false;
        }
      }
    );
  }

  public inicializaSelects() {
    this.readDados.carregaDados(this.CONSTS.PESSOAS.FUNCIONARIO).subscribe(
      data => {
        this.resSelect.selectFuncionario = data;
        EmissorEventosService.loadBar.emit(false);
      },
      error => {
        this.avisoErro.createDialog(
          this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
          this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTS.AVISO.TIPOERROAVISO.ERRO,
          this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR
        );
        EmissorEventosService.loadBar.emit(false);
      }
    );
  }

  private verificacoes(): boolean {
    let retorno: boolean = true;
    if (this.itemGravar.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_FOR_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_FOR_MENOR3,
      );
      retorno = false;
    } else if (this.itemGravar.qtdVendas == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_QTD_VENDA_CAD_COMI_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.valorVenda == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_VALOR_VENDA_CAD_COMI_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.porcentagemComissao == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_PORCENTO_COMISSAO_CAD_COMI_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.valorComissao == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_VALOR_COMISSAO_CAD_COMI_VASIO,
      );
      retorno = false;
    } else if (this.itemGravar.selectFuncionario == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_FUNCIONARIO_ID_CAD_COMI_VASIO,
      );
      retorno = false;
    } else {
      retorno = true;
    }
    return retorno;
  }
}
