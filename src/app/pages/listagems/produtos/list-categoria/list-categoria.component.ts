import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, DeleteDadosDatabaseService, ConstantesService, AvisoService } from 'src/app/share';

@Component({
  selector: 'app-list-categoria',
  templateUrl: './list-categoria.component.html',
  styleUrls: ['./list-categoria.component.css'],
  animations: [
    trigger('inicializaList', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class ListCategoriaComponent implements OnInit {
  private configFuncoesBasicas = {
    tipoItem: this.CONSTS.PRODUTOS.CATEGORIA,
    rota: '/pages/cadastros/produtos/cadcategoria/'
  }
  public itemdoBanco = [];

  constructor(
    private deleteDados: DeleteDadosDatabaseService,
    private readDados: ReadDadosDatabaseService,
    private avisoService: AvisoService,
    private CONSTS: ConstantesService,
    private route: Router,
  ) { }

  ngOnInit() {
    this.carregaListaItens();
  }

  public editarItem(idItem) {
    this.route.navigate([this.configFuncoesBasicas.rota + idItem])
  }

  public daletarItem(id) {
    this.deleteDados.deleteDados(this.configFuncoesBasicas.tipoItem, id).subscribe(
      data => {
        this.carregaListaItens();
        EmissorEventosService.loadBar.emit(false);
      }, error => {
        this.avisaErroConexao();
        EmissorEventosService.loadBar.emit(false);
      }
    );
  }

  private carregaListaItens() {
    this.readDados.carregaDados(this.configFuncoesBasicas.tipoItem).subscribe(
      data => {
        this.itemdoBanco = data;
        EmissorEventosService.loadBar.emit(false);
      }, error => {
        this.avisaErroConexao();
        EmissorEventosService.loadBar.emit(false);
      }
    )
  }

  private avisaErroConexao() {
    this.avisoService.createDialog(450, 150, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
  }
}
