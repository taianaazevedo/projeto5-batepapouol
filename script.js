let usuario;
let mensagem = [];

function perguntaNome() {
    let nome = prompt('Qual seu nome?');
    usuario = { name: `${nome}` };
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    promise.then(processaNomeCerto);
    promise.catch(processaNomeErrado);
}
perguntaNome()

function processaNomeCerto(resposta) {
       alert("Você está online! Bem-vindo(a) ao Bate-Papo UOL!");    
}
function processaNomeErrado(resposta) { 
    alert("Já existe um usuário com esse nome. Insira um novo nome.");
    prompt("Qual seu nome?");
}

function continuaOnline(){
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario)
    promise.then(aindaEstaOnline);
    promise.catch(estaOffline);
}
/*setInterval(continuaOnline, 10000);*/

function aindaEstaOnline(resposta){
    console.log(resposta.data);
}
function estaOffline(resposta){
    console.log(resposta.data);
    alert('Você ficou muito tempo fora. Logue novamente.');
    perguntaNome();
}

function buscarMensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(mensagensChat);
    promise.catch(mensagensChatErro);
    
}
buscarMensagens();
/*setInterval(buscarMensagens, 3000);*/

function mensagensChat(resposta){
    mensagem = resposta.data;

    renderizarMensagens();
}
mensagensChat();

function mensagensChatErro(resposta){
    console.log(resposta)
}
/*function mensagensChat(resposta){
    mensagem = [];
    for(i = 0; i < resposta.data.length; i++){
        const mensagensApi = resposta.data[i];
        mensagem.push(mensagensApi);
    }
       console.log(resposta)
    renderizarMensagens();
}
mensagensChat();*/



function renderizarMensagens(){
    const telaDoChat = document.querySelector('.mensagem-chat');
    telaDoChat.innerHTML = '';
    for(i = 0; i < mensagem.length; i++){
        let mensagens = mensagem[i];

        if(mensagens.type === "status"){
            telaDoChat.innerHTML +=
                `<div class="mensagem-chat status">
                    <span class="hora">${mensagens.time}&nbsp;</span>                
                    <span class="locutor"><b>${mensagens.from}</b></span>                                    
                </div>`
        } else if (mensagens.type === "private_message"){
            telaDoChat.innerHTML +=
                `<div class="mensagem-chat reservada">
                    <span class="hora">${mensagens.time}&nbsp;</span>                
                     <span class="locutor"><b>${mensagens.from}</b></span>
                     <span class="destinatario"><b>para <b>${mensagens.to}</b>&nbsp;</b></span>                    
                     <span class="texto">${mensagens.text}</span>                                    
                 </div>`
        } else if (mensagens.type === "message") {
            telaDoChat.innerHTML +=
                `<div class="mensagem-chat normal">
                    <span class="hora">${mensagens.time} &nbsp;</span>                
                     <span class="locutor"><b>${mensagens.from}</b></span>
                     <span class="destinatario"><b>para <b>${mensagens.to}</b>&nbsp;</b></span>                    
                     <span class="texto">${mensagens.text}</span>                                    
                 </div>`

        }
    }

}
renderizarMensagens();

/*function alerta(){
    alert("oi");  // teste do OnClick de enviar mensagem
}*/