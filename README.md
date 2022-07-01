<h1 align="center">
    <img alt="Cubos Academy" width="170" src="cubos_academy.png" />
    </br>
    </br>
    Desafio Técnico Front-end Cubos Academy
    </br>
    </br>
</h1>

Neste desafio você deve criar uma API REST para facilitar o gerenciamento de horários de uma clínica. Sua API ter as seguintes funcionalidades:

- Cadastrar regras de horários para atendimento
- Apagar regra de horário para atendimento
- Listar regras de horários para atendimento
- Listar horários disponíveis dentro de um intervalo
  
É importante notar que a API deve ser feita com Javascript (Node.js), utilizando Express.js (queremos te avaliar pela decisão de arquitetura e organização do projeto) **e os dados devem ser salvos em um arquivo JSON** (não sendo permitido o uso de banco de dados).

## Funcionalidades da API REST:

### Cadastro de regra de atendimento

O cadastro de regras de horário para atendimento deve possibilitar que se disponibilize intervalos de horário para consulta, possibilitando regras para:

- Um dia especifico, por exemplo: estará disponível para atender dia 25/06/2018 nos intervalos de 9:30 até 10:20 e de 10:30 até as 11:00
- Diariamente, por exemplo: estará disponível para atender todos os dias das 9:30 até as 10:10
- Semanalmente, por exemplo: estará disponível para atender todas segundas e quartas das 14:00 até as 14:30

### Apagar regra

Este método deve ser capaz de apagar uma regra específica criada pelo endpoint descrito em "Cadastro de regra de atendimento".

### Listar regras

O método de listar deve retornar as regras de atendimento criadas pelo endpoint descrito em "Cadastro de regra de atendimento".

### Horários disponíveis

Este endpoint deve retornar uma lista de disponibilidades baseado nas regras criadas anteriormente, cada um com os seguintes dados:

- Dia disponível
- Intervalos disponíveis desse dia

A listagem deverá ser mostrada com base em um intervalo de datas informadas na requisição. As datas referentes ao intervalo devem estar no padrão: DD-MM-YYYY, por exemplo "25-11-2018".

## Se você fizer é um plus

- Teste unitário
- Utilizar algum conceito de arquitetura como: Clean Architecture, Hexagonal Architecture, CQRS ou outra desejada.
- Typescript
- Documentação
- Validar cadastro de regras para evitar conflito de horários

## Entrega

Ao finalizar nos envie os seguintes itens:

- Link do repositório;
- Exemplo de requisição de criação de regra de atendimento para cada um dos 3 casos de exemplo listados na seção "Cadastro de regra de atendimento";
- Exemplo de requisição de remoção de regra;
- Exemplo de requisição de listagem de regras;
- Exemplo de requisição de listagem de horários;

Os exemplos de requisição devem ser enviados na forma de uma Postman (https://www.getpostman.com/) collection, se possível, do contrário, cada exemplo deve conter: nome do endpoint, método HTTP referente à chamada e body.
