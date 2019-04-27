import { Usuario, LoginService } from 'src/app/share';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css'],
  animations: [
    trigger('inicializaConta', [
      transition('void => *', [
        style({ transform: 'translateY(5%)' }),
        animate(90)
      ])
    ])
  ]
})
export class ContaComponent implements OnInit {
  public user: Usuario;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.user = this.loginService.informacoesUserLogado();
  }

}
