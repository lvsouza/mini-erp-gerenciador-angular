import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-produto',
  templateUrl: './cad-produto.component.html',
  styleUrls: ['./cad-produto.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})

export class CadProdutoComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.PRODUTOS.PRODUTO,
    rota: 'pages/listagems/produtos/listproduto'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public itemGravar = {
    nomeItem: "",
    descricaoItem: "",
    estoqueItem: 0,
    pecaItem: "0",
    marcaItem: "0",
    modeloItem: "0",
    fornecedorItem: "0",
    categoriaItem: "0",
    precoCustoItem: 0,
    precoVendaItem: 0,
    margenLucroItem: 0,
  };

  public resSelects = {
    selectPeca: [],
    selectMarca: [],
    selectCategoria: [],
    selectModelo: [],
    selectFornecedor: [],
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
    this.verificaEditar();
    this.inicializaSelects();
  }

  ngOnInit() {
  }

  public salvarItem() {
    if (this.editarItem.editar === false) {
      if (this.verificacoes()) {
        let item = {
          Nome: this.itemGravar.nomeItem,
          Observacao: this.itemGravar.descricaoItem,
          EstoqueAtual: Number(this.itemGravar.estoqueItem),
          FornecedorId: Number(this.itemGravar.fornecedorItem),
          CategoriaId: Number(this.itemGravar.categoriaItem),
          MargenLucro: Number(this.itemGravar.margenLucroItem),
          PrecoVenda: Number(this.itemGravar.precoVendaItem),
          PrecoCusto: Number(this.itemGravar.precoCustoItem),
          ModeloId: Number(this.itemGravar.modeloItem),
          MarcaId: Number(this.itemGravar.marcaItem),
          pecaId: Number(this.itemGravar.pecaItem),
        }
        console.log(item);
        this.postDados.gravaDados(item, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }, error => {
            this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
            EmissorEventosService.loadBar.emit(false);
            this.router.navigate([this.configFuncoesBasicas.rota]);
          }
        );
      } else {
        this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.AVISO, this.CONSTS.AVISO.MSGS.AVISO_CAMPO_VASIO)
      }
    } else if (this.editarItem.editar === true) {
      if (this.verificacoes()) {
        let item = {
          id: this.editarItem.id,
          Nome: this.itemGravar.nomeItem,
          Observacao: this.itemGravar.descricaoItem,
          EstoqueAtual: Number(this.itemGravar.estoqueItem),
          FornecedorId: Number(this.itemGravar.fornecedorItem),
          CategoriaId: Number(this.itemGravar.categoriaItem),
          MargenLucro: Number(this.itemGravar.margenLucroItem),
          PrecoVenda: Number(this.itemGravar.precoVendaItem),
          PrecoCusto: Number(this.itemGravar.precoCustoItem),
          ModeloId: Number(this.itemGravar.modeloItem),
          MarcaId: Number(this.itemGravar.marcaItem),
          pecaId: Number(this.itemGravar.pecaItem),
        }
        this.updateDados.atualizaDados(item, this.editarItem.id, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
          data => {
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
    this.readDados.carregaDados(this.CONSTS.PRODUTOS.PECA).subscribe(data => this.resSelects.selectPeca = data);
    this.readDados.carregaDados(this.CONSTS.PRODUTOS.MARCA).subscribe(data => this.resSelects.selectMarca = data);
    this.readDados.carregaDados(this.CONSTS.PRODUTOS.CATEGORIA).subscribe(data => this.resSelects.selectCategoria = data);
    this.readDados.carregaDados(this.CONSTS.PRODUTOS.MODELO).subscribe(data => this.resSelects.selectModelo = data);
    this.readDados.carregaDados(this.CONSTS.PESSOAS.FORNECEDOR).subscribe(data => {
      this.resSelects.selectFornecedor = data;
      EmissorEventosService.loadBar.emit(false);
    });
  }

  public revisaAutomacoes() {
    this.itemGravar.margenLucroItem = this.itemGravar.precoVendaItem - this.itemGravar.precoCustoItem;
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
              this.itemGravar.nomeItem = data.nome;
              this.itemGravar.descricaoItem = data.observacao;
              this.itemGravar.precoCustoItem = data.precoCusto;
              this.itemGravar.precoVendaItem = data.precoVenda;
              this.itemGravar.margenLucroItem = data.margenLucro;
              this.itemGravar.estoqueItem = data.estoqueAtual;
              this.itemGravar.pecaItem = data.pecaId;
              this.itemGravar.marcaItem = data.marcaId;
              this.itemGravar.modeloItem = data.modeloId;
              this.itemGravar.categoriaItem = data.categoriaId;
              this.itemGravar.fornecedorItem = data.fornecedorId;
              EmissorEventosService.loadBar.emit(false);
            });
        } else {
          this.editarItem.editar = false;
        }
      }
    );
  }

  private verificacoes(): boolean {
    let retorno: boolean = true;
    if (this.itemGravar.nomeItem == "" || this.itemGravar.nomeItem.length < 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_G.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_NOME_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.pecaItem == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_PECA_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.marcaItem == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_MARCA_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.modeloItem == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_MODELO_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.fornecedorItem == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_FORNECEDOR_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.categoriaItem == "0") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CATEGORIA_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.precoCustoItem <= 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_G.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_PRECO_CUSTO_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.precoVendaItem <= 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_G.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_PRECO_VENDA_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.margenLucroItem < 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_G.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_LUCRO_PECA_PRODUTO_VASIO
      )
      retorno = false;
    } else if (this.itemGravar.estoqueItem <= 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_ESTOQUE_PRODUTO_VASIO
      )
      retorno = false;
    }
    return retorno;
  }
}
