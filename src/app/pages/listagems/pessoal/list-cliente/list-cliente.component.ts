import { EmissorEventosService } from './../../../../share/services/emissorEventos/emissor-eventos.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { DeleteDadosDatabaseService, ReadDadosDatabaseService, AvisoService, ConstantesService } from 'src/app/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css'],
  animations: [
    trigger('inicializaList', [
      transition('void => *', [
        style({ transform: 'translateY(5%)'}),
        animate(90)
      ])
    ])
  ]
})
export class ListClienteComponent implements OnInit {
  private configFuncoesBasicas = {
    tipoItem: this.CONSTS.PESSOAS.CLIENTE,
    rota: '/pages/cadastros/pessoal/cadcliente/'
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
        let cont = 0;
        console.log(data)
        this.itemdoBanco = data
        this.itemdoBanco.forEach(item => {
          try {
          item.numVendas = data[cont].vendas.lenght;
          } catch { item.numVendas = 0 }
          cont++;
        });
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
