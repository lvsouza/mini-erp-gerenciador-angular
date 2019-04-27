import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReadDadosDatabaseService, PostDatabaseService, UpdateDatabaseService, ConstantesService, AvisoService, EmissorEventosService } from 'src/app/share';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cad-cargo',
  templateUrl: './cad-cargo.component.html',
  styleUrls: ['./cad-cargo.component.css'],
  animations: [
    trigger('inicializaCad', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class CadCargoComponent implements OnInit {
  private configFuncoesBasicas = {
    tipo_ser_salvo: this.CONSTS.PESSOAS.CARGO,
    rota: 'pages/listagems/pessoal/listcargo'
  }

  private editarItem: any = {
    editar: false,
    id: 0
  }

  public item = {
    nomeItem: "",
    descricaoItem: ""
  };

  constructor(
    private readDados: ReadDadosDatabaseService,
    private postDados: PostDatabaseService,
    private updateDados: UpdateDatabaseService,
    private activeRouter: ActivatedRoute,
    private CONSTS: ConstantesService,
    private avisoErro: AvisoService,
    private router: Router,

  ) {
    this.verificaEditar();
  }

  ngOnInit() {
  }

  public salvarItem() {
    if (this.editarItem.editar === false) {
      this.salvaNovoItem();
    } else if (this.editarItem.editar === true) {
      this.salvaItemExistente();
    }
  }

  private salvaNovoItem() {
    if (this.validacoes()) {
      let item = {
        nome: this.item.nomeItem,
        descricao: this.item.descricaoItem
      }
      this.postDados.gravaDados(item, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
        data => {
          this.router.navigate([this.configFuncoesBasicas.rota]);
        }, error => {
          this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
          this.router.navigate([this.configFuncoesBasicas.rota]);
        }
      );
    }
  }

  private salvaItemExistente() {
    if (this.validacoes()) {
      let item = {
        id: this.editarItem.id,
        nome: this.item.nomeItem,
        descricao: this.item.descricaoItem
      }
      this.updateDados.atualizaDados(item, this.editarItem.id, this.configFuncoesBasicas.tipo_ser_salvo).subscribe(
        data => {
          console.log(data)
          this.router.navigate([this.configFuncoesBasicas.rota]);
        }, error => {
          this.avisoErro.createDialog(this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH, this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT, this.CONSTS.AVISO.TIPOERROAVISO.ERRO, this.CONSTS.AVISO.MSGS.ERRO_SERVIDOR)
          this.router.navigate([this.configFuncoesBasicas.rota]);
        }
      );
    }
  }

  private validacoes(): boolean {
    if (this.item.nomeItem == undefined || this.item.nomeItem == "") {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CARGO_VASIO
      )
      return false;
    } else if (this.item.nomeItem.length <= 3) {
      this.avisoErro.createDialog(
        this.CONSTS.AVISO.SIZES.SIZE_M.WIDTH,
        this.CONSTS.AVISO.SIZES.SIZE_M.HEIGHT,
        this.CONSTS.AVISO.TIPOERROAVISO.AVISO,
        this.CONSTS.AVISO.MSGS.AVISO_CAMPO_CARGO_MENOR_3
      )
      return false;
    } else {
      return true;
    }
  }

  private verificaEditar() {
    this.activeRouter.params.subscribe(
      res => {
        if (res.id != undefined) {
          this.editarItem.editar = true;
          this.editarItem.id = res.id;
          this.readDados.carregaDadosById(this.configFuncoesBasicas.tipo_ser_salvo, res.id).subscribe(
            data => {
              this.item.nomeItem = data.nome;
              this.item.descricaoItem = data.descricao;
              EmissorEventosService.loadBar.emit(false);
            }
          );
        } else {
          this.editarItem.editar = false;
        }
      }
    );
  }
}
