import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  tituloMenssagem: string;
  menssagem: string;
}

@Component({
  selector: 'app-aviso-erro',
  templateUrl: './aviso-erro.component.html',
  styleUrls: ['./aviso-erro.component.css']
})
export class AvisoErroComponent implements OnInit {

  public tituloMenssagem;
  public menssagem;

  constructor(
    public dialogRef: MatDialogRef<AvisoErroComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: DialogData

  ) { }

  ngOnInit() {
    this.tituloMenssagem = this.data.tituloMenssagem;
    this.menssagem = this.data.menssagem;
  }

}
