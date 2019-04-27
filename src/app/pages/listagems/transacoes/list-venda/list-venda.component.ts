import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeleteDadosDatabaseService, ReadDadosDatabaseService, AvisoService, ConstantesService } from 'src/app/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-venda',
  templateUrl: './list-venda.component.html',
  styleUrls: ['./list-venda.component.css'],
  animations: [
    trigger('inicializaList', [
      transition('void => *', [
        style({ transform: 'translateY(5%)'}),
        animate(90)
      ])
    ])
  ]
})
export class ListVendaComponent implements OnInit {
  private configFuncoesBasicas = {
    tipoItem: this.CONSTS.OUTROS.VENDA,
    rota: '/pages/cadastros/transacoes/cadvenda'
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
    this.route.navigate([this.configFuncoesBasicas.rota + "/" + idItem])
  }

  public daletarItem(id) {
    this.deleteDados.deleteDados(this.configFuncoesBasicas.tipoItem, id).subscribe(
      data => {
        this.carregaListaItens();
        EmissorEventosService.loadBar.emit(false);
      }, error => {
        this.avisaErroConexao()
        EmissorEventosService.loadBar.emit(false);
      }
    );
  }

  private formatData(data) {
    let arraydata = data.split('-');
    return arraydata[2] + "-" + arraydata[1] + "-" + arraydata[0];
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
    this.avisoService.createDialog(
      this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
      this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
      this.CONSTS.AVISO.TIPOERROAVISO.ERRO,
      this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR);
  }
}
