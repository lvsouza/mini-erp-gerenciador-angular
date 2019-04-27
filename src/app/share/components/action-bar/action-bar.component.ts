import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../services/loginContas';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css']
})
export class ActionBarComponent implements OnInit {
  public informacoesLogin: any;

  constructor(
    private loginService: LoginService,

  ) { }

  ngOnInit() {
    this.informacoesLogin = this.loginService.informacoesUserLogado();
  }

  encerraLogin() {
    this.loginService.encerraLogin();
  }

}
