<h1> projeto17-shortly <h1>

Encurtamento de links, veja o passo a passo para usar:

1- Execute o dump, para instalação das configurações do banco de dados;

2- para criar um usuário e logar use as seguintes rotas com o corpo correspondente: <br/>
 post: /signup
    {
      "email":,
      "name":,
      "password":,
      "confirmPassword":
    }<br/>
    
  psot: /signin (retorna um token de auth. que deve ser enviado em algumas rotas no formato "Bearer token")<br/>
    {
      "email":,
      password:
    }<br/>
  promise
    {token: }<br/>
3- ambiente do usuário: (no header token validation)<br/>
  get: /users/me<br/>

4- rank dos links mais visitados:<br/>
  get: /ranking<br/>
  
5- Solicitação de encurtamento de uma URL: (no header token validation)<br/>
  post: /urls/shorten<br/>
    {
      "url":
    }<br/>
    
  promise<br/>
    {
      "shortenUrl":,
      "id":
    }<br/>

6- para obter informações de uma url por id:<br/>
  get: /urls/:id<br/>
  promise<br/>
    {
      "id":,
      "url":,
      "shortenUrl":      
    }<br/>

7- para deletar uma url por id: (no header token validation)<br/>
  delete: /urls/:id<br/>

8- para visitar um link:<br/>
  get: /urls/open/:shortUrl<br/>
  
