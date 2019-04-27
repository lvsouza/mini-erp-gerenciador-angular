import { EmissorEventosService } from './../../share/services/emissorEventos/emissor-eventos.service';
import { AvisoService, ConstantesService, ReadDadosDatabaseService, LoginService } from './../../share/services';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('inicializaDash', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})

export class DashboardComponent implements OnInit {

  public indicadoresStatus = {
    'produtos': {
      'produtos': [],
      'marcas': [],
      'categorias': [],
      'pecas': [],
      'modelos': [],
    },
    'pessoas': {
      'clientes': [],
      'funcionarios': [],
      'fornecedores': [],
      'cargos': [],
    },
    'transacao': {
      'despGerais': [],
      'despFornecedores': [],
      'despFuncionarios': [],
      'comissoes': [],
      'vendas': [],
    },
  }

  constructor(
    private readDadosService: ReadDadosDatabaseService,
    private avisoService: AvisoService,
    private CONTS: ConstantesService,
    private router: Router,
    private loginService: LoginService,
    private CONSTANTES: ConstantesService,

  ) {
    this.tryLogin();
  }

  ngOnInit() {
    this.consultaDadosDash();
  }

  private avisaErroConexao() {
    this.avisoService.createDialog(this.CONTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONTS.AVISO.TIPOERROAVISO.ERRO, this.CONTS.AVISO.MSGS.ERRO_SERVIDOR);
  }

  private consultaDadosDash() {
    this.readDadosService.carregaDados(this.CONTS.DESPESAS.DESPESA_FUNCIONARIO).subscribe(d => { this.indicadoresStatus.transacao.despFuncionarios = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.DESPESAS.DESPESA_FORNECEDOR).subscribe(d => { this.indicadoresStatus.transacao.despFornecedores = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.DESPESAS.DESPESA_GERAL).subscribe(d => { this.indicadoresStatus.transacao.despGerais = d as any[] }, error => this.avisaErroConexao());

    this.readDadosService.carregaDados(this.CONTS.PESSOAS.FUNCIONARIO).subscribe(d => { this.indicadoresStatus.pessoas.funcionarios = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PESSOAS.FORNECEDOR).subscribe(d => { this.indicadoresStatus.pessoas.fornecedores = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PESSOAS.CLIENTE).subscribe(d => { this.indicadoresStatus.pessoas.clientes = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PESSOAS.CARGO).subscribe(d => { this.indicadoresStatus.pessoas.cargos = d as any[] }, error => this.avisaErroConexao());

    this.readDadosService.carregaDados(this.CONTS.PRODUTOS.CATEGORIA).subscribe(d => { this.indicadoresStatus.produtos.categorias = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PRODUTOS.PRODUTO).subscribe(d => { this.indicadoresStatus.produtos.produtos = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PRODUTOS.MODELO).subscribe(d => { this.indicadoresStatus.produtos.modelos = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PRODUTOS.MARCA).subscribe(d => { this.indicadoresStatus.produtos.marcas = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.PRODUTOS.PECA).subscribe(d => { this.indicadoresStatus.produtos.pecas = d as any[] }, error => this.avisaErroConexao());

    this.readDadosService.carregaDados(this.CONTS.OUTROS.COMISSAO).subscribe(d => { this.indicadoresStatus.transacao.comissoes = d as any[] }, error => this.avisaErroConexao());
    this.readDadosService.carregaDados(this.CONTS.OUTROS.VENDA).subscribe(d => { this.indicadoresStatus.transacao.vendas = d as any[]; EmissorEventosService.loadBar.emit(false); }, error => {this.avisaErroConexao(); EmissorEventosService.loadBar.emit(false);});
  }

  private tryLogin() {
    this.loginService.verificaEstaLogado().subscribe(
      (data: boolean) => {
        if (data == false) {
          this.router.navigate(['/login']);
          location.reload();
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
