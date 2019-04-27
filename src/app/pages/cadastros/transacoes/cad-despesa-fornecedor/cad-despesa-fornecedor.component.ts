import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-despesa-fornecedor',
  templateUrl: './cad-despesa-fornecedor.component.html',
  styleUrls: ['./cad-despesa-fornecedor.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadDespesaFornecedorComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.DESPESAS.DESPESA_FORNECEDOR,
    rota: 'pages/listagems/transacoes/listdespesafornecedor'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public item = {
    nomeItem: "",
    valor: 0,
    data: "",
    selectFornecedor: "",
    descricao: "",
  };

  public resSelect = {
    selectFornecedor: []
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
          Nome: this.item.nomeItem,
          Valor: this.item.valor,
          Data: this.item.data,
          IdFornecedor: this.item.selectFornecedor,
          Descricao: this.item.descricao,
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
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      } else if (this.editarItem.editar === true) {
        let item = {
          id: this.editarItem.id,
          Nome: this.item.nomeItem,
          Valor: this.item.valor,
          Data: this.item.data,
          IdFornecedor: this.item.selectFornecedor,
          Descricao: this.item.descricao,
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

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id != undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              this.item.nomeItem = data.nome;
              this.item.valor = data.valor;
              this.item.data = data.data;
              this.item.selectFornecedor = data.idFornecedor;
              this.item.descricao = data.descricao;
              EmissorEventosService.loadBar.emit(false);
            }
          );
        } else {
          this.editarItem.editar = false;
          EmissorEventosService.loadBar.emit(false);
        }
      }
    );
  }

  public inicializaSelects() {
    this.readDados.carregaDados(this.CONSTS.PESSOAS.FORNECEDOR).subscribe(
      data => {
        this.resSelect.selectFornecedor = data;
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
    if (this.item.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_DESP_FORNE_VASIO,
      );
      retorno = false;
    } else if (this.item.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_CAD_DESP_FORNE_MENOR3,
      );
      retorno = false;
    } else if (this.item.valor == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_VALOR_CAD_DESP_FORNE_VASIO,
      );
      retorno = false;
    } else if (this.item.data == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_DATA_CAD_DESP_FORNE_VASIO,
      );
      retorno = false;
    } else if (this.item.selectFornecedor == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_FUNCIONARIO_CAD_DESP_FORNE_VASIO,
      );
      retorno = false;
    } else {
      retorno = true;
    }
    return retorno;
  }
}
