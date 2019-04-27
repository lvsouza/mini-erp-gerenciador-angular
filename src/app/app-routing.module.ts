import { AguardeComponent } from './pages/mais/aguarde/aguarde.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ListDespesasFuncionarioComponent,
  ListDespesasFornecedorComponent,
  CadDespesaFuncionarioComponent,
  CadDespesaFornecedorComponent,
  PaginaNaoEncontradaComponent,
  ListDespesaGeralComponent,
  ListFuncionarioComponent,
  CadDespesaGeralComponent,
  CadFuncionarioComponent,
  ListFornecedorComponent,
  ListCategoriaComponent,
  CadFornecedorComponent,
  ContaEmpresaComponent,
  CadCategoriaComponent,
  ConfiguracaoComponent,
  ListComissaoComponent,
  ListClienteComponent,
  CadComissaoComponent,
  ListProdutoComponent,
  CadClienteComponent,
  CadProdutoComponent,
  ListModeloComponent,
  CadModeloComponent,
  ListMarcaComponent,
  DashboardComponent,
  ListCargoComponent,
  ListVendaComponent,
  CadCargoComponent,
  CadMarcaComponent,
  ListPecaComponent,
  CadVendaComponent,
  CadPecaComponent,
  LoginComponent,
  ContaComponent,
  SobreComponent,

} from './pages';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/mais/aguarde',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'pages/mais/aguarde',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    redirectTo: 'pages/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'pages/dashboard',
    component: DashboardComponent,
    pathMatch: 'full',
  },

  //Contas ------------------------------------------------- gerenciamento de contas ------------------------------------------------
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/minhaconta',
    component: ContaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/contaempresa',
    component: ContaEmpresaComponent,
    pathMatch: 'full',
  },

  //Produtos ------------------------------------------------- Cadastros ------------------------------------------------
  //---------------------------------------------------------------------------------------------------------------------
  {
    path: 'pages/cadastros',
    redirectTo: 'pages/cadastros/produtos/cadproduto',
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos',
    redirectTo: 'pages/cadastros/produtos/cadproduto',
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadproduto',
    component: CadProdutoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadproduto/:id',
    component: CadProdutoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadcategoria',
    component: CadCategoriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadcategoria/:id',
    component: CadCategoriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadmodelo',
    component: CadModeloComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadmodelo/:id',
    component: CadModeloComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadmarca',
    component: CadMarcaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadmarca/:id',
    component: CadMarcaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadpeca',
    component: CadPecaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos/cadpeca/:id',
    component: CadPecaComponent,
    pathMatch: 'full',
  },

  //Pessoal --
  {
    path: 'pages/cadastros/pessoal/cadcliente',
    component: CadClienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadcliente/:id',
    component: CadClienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadfuncionario',
    component: CadFuncionarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadfuncionario/:id',
    component: CadFuncionarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadfornecedor',
    component: CadFornecedorComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadfornecedor/:id',
    component: CadFornecedorComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadcargo',
    component: CadCargoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/pessoal/cadcargo/:id',
    component: CadCargoComponent,
    pathMatch: 'full',
  },

  //Transações --
  {
    path: 'pages/cadastros/transacoes/cadvenda',
    component: CadVendaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/cadvenda/:id',
    component: CadVendaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/cadcomissao',
    component: CadComissaoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/cadcomissao/:id',
    component: CadComissaoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/caddespesageral',
    component: CadDespesaGeralComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/caddespesageral/:id',
    component: CadDespesaGeralComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/caddespesafuncionario',
    component: CadDespesaFuncionarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/caddespesafuncionario/:id',
    component: CadDespesaFuncionarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/caddespesafornecedor',
    component: CadDespesaFornecedorComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/transacoes/caddespesafornecedor/:id',
    component: CadDespesaFornecedorComponent,
    pathMatch: 'full',
  },



  //Produtos ------------------------------------------------- Lists ------------------------------------------------
  {
    path: 'pages/listagems',
    redirectTo: 'pages/listagems/produtos/listproduto',
    pathMatch: 'full',
  },
  {
    path: 'pages/cadastros/produtos',
    redirectTo: 'pages/listagems/produtos/listproduto',
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/produtos/listproduto',
    component: ListProdutoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/produtos/listcategoria',
    component: ListCategoriaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/produtos/listmodelo',
    component: ListModeloComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/produtos/listmarca',
    component: ListMarcaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/produtos/listpeca',
    component: ListPecaComponent,
    pathMatch: 'full',
  },

  //Pessoal --
  {
    path: 'pages/listagems/pessoal/listcliente',
    component: ListClienteComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/pessoal/listfuncionario',
    component: ListFuncionarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/pessoal/listfornecedor',
    component: ListFornecedorComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/pessoal/listcargo',
    component: ListCargoComponent,
    pathMatch: 'full',
  },

  //Transações --
  {
    path: 'pages/listagems/transacoes/listvenda',
    component: ListVendaComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/transacoes/listcomissao',
    component: ListComissaoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/transacoes/listdespesageral',
    component: ListDespesaGeralComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/transacoes/listdespesafuncionario',
    component: ListDespesasFuncionarioComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/listagems/transacoes/listdespesafornecedor',
    component: ListDespesasFornecedorComponent,
    pathMatch: 'full',
  },


  //Mais ------------------------------------------------- Mais ------------------------------------------------
  {
    path: 'pages/mais/configuracao',
    component: ConfiguracaoComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/mais/sobre',
    component: SobreComponent,
    pathMatch: 'full',
  },
  {
    path: 'pages/mais/aguarde',
    component: AguardeComponent,
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
    pathMatch: 'full',
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
