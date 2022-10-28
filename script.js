function perguntaNome(){
    let nome = prompt('Qual seu nome?'); 
    let usuario = {
        name: `${nome}`
      }

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    promise.then(processaNomeCerto);
    promise.catch(processaNomeErrado);

}
perguntaNome()

function processaNomeCerto(resposta){
    console.log(resposta.data)
    alert("Você está online!")
}
function processaNomeErrado(resposta){
    console.log(resposta.data)
    alert("Já existe um usuário com esse nome. Insira um novo nome.")
}


function processaMensagens(){
   const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
   promise.then(mensagens)
}
processaMensagens()

function mensagens(resposta){
    console.log(resposta.data)
}
