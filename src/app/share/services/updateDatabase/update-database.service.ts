import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../CONSTANTS';
import { EmissorEventosService } from '../emissorEventos';

@Injectable({
  providedIn: 'root'
})
export class UpdateDatabaseService {

  constructor(
    private http: HttpClient,
    private CONSTS: ConstantesService,

  ) { }

  /**
   * Faz a inserção de um novo usuário no banco de dados.
   *
   * @param item_a_Inserir any Recebe um novo objeto para inserir no banco de dados.
   * @param tipoItem string Deve ser passado constante com o tipo de objeto a inserir no banco.
   * @param idItem number Deve ser passado o id do item que será atualizado.
   *
   * @return Retorna um Observable (Usar um subscriber) ou uma string em caso de erro com constante..
   */
  public atualizaDados(item_a_Inserir: any, idItem: number, tipoItem: string): any {
    EmissorEventosService.loadBar.emit(true);
    var resultado;
    //Produtos
    if (tipoItem === this.CONSTS.PRODUTOS.PRODUTO) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.PECA) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.MODELO) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.MARCA) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PRODUTOS.CATEGORIA) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    }
    //Pessoas
    else if (tipoItem === this.CONSTS.PESSOAS.CARGO) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PESSOAS.CLIENTE) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PESSOAS.FORNECEDOR) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.PESSOAS.FUNCIONARIO) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    }
    //Outros
    else if (tipoItem === this.CONSTS.OUTROS.COMISSAO) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.OUTROS.VENDA) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    }
    //Despesas
    else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_FORNECEDOR) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_FUNCIONARIO) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    } else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_GERAL) {
      resultado = this.http.put(this.CONSTS.URI + tipoItem +'/' + idItem, item_a_Inserir);
    }
    //Caso de erro.
    else {
      resultado = "Sertifique de ter passado a constante certa.";
    }

    return resultado;
  }
}
