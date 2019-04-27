import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantesService } from '../CONSTANTS';
import { AvisoService } from '../avisoPopup';
import { EmissorEventosService } from '../emissorEventos';

@Injectable({
  providedIn: 'root'
})
export class ReadDadosDatabaseService {

  constructor(
    private http: HttpClient,
    private CONSTS: ConstantesService,
    private avisoService: AvisoService,

  ) { }

/**
   * Faz o load dos dados pelo id no banco.
   *
   * @param tipoItem string Recebe um valor prédefinido nas constantes.
   * @param idItem number Recebe o valor do id do item a ser consultado.
   *
   * @return Retorna um Observable. (Usar subscribe)
   */
  public carregaDadosById(tipoItem: string, idItem: number) {
    EmissorEventosService.loadBar.emit(true);
    return  this.http.get<any>(this.CONSTS.URI + tipoItem + '/' + idItem);
  }

  /**
   * Faz o load dos dados do banco.
   *
   * @param consulta string Recebe um valor prédefinido nas constantes.
   *
   * @return Retorna um Observable. (Usar subscribe)
   */
  public carregaDados(consulta: string): any {
    EmissorEventosService.loadBar.emit(true);
    return  this.http.get(this.CONSTS.URI + consulta);
  }
}
