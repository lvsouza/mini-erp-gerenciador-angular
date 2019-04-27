import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ConstantesService {
  public URI_VALIDA_TOKEN_USERS_IN_OUTSYSTEMS = 'https://eusoucindy.000webhostapp.com/Outras%20coisas/RelinkOutServer/validaToken.php?';
  public URI_VALIDA_USERS_IN_OUTSYSTEMS = 'https://eusoucindy.000webhostapp.com/Outras%20coisas/RelinkOutServer/validaUsers.php?';
  public URI_CREATE_USERS_IN_OUTSYSTEMS = 'https://eusoucindy.000webhostapp.com/Outras%20coisas/RelinkOutServer/CreateUser.php?';
  public URI_EDITAR_USERS_IN_OUTSYSTEMS = 'https://eusoucindy.000webhostapp.com/Outras%20coisas/RelinkOutServer/editUser.php?';
  public URI_EDITAR_SENHA_IN_OUTSYSTEMS = 'https://eusoucindy.000webhostapp.com/Outras%20coisas/RelinkOutServer/editSenha.php?';
  public URI_GET_USERS_IN_OUTSYSTEMS = 'https://lucas-souza-dev.outsystemscloud.com/ApiErp/rest/UsersERP/getUsers';

  // Uri onde será feita a consulta.
  //public URI = 'http://localhost:5001/api/'; //Com dotnet run
  public URI = 'http://68.183.151.123:5001/api/'; //Com dotnet run no servidor
  //public URI = 'http://192.168.16.29:5001/api/'; //Com dotnet run + ip | gvdasa
  //public URI = 'https://localhost:44352/api/'; // Pelo vstudio

  // Constantes com as urls auxiliares pre definidades
  public readonly PRODUTOS = {
    'CATEGORIA': 'cprodutos/categoria',
    'PRODUTO': 'cprodutos/produto',
    'MODELO': 'cprodutos/modelo',
    'MARCA': 'cprodutos/marca',
    'PECA': 'cprodutos/peca',
  };

  public readonly PESSOAS = {
    'FUNCIONARIO': 'cpessoas/funcionario',
    'FORNECEDOR': 'cpessoas/fornecedor',
    'CLIENTE': 'cpessoas/cliente',
    'CARGO': 'cpessoas/cargo',
  };

  public readonly DESPESAS = {
    'DESPESA_FUNCIONARIO': 'cdespesas/despesafuncionario',
    'DESPESA_FORNECEDOR': 'cdespesas/despesafornecedor',
    'DESPESA_GERAL': 'cdespesas/despesageral',
  };

  public readonly OUTROS = {
    'COMISSAO': 'coutros/comissoes',
    'VENDA': 'coutros/vendas',
    'PRODUTO_LIGA_VENDA': 'coutros/produtovenda',
    //'SERVIDOR_ATUAL': 'http://localhost:4200/#',
    'SERVIDOR_ATUAL': 'http://www.lsouza.tech/Angular/erpLojaInformatica/#',
  };

  public readonly LOCALSTORAGE_KEYS = {
    'ISLOGADO': 'estaLogado',
  };

  public readonly AVISO = {
    'SIZES': {
      'SIZE_P': {
        'WIDTH': 250,
        'HEIGHT': 140
      },
      'SIZE_M': {
        'WIDTH': 450,
        'HEIGHT': 170
      },
      'SIZE_G': {
        'WIDTH': 700,
        'HEIGHT': 250
      },
    },
    'TIPOERROAVISO': {
      'ERRO': 'Erro',
      'AVISO': 'Aviso'
    },
    'MSGS': {
      'ERRO_CREDENCIAIS': 'Parece que você errou as suas credenciais! Tente novamente...',
      'ERRO_SERVIDOR': 'Parece que houve um erro com a conexão com o servidor!',

      'AVISO_CAMPO_LUCRO_PECA_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Margem de Lucro por peça\"!',
      'AVISO_CAMPO_PRECO_VENDA_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Preço de Venda\"!',
      'AVISO_CAMPO_PRECO_CUSTO_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Preço de Custo\"!',
      'AVISO_CAMPO_FORNECEDOR_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Fornecedor\"!',
      'AVISO_CAMPO_NOME_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Nome do Produto\"!',
      'AVISO_CAMPO_CATEGORIA_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Categoria\"!',
      'AVISO_PRODUTO_IGUAL': 'Você não pode cadastrar dois produtos iguais na mesma venda... Você pode aumentar a quantidade de unidades neste caso!',
      'AVISO_CAMPO_ESTOQUE_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Estoque\"!',
      'AVISO_CAMPO_MODELO_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Modelo\"!',
      'AVISO_CAMPO_MARCA_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Marca\"!',
      'AVISO_CAMPO_PECA_PRODUTO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencheu errado o campo obrigatório \"Peça\"!',
      'AVISO_CAMPO_VASIO': 'Certifique de que você não esqueceu de preencher ou preencher errado algum campo obrigatório do cadastro!',
      'AVISO_PRODUTO_ESTOQUE_PEQUENO': 'Você não pode vender um produto que não tenha mais unidades em estoque!',
      'AVISO_CAMPO_CPF_CNPJ_VASIO': 'Você esqueceu de preencheer o campo de cpf ou cnpj do cadastro!',
      'AVISO_CAMPO_CARGO_MENOR_3': 'O campo de cargo precisa ter mais de 3 letras para ser válido!!',
      'AVISO_CAMPO_PRODUTO_VASIO': 'Certifique-se de que não esqueceu os campos de produtos vazios!',
      'AVISO_SELECIONE_VENDEDOR': 'Parece que você esqueceu de selecionar o campo de Vendedor!',
      'AVISO_CAMPO_CARGO_VASIO': 'Você esqueceu de preencher o campo cargo, ele é obrigatório.',
      'AVISO_SELECIONE_CLIENTE': 'Parece que você esqueceu de selecionar o campo de Cliente!',
      'AVISO_CAMPO_SEXO_VASIO': 'Você esqueceu de preencheer o campo de \"sexo\" do cadastro!',
      'AVISO_CAMPO_DATA_VASIO': 'Você esqueceu de preencheer o campo data do cadastro!',
      'AVISO_AO_MENOS_UM_PRODUTO': 'É preciso ao menos um produto neste cadastro!',
      'AVISO_SEM_MAIS_PRODUTOS': 'Você não tem mais produtos para adicionar!',
      'AVISO_SENHAS_ALTERADAS_SUCESSO': 'Sua senha foi alterada com sucesso!',
      'AVISO_SENHAS_NAO_CONFEREM': 'As senhas que você digitou não conferem!',
      'AVISO_CADASTRADO_ATUALIZADO_OK': 'Cadastro atualizado com sucesso!',
      'AVISO_CAMPO_EMAILS_INVALIDOS': 'Os campos de email são inválidos!',
      'AVISO_CAMPO_EMAILS_ERRADOS': 'Os campos de email não conferem!',
      'AVISO_USUARIO_CRIADO': 'Você foi registrado com sucesso!',
      'AVISO_SENHAS_VASIA': 'Preeancha o campo de senha!',
      'AVISO_NOME_VASIO': 'Preeancha o campo de Nome!',
      'AVISO_CADASTRADO_OK': 'Cadastrado com sucesso!',
      'AVISO_CAMPO_CEP_INVALIDOS': 'O cep é Inválido',

      // Cadastro de Funcionário
      'AVISO_CAMPO_NOME_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_NOME_CAD_FUN_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_RUA_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Rua\"!',
      'AVISO_CAMPO_RUA_CAD_FUN_MENOR3': 'O campo obrigatório \"Rua\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_NUM_CAD_FUN_MENOR2': 'O campo obrigatório \"Numero\" do cadastro precisa ter um tamanho de no minimo 2 caracteres!',
      'AVISO_CAMPO_NASCIMENTO_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nascimento\"!',
      'AVISO_CAMPO_DATA_ADMICAO_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Admissão\"!',
      'AVISO_CAMPO_NUM_CASA_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Número\"!',
      'AVISO_CAMPO_BAIRRO_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Bairro\"!',
      'AVISO_CAMPO_BAIRRO_CAD_FUN_MENOR3': 'O campo obrigatório \"Bairro\" do cadastro precisa ter um tamnho de 3 caracteres!',
      'AVISO_CAMPO_CIDADE_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Cidade\"!',
      'AVISO_CAMPO_CIDADE_CAD_FUN_MENOR3': 'O campo obrigatório \"Cidade\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_ESTADO_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Estado\"!',
      'AVISO_CAMPO_NUMERO_TELEFONE_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Telefone\"!',
      'AVISO_CAMPO_TELEFONE_CAD_FUN_MENOR2': 'O campo obrigatório \"Telefone\" do cadastro precisa ter um tamanho de no minimo 2 caracteres!',
      'AVISO_CAMPO_TELEFONE_CAD_FUN_MAIOR12': 'O campo obrigatório \"telefone\" do cadastro precisa ter um tamanho de no maxímo 12 caracteres!',
      'AVISO_CAMPO_SALARIO_CAD_FUN_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Salário\"!',
      'AVISO_CAMPO_SALARIO_CARGO_CAD_FUN_VASIO': 'Parece que você colocou um salário muito alto! Máximo 10 digitos.',
      'AVISO_CAMPO_SALARIO_GRANDE_CAD_FUN': 'Parece que você colocou um salário muito alto! Máximo 10 digitos.',

      // Cadastro de Fornecedor
      'AVISO_CAMPO_NOME_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_NOME_CAD_FOR_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_CNPJ_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Cnpj\"!',
      'AVISO_CAMPO_CNPJ_CAD_FOR_TAMANHO': 'O campo obrigatório \"Cnpj\" do cadastro precisa ter um tamanho de 14 caracteres!',
      'AVISO_CAMPO_NUM_CASA_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Número\"!',
      'AVISO_CAMPO_NUM_CASA_CAD_FOR_MENOR2': 'O campo obrigatório \"Numero\" do cadastro precisa ter um tamanho de no minimo 2 caracteres!',
      'AVISO_CAMPO_RUA_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Rua\"!',
      'AVISO_CAMPO_RUA_CAD_FOR_MENOR3': 'O campo obrigatório \"Rua\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_BAIRRO_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Bairro\"!',
      'AVISO_CAMPO_BAIRRO_CAD_FOR_MENOR3': 'O campo obrigatório \"Bairro\" do cadastro precisa ter um tamnho de 3 caracteres!',
      'AVISO_CAMPO_CIDADE_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Cidade\"!',
      'AVISO_CAMPO_CIDADE_CAD_FOR_MENOR3': 'O campo obrigatório \"Cidade\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_ESTADO_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Estado\"!',
      'AVISO_CAMPO_NUMERO_TELEFONE_CAD_FOR_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Telefone\"!',
      'AVISO_CAMPO_TELEFONE_CAD_FOR_MENOR2': 'O campo obrigatório \"Telefone\" do cadastro precisa ter um tamanho de no minimo 2 caracteres!',
      'AVISO_CAMPO_TELEFONE_CAD_FOR_MAIOR12': 'O campo obrigatório \"telefone\" do cadastro precisa ter um tamanho de no maxímo 12 caracteres!',

      // Cadastro de Cliente
      'AVISO_CAMPO_NOME_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_NOME_CAD_CLI_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_NUM_CASA_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Número\"!',
      'AVISO_CAMPO_NUM_CASA_CAD_CLI_MENOR2': 'O campo obrigatório \"Numero\" do cadastro precisa ter um tamanho de no minimo 2 caracteres!',
      'AVISO_CAMPO_RUA_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Rua\"!',
      'AVISO_CAMPO_RUA_CAD_CLI_MENOR3': 'O campo obrigatório \"Rua\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_BAIRRO_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Bairro\"!',
      'AVISO_CAMPO_BAIRRO_CAD_CLI_MENOR3': 'O campo obrigatório \"Bairro\" do cadastro precisa ter um tamnho de 3 caracteres!',
      'AVISO_CAMPO_CIDADE_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Cidade\"!',
      'AVISO_CAMPO_CIDADE_CAD_CLI_MENOR3': 'O campo obrigatório \"Cidade\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_ESTADO_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Estado\"!',
      'AVISO_CAMPO_TELEFONE_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Telefone\"!',
      'AVISO_CAMPO_TELEFONE_CAD_CLI_MENOR5': 'O campo obrigatório \"Telefone\" do cadastro precisa ter um tamanho de no minimo 5 caracteres!',
      'AVISO_CAMPO_TELEFONE_CAD_CLI_MAIOR12': 'O campo obrigatório \"telefone\" do cadastro precisa ter um tamanho de no maxímo 12 caracteres!',
      'AVISO_CAMPO_CPF_CAD_CLI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Cpf\"!',
      'AVISO_CAMPO_CPF_CAD_CLI_TAMANHO': 'O campo obrigatório \"Cpf\" do cadastro precisa ter um tamanho de 11 caracteres!',
      'AVISO_CAMPO_SEXO_CAD_CLI_VASIO': 'O campo obrigatório \"Sexo\" do cadastro precisa estar definido!',
      'AVISO_CAMPO_NASCIMNETO_CAD_CLI_VASIO': 'O campo obrigatório \"Data de Nascimento\" do cadastro precisa estar definido!',
      'AVISO_CAMPO_EMAIL_CAD_CLI_VASIO': 'O campo obrigatório \"Email\" do cadastro precisa ser válido!',

      // Cadastro de Comissão
      'AVISO_CAMPO_NOME_CAD_COMI_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_VALOR_COMISSAO_CAD_COMI_VASIO': 'O campo obrigatório \"Valor da Comissão\" do cadastro precisa ser maior que 0!',
      'AVISO_CAMPO_PORCENTO_COMISSAO_CAD_COMI_VASIO': 'O campo obrigatório \"Porcentagem de Comissão\" do cadastro precisa ser maior que 0!',
      'AVISO_CAMPO_VALOR_VENDA_CAD_COMI_VASIO': 'O campo obrigatório \"Valor de Venda\" do cadastro precisa ser maior que 0!',
      'AVISO_CAMPO_QTD_VENDA_CAD_COMI_VASIO': 'O campo obrigatório \"Quantidade de Vendas\" do cadastro precisa ser maior que 0!',
      'AVISO_CAMPO_NOME_CAD_COMI_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_FUNCIONARIO_ID_CAD_COMI_VASIO': 'O campo obrigatório \"Funcionário\" do cadastro precisa estar preenchido!',

      // Cadastro de Despesas Gerais
      'AVISO_CAMPO_NOME_CAD_VENDA_GERAL_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_NOME_CAD_VENDA_GERAL_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_VALOR_CAD_VENDA_GERAL_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Valor\"!',
      'AVISO_CAMPO_DATA_CAD_VENDA_GERAL_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Data de Venda\"!',

      // Cadastro de Despesa Funcionário
      'AVISO_CAMPO_NOME_CAD_DESP_FUNC_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_NOME_CAD_DESP_FUNC_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_VALOR_CAD_DESP_FUNC_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Valor\"!',
      'AVISO_CAMPO_DATA_CAD_DESP_FUNC_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Data\"!',
      'AVISO_CAMPO_FUNCIONARIO_CAD_DESP_FUNC_VASIO': 'O campo obrigatório \"Funcionário\" do cadastro precisa estar preenchido!',

      // Cadastro de Despesa Fornecedor
      'AVISO_CAMPO_NOME_CAD_DESP_FORNE_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome\"!',
      'AVISO_CAMPO_NOME_CAD_DESP_FORNE_MENOR3': 'O campo obrigatório \"Nome\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_VALOR_CAD_DESP_FORNE_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Valor\"!',
      'AVISO_CAMPO_DATA_CAD_DESP_FORNE_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Data\"!',
      'AVISO_CAMPO_FUNCIONARIO_CAD_DESP_FORNE_VASIO': 'O campo obrigatório \"Fornecedor\" do cadastro precisa estar preenchido!',

      // Cadastro protos e derivados
      'AVISO_CAMPO_NOME_CAD_PECA_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome da Peca\"!',
      'AVISO_CAMPO_NOME_CAD_PECA_MENOR3': 'O campo obrigatório \"Nome da Peca\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_NOME_CAD_MODELO_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome do Modelo\"!',
      'AVISO_CAMPO_NOME_CAD_MODELO_MENOR3': 'O campo obrigatório \"Nome do Modelo\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_NOME_CAD_CATEGORIA_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome da Categoria\"!',
      'AVISO_CAMPO_NOME_CAD_CATEGORIA_MENOR3': 'O campo obrigatório \"Nome da Categoria\" do cadastro precisa ser maior do que 3 caracteres!',
      'AVISO_CAMPO_NOME_CAD_MARCA_VASIO': 'Parece que você esqueceu de preencher o campo obrigatório \"Nome da Marca"!',
      'AVISO_CAMPO_NOME_CAD_MARCA_MENOR3': 'O campo obrigatório \"Nome da Marca\" do cadastro precisa ser maior do que 3 caracteres!',


      //'AVISO_CAMPO_CIDADE_CAD_FUN_MENOR10': 'O campo obrigatório \"Cidade\" do cadastro precisa ter um tamnho de 10 caracteres!',

    }
  };

  constructor() { }
}
