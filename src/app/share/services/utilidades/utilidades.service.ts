import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilidadesService {

  constructor() { }

  /**
     * Formata campo Cep e remove tudo o que não for número!
     *    Ex: xx.xxx.xxx
     *    Ex: 12345678 => 12.345.678
     *    Ex: 1q2w3e4r5t6y7u8i => 12.345.678
     * 
     * @param numero A string completa para remover letras e caracteres e retornar número de cep formatado.
     * 
     * @returns String - Ex: xx.xxx.xxx
     */
  static maskCep(numero: string): string {
    const numeros: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let valorCorreto: String[] = [];
    let retorno: string = "";
    let numeroArray = numero.split(''); // Divide todoa os caracteres da string.
    numeroArray.forEach(caracter => {   // Remove tudo que não for número, e formata como telefone.
      numeros.forEach(num => {
        if (caracter == num) {
          if (valorCorreto.length == 2) {
            valorCorreto.push(".");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 6) {
            valorCorreto.push(".");
            valorCorreto.push(caracter);
          } else {
            valorCorreto.push(caracter);
          }
        };
      });
    });
    valorCorreto.forEach(caracter => {
      retorno = retorno + caracter;
    });
    return retorno;
  }

  /**
     * Formata campo Cnpj e remove tudo o que não for número!
     *    Ex: xx.xxx.xxx/xxxx-xx
     * 
     *    Ex: 12345678901234 => 12.345.678/9012-34
     *    Ex: 1q2w3e4r5t6y7u8i9o0p1q2w3e4r => 12.345.678/9012-34
     * 
     * @param numero A string completa para remover letras e caracteres e retornar número de cnpj formatado.
     * 
     * @returns String - Ex: xx.xxx.xxx/xxxx-xx
     */
  static maskCnpj(numero: string): string {
    const numeros: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let valorCorreto: String[] = [];
    let retorno: string = "";
    let numeroArray = numero.split(''); // Divide todoa os caracteres da string.
    numeroArray.forEach(caracter => {   // Remove tudo que não for número, e formata como telefone.
      numeros.forEach(num => {
        if (caracter == num) {
          if (valorCorreto.length == 2) {
            valorCorreto.push(".");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 6) {
            valorCorreto.push(".");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 10) {
            valorCorreto.push("/");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 15) {
            valorCorreto.push("-");
            valorCorreto.push(caracter);
          } else {
            valorCorreto.push(caracter);
          }
        };
      });
    });
    valorCorreto.forEach(caracter => {
      retorno = retorno + caracter;
    });
    return retorno;
  }

  /**
     * Formata campo Cpf e remove tudo o que não for número!
     *    Ex: 55987564312 => 559.875.643-12
     *    Ex: ad98756tr43ad45gdfg5ggdfg4 => 987.564.345-54
     * 
     * @param numero A string completa para remover letras e caracteres e retornar número de cpf formatado.
     * 
     * @returns String - Ex: 559.875.643-12
     */
  static maskCpf(numero: string): string {
    const numeros: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let valorCorreto: String[] = [];
    let retorno: string = "";
    let numeroArray = numero.split(''); // Divide todoa os caracteres da string.
    numeroArray.forEach(caracter => {   // Remove tudo que não for número, e formata como telefone.
      numeros.forEach(num => {
        if (caracter == num) {
          if (valorCorreto.length == 3) {
            valorCorreto.push(".");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 7) {
            valorCorreto.push(".");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 11) {
            valorCorreto.push("-");
            valorCorreto.push(caracter);
          } else {
            valorCorreto.push(caracter);
          }
        };
      });
    });
    valorCorreto.forEach(caracter => {
      retorno = retorno + caracter;
    });
    return retorno;
  }

  /**
     * Formata campo telefone e remove tudo o que não for número!
     *    Ex: 55987564312 => (55) 98756-4312
     *    Ex: ad98756tr43ad45gdfg5ggdfg4 => (98) 75643-4554
     * 
     * @param numero A string completa para remover letras e caracteres e retornar número de telefone formatado.
     * 
     * @returns String - Ex: (55) 98756-4312
     */
  static maskTelefone(numero: string): string {
    const numeros: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let valorCorreto: String[] = [];
    let retorno: string = "";
    let numeroArray = numero.split(''); // Divide todoa os caracteres da string.
    numeroArray.forEach(caracter => {   // Remove tudo que não for número, e formata como telefone.
      numeros.forEach(num => {
        if (caracter == num) {
          if (valorCorreto.length == 0) {
            valorCorreto.push("(");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 3) {
            valorCorreto.push(") ");
            valorCorreto.push(caracter);
          } else if (valorCorreto.length == 9) {
            valorCorreto.push("-");
            valorCorreto.push(caracter);
          } else {
            valorCorreto.push(caracter);
          }
        };
      });
    });
    valorCorreto.forEach(caracter => {
      retorno = retorno + caracter;
    });
    return retorno;
  }

  /**
   * Remove tudo o que não for numero inteiro!
   *    Ex: 1q2w3e4r5t6y7u8i9o0p => 1234567890
   *    Ex: 1!2@3#4$5%6¨7&8*9(0) => 1234567890
   * 
   * @param valor string Remove todo tipo de caracter, deixando apenas numeros.
   * @returns string - Ex: 123456789
   */
  static removeTudoNaoNumero(valor: string): string {
    const numeros: String[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let retorno: string = "";
    // Divide todoa os caracteres da string.
    let numeroArray = valor.split(''); 
    // Remove tudo que não for número.
    numeroArray.forEach(caracter => {
      numeros.forEach(num => {
        if (caracter == num) { retorno = retorno + caracter; }
      });
    });
    return retorno;
  }
}
