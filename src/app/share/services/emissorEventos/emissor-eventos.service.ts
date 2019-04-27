import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmissorEventosService {

  static loadBar = new EventEmitter<boolean>();

  constructor() { }
}
