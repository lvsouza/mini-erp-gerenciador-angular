import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../CONSTANTS';
import { EmissorEventosService } from '../emissorEventos';

@Injectable({
  providedIn: 'root'
})
export class PostDatabaseService {

  constructor(
    private http: HttpClient,
    private CONSTS: ConstantesService,

  ) { }

  /**
   * Faz a inserção de um novo usuário no banco de dados.
   *
   * @param item_a_Inserir Recebe um novo objeto para inserir no banco de dados.
   * @param tipoItem Deve ser passado constante com o tipo de objeto a inserir no banco.
   *
   * @return Retorna um Observable ou uma string em caso de erro com constante..
   */
  public gravaDados(item_a_Inserir: any, tipoItem: string) {
    EmissorEventosService.loadBar.emit(true);
    var resultado;
    //Produtos
    if (tipoItem === this.CONSTS.PRODUTOS.PRODUTO) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.PECA) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.MODELO) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.MARCA) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.CATEGORIA) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    }
    //Pessoas
    else if (tipoItem === this.CONSTS.PESSOAS.CARGO) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PESSOAS.CLIENTE) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PESSOAS.FORNECEDOR) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PESSOAS.FUNCIONARIO) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    }
    //Outros
    else if (tipoItem === this.CONSTS.OUTROS.COMISSAO) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.OUTROS.VENDA) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    }
    //Despesas
    else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_FORNECEDOR) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_FUNCIONARIO) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_GERAL) {
      resultado = this.http.post(this.CONSTS.URI + tipoItem, item_a_Inserir);
    }
    //Caso de erro.
    else {
      resultado = "Sertifique de ter passado a constante certa.";
    }
    return resultado;
  }


}
