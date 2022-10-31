let usuario;


// função que pergunta o nome do usuário:
function perguntaNome() {
    usuario = prompt('Qual seu nome?');
    const usuarioCadastrado = { name: usuario };
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuarioCadastrado);
    promise.then(processaNomeCerto);
    promise.catch(processaNomeErrado);
}
perguntaNome();

function processaNomeCerto() {
       alert("Você está online! Bem-vindo(a) ao Bate-Papo UOL!");   
       continuaOnline();
}

function processaNomeErrado() { 
    alert("Já existe um usuário com esse nome. Insira um novo nome.");
    prompt("Qual seu nome?");
}

// função que verifica se o usuário ainda está online:
function continuaOnline(){
    const usuarioOnline = { name: usuario };
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuarioOnline)
}
setInterval(continuaOnline, 5000); 


//função que busca as mensagens no servidor:
function buscarMensagens() {
    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    promise.then(renderizarMensagens); 
}
buscarMensagens();
setInterval(buscarMensagens, 3000);

// função que renderiza as mensagens vindas do servidor no html:
function renderizarMensagens(resposta){
    const mensagem = resposta.data;
    const telaDoChat = document.querySelector('.mensagem-chat');
    telaDoChat.innerHTML = '';
    for(i = 0; i < mensagem.length; i++){
        let mensagens = mensagem[i];

        if(mensagens.type === "status"){
            telaDoChat.innerHTML +=
                `<div class="status">
                    <span class="hora">(${mensagens.time})&nbsp;</span>                
                    <span class="locutor"><b>${mensagens.from}</b></span>
                    <span class="texto">${mensagens.text}</span>                                   
                </div>`;
        } else if (mensagens.type === "private_message"){
            if(mensagens.to === usuario || mensagens.to === "Todos" || mensagens.from === usuario){
            telaDoChat.innerHTML +=
                `<div class="reservada">
                    <span class="hora">(${mensagens.time})&nbsp;</span>                
                     <span class="locutor"><b>${mensagens.from}</b></span>
                     <span class="destinatario">reservadamente para <b>${mensagens.to}</b>&nbsp;</b></span>                    
                     <span class="texto">${mensagens.text}</span>                                    
                 </div>`;
                }
        } else if (mensagens.type === "message") {
            telaDoChat.innerHTML +=
                `<div class="normal">
                    <span class="hora">(${mensagens.time})&nbsp;</span>                
                     <span class="locutor"><b>${mensagens.from}</b></span>
                     <span class="destinatario">para <b>${mensagens.to}</b>&nbsp;</b></span>                    
                     <span class="texto">${mensagens.text}</span>                                    
                 </div>`;

        }
    }
    const ultimaMsgChat = document.querySelector('.mensagem-chat div:last-child');
    ultimaMsgChat.scrollIntoView();
    
}
renderizarMensagens();


//função que envia as mensagens digitadas no input:
function enviarMensagem(){    
    const input = document.querySelector('input');
    const textoMsg = input.value;
    const mensagemEscrita = {
	    from: usuario,
	    to: "Todos",
	    text: textoMsg,
	    type: "message" // ou "private_message" para o bônus
    }        
    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagemEscrita);
    promise.then(buscarMensagens);
    promise.catch(recarregaChat);

    input.value = "";

}
enviarMensagem();

function recarregaChat(){
    window.location.reload();
}

