import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AvisoErroComponent } from '../../components/aviso-erro/aviso-erro.component';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  constructor(
    private dialog: MatDialog,

  ) { }

  /**
   * Cria caixas de dialogos na tela, para avisos, erros e etc...
   * 
   * @param tamWidth Inteiro Deve ser fornecido a largora que este dialogo vai ter.
   * @param tamHeight Inteiro Deve ser fornecido a altura que o dialogo vai ter.
   * @param tipo  String Deve ser buscado através do arquivo de constantes o tipo de menssagem.
   * @param menssagem  String Deve ser fornecido a mensagem a ser passada ao usuário.
   */
  public createDialog(tamWidth: number, tamHeight: number, tipo: string, menssagem: string): void {
    if (document.getElementById("alertaErroAviso") === null) {

      const dialogRef = this.dialog.open(AvisoErroComponent, {
        id: 'alertaErroAviso',
        width: tamWidth.toString() + 'px',
        height: tamHeight.toString() + 'px',
        data: { tituloMenssagem: tipo, menssagem: menssagem }
      })

      dialogRef.afterClosed().subscribe(result => {
        //this.loadData();
      })
    }
  }

}
