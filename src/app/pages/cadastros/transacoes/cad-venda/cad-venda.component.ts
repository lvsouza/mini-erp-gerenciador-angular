import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService } from 'src/app/share/services/readDatabase/read-dados-database.service';
import { PostDatabaseService } from 'src/app/share/services/postDatabase/post-database.service';
import { UpdateDatabaseService } from 'src/app/share/services/updateDatabase';
import { ActivatedRoute, Router } from '@angular/router';
import { ConstantesService } from 'src/app/share/services/CONSTANTS/constantes.service';
import { AvisoService } from 'src/app/share/services/avisoPopup/aviso.service';

@Component({
  selector: 'app-cad-venda',
  templateUrl: './cad-venda.component.html',
  styleUrls: ['./cad-venda.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadVendaComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.OUTROS.VENDA,
    rota: 'pages/listagems/transacoes/listvenda'
  }

  public item: any = {
    valorUnitario: 0,
    qtdComprada: 0,
    totalSemDesconto: 0,
    porcentagemDesconto: 0,
    totalComDesconto: 0,
    selectProduto: [
      {
        idProduto: 0,
        qtdComprada: 1,
        produto: [],
      },
    ],
    selectVendedor: 0,
    selectCliente: 0,
  };

  public resSelect = {
    selectProdutos: [],
    selectVendedores: [],
    selectClientes: [],
  }

  public serverAtual = this.CONSTS.OUTROS.SERVIDOR_ATUAL;
  
  constructor(
    private readDados: ReadDadosDatabaseService,
    private postDados: PostDatabaseService,
    private CONSTS: ConstantesService,
    private avisoErro: AvisoService,
    private router: Router,

  ) {
    this.inicializaSelects();
  }

  ngOnInit() {
  }

  public salvarItem() { // Esta dando um erro com  subscriber
    if (this.validacoes()) {
      let idVenda;
      let item = {
        IdVendedor: this.item.selectVendedor,
        IdCliente: this.item.selectCliente,
        TotalSemDesconto: this.item.totalSemDesconto,
        PorcentoDesconto: this.item.porcentagemDesconto,
        TotalComDesconto: this.item.totalComDesconto,
        Ligacoes: []
      }

      let vendaLigacoes = {
        VendaFeita: {
          IdVendedor: item.IdVendedor,
          IdCliente: item.IdCliente,
          TotalSemDesconto: item.TotalSemDesconto,
          PorcentoDesconto: item.PorcentoDesconto,
          TotalComDesconto: item.TotalComDesconto,
        },
        Ligacoes: []
      }

      this.item.selectProduto.forEach(prod => {
        let ligacaoEntreProdVen = {
          produtoId: Number(prod.idProduto),
          vendaId: idVenda,
          qtdProdVendidos: prod.qtdComprada,
        };
        vendaLigacoes.Ligacoes.push(ligacaoEntreProdVen);
      });

      this.postDados.gravaDados(vendaLigacoes, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
        data => {
          this.avisoErro.createDialog(
            this.CONSTS.AVISO.SIZES.SIZE_P.WIDTH,
            this.CONSTS.AVISO.SIZES.SIZE_P.HEIGHT,
            this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
            this.CONSTS.AVISO.MSGS.AVISO_CADASTRADO_OK,
          );
          EmissorEventosService.loadBar.emit(false);
          this.router.navigate(['/pages/listagems/transacoes/listvenda']);
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

  public revisaValorTotal() {
    let totalSemDesconto = 0;
    let totalComDesconto = 0;

    this.item.selectProduto.forEach(prod => {
      if (prod.idProduto !== 0) {
        this.resSelect.selectProdutos.forEach(produto => {
          if (produto.id == prod.idProduto) {
            prod.produto = produto;
          }
        });
        totalSemDesconto += (prod.produto.precoVenda * prod.qtdComprada);

        if (prod.porcentagemDesconto != 0) {
          totalComDesconto += totalSemDesconto - (totalSemDesconto * this.item.porcentagemDesconto) / 100;
        } else {
          totalComDesconto = totalSemDesconto;
        }
      }
    });

    this.item.totalSemDesconto = Number(totalSemDesconto);
    this.item.totalComDesconto = Number(totalComDesconto);
  }

  public inicializaSelects() {
    this.readDados.carregaDados(this.CONSTS.PRODUTOS.PRODUTO).subscribe(data => { this.resSelect.selectProdutos = data; console.log(data) });
    this.readDados.carregaDados(this.CONSTS.PESSOAS.CLIENTE).subscribe(data => { this.resSelect.selectClientes = data });
    this.readDados.carregaDados(this.CONSTS.PESSOAS.FUNCIONARIO).subscribe(
      data => {
        this.resSelect.selectVendedores = data;
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

  public removeProduto(item) {
    this.item.selectProduto.splice(item, 1);
    if (this.item.selectProduto.length == 0) {
      this.adicionaProduto();
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_AO_MENOS_UM_PRODUTO,
      );
    }
    this.revisaValorTotal();
  }

  public adicionaProduto() {
    if (this.item.selectProduto.length < this.resSelect.selectProdutos.length) {
      this.item.selectProduto.push({ idProduto: 0, qtdComprada: 1, produto: [] });
    } else {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_SEM_MAIS_PRODUTOS,
      );
    }
    this.revisaValorTotal();
  }

  private validacoes(): boolean {
    let verificaProdutosVasios = true;
    let estoquePequeno = false;

    if (this.item.selectVendedor == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_SELECIONE_VENDEDOR,
      );
      return false;
    } else if (this.item.selectCliente == 0) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_SELECIONE_CLIENTE,
      );
      return false;
    }

    this.item.selectProduto.forEach(prod => {
      let contProdutosIguais = 0;
      if (prod.idProduto == "0" || prod.idProduto == 0) { // Verifica se alguma campo de produto está vasio.
        this.avisoErro.createDialog(
          this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
          this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
          this.CONSTS.AVISO.MSGS.AVISO_CAMPO_PRODUTO_VASIO,
        );
        verificaProdutosVasios = false;
      }

      this.item.selectProduto.forEach(testProd => { // Verifica se os produtos são iguais, e impede se forem iguais.
        if (prod.idProduto == testProd.idProduto) {
          contProdutosIguais++;
        }
      });

      if (prod.produto.estoqueAtual < prod.qtdComprada) {
        this.avisoErro.createDialog(
          this.CONSTS.AVISO.SIZES.SIZE_G.WIDTH,
          this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
          this.CONSTS.AVISO.MSGS.AVISO_PRODUTO_ESTOQUE_PEQUENO,
        );
        verificaProdutosVasios = false;
      }

      if (contProdutosIguais != 1 && verificaProdutosVasios == true) {
        this.avisoErro.createDialog(
          this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
          this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
          this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
          this.CONSTS.AVISO.MSGS.AVISO_PRODUTO_IGUAL,
        );
        verificaProdutosVasios = false;
      }

    });
    return verificaProdutosVasios;
  }

}
