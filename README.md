# projeto17-shortly

Encurtamento de links, veja o passo a passo para usar:

1- Execute o dump, para instalação das configurações do banco de dados;

2- para criar um usuário e logar use as seguintes rotas com o corpo correspondente:
 post: /signup
    {
      "email":,
      "name":,
      "password":,
      "confirmPassword":
    }
    
  psot: /signin (retorna um token de auth. que deve ser enviado em algumas rotas no formato "Bearer token")
    {
      "email":,
      password:
    }
  promise
    {token: }
3- ambiente do usuário: (no header token validation)
  get: /users/me

4- rank dos links mais visitados:
  get: /ranking
  
5- Solicitação de encurtamento de uma URL: (no header token validation)
  post: /urls/shorten
    {
      "url":
    }
    
  promise
    {
      "shortenUrl":,
      "id":
    }

6- para obter informações de uma url por id:
  get: /urls/:id
  promise
    {
      "id":,
      "url":,
      "shortenUrl":      
    }

7- para deletar uma url por id: (no header token validation)
  delete: /urls/:id

8- para visitar um link:
  get: /urls/open/:shortUrl
  
