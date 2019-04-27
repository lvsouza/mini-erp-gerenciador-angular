import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../CONSTANTS';
import { EmissorEventosService } from '../emissorEventos';

@Injectable({
  providedIn: 'root'
})
export class DeleteDadosDatabaseService {

  constructor(
    private http: HttpClient,
    private CONSTS: ConstantesService,

  ) {
    //var teste = this.carregaDados(this.CONSTS.PRODUTOS.PECA);

  }

  /**
   * Exclui o item pelo id passado.
   *
   * @param idItem number Recebe o valordo id referente ao item a ser excluido.
   * @param tipoItem string Recebe um valor prédefinido nas constantes. Refere-se ao tipo de item a ser excuido.
   *
   * @return Retorna um Observable.
   */
  public deleteDados(tipoItem: string, idItem: number) {
    if (confirm("Tem certeza que deseja realmente excuir PERMANENTEMENTE isso?")) {
      EmissorEventosService.loadBar.emit(true);
      var resultado;
      //Produtos
      if (tipoItem === this.CONSTS.PRODUTOS.PRODUTO) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PRODUTOS.PECA) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PRODUTOS.MODELO) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PRODUTOS.MARCA) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PRODUTOS.CATEGORIA) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      }
      //Pessoas
      else if (tipoItem === this.CONSTS.PESSOAS.CARGO) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PESSOAS.CLIENTE) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PESSOAS.FORNECEDOR) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.PESSOAS.FUNCIONARIO) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      }
      //Outros
      else if (tipoItem === this.CONSTS.OUTROS.COMISSAO) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.OUTROS.VENDA) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      }
      //Despesas
      else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_FORNECEDOR) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_FUNCIONARIO) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      } else if (tipoItem === this.CONSTS.DESPESAS.DESPESA_GERAL) {
        resultado = this.http.delete(this.CONSTS.URI + tipoItem + "/" + idItem);
      }
      //Caso de erro.
      else {
        resultado = "Sertifique de ter passado a constante certa.";
      }
    } else {

    }

    return resultado;
  }
}
