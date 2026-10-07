const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefa");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoTema = document.getElementById("botao-alternar-tema");

var decidaSe = 0;

let tarefas = [];

const DADOS_SALVOS = "tarefas_salvas_aqui";




function salvarDados() {
    const tarefasTexto = JSON.stringify(tarefas);
    localStorage.setItem(DADOS_SALVOS, tarefasTexto);
}


function carregarDados() {
    const dadosAqui = localStorage.getItem(DADOS_SALVOS);

    if (dadosAqui) {
        tarefas = JSON.parse(dadosAqui);
    }

    mostrarTarefas();
}



function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa!");
        return;
    }

    if(texto === "saber o sentido da vida"){
        document.getElementById("oSegredoDaVida").style = "display: block";
    }
   
    if (texto === "saber sobre o autor") {
        document.getElementById("autor").style = "display: block";
    }


   
    if ((texto === "Farmar aura") || (texto === "67")) {

        document.getElementById("someDaquiCricaRanhenta").style = "display: solid";

        const tarefasAura = [
            "Acordar às 5:30",
            "Tomar banho e se arrumar",
            "Pegar o busão",
            "Chegar no trabalho",
            "Bater carteira",
            "Trabalhar igual condenado",
            "Almoçar em 15 minutos",
            "Voltar a trabalhar",
            "Olhar para o relógio e perceber que ainda são 14:37",
            "Continuar trabalhando",
            "Bater carteira novamente",
            "Pegar o busão de volta",
            "Chegar em casa às 21:00",
            "Tomar banho",
            "Jantar",
            "perceber que não tem tempo para farmar aura",
            "Deitar na cama",
            "Perceber que amanhã tem tudo isso de novo",
            "Repetir tudo isso"
        ];


        tarefasAura.forEach(function(nome) {
            tarefas.push({
                nome: nome,
                concluida: false
            });
        });
    }


   
    const tarefa = {
        nome: texto,
        concluida: false
    };


    tarefas.push(tarefa);

    campoTarefa.value = "";


    salvarDados();

    mostrarTarefas();
}



function mostrarTarefas() {

    listaTarefas.innerHTML = "";


    tarefas.forEach((tarefa, indice) => {

        const item = document.createElement("li");
        item.className = "item-tarefa";


        const texto = document.createElement("span");
        texto.textContent = tarefa.nome;


        if (tarefa.concluida) {
            texto.classList.add("concluida");
        }


     
        const botoes = document.createElement("div");
        botoes.className = "botoes-tarefa";


    

        const botaoConcluir = document.createElement("button");

        botaoConcluir.innerHTML =
            '<i class="fa-solid fa-check"></i>';

        botaoConcluir.className = "botao-concluir";
        botaoConcluir.title = "Concluir tarefa";


        botaoConcluir.addEventListener("click", function() {

            tarefas[indice].concluida =
                !tarefas[indice].concluida;


          
            salvarDados();

            mostrarTarefas();
        });


        

        const botaoExcluir = document.createElement("button");

        botaoExcluir.innerHTML =
            '<i class="fa-solid fa-trash"></i>';

        botaoExcluir.className = "botao-excluir";
        botaoExcluir.title = "Excluir tarefa";


        botaoExcluir.addEventListener("click", function() {

            tarefas.splice(indice, 1);

          
            salvarDados();

            mostrarTarefas();
        });


      
        botoes.appendChild(botaoConcluir);
        botoes.appendChild(botaoExcluir);


     
        item.appendChild(texto);
        item.appendChild(botoes);


        listaTarefas.appendChild(item);
    });


    

    contadorTarefas.textContent =
        tarefas.length +
        (tarefas.length === 1
            ? " tarefa na lista"
            : " tarefas na lista");
}




botaoAdicionar.addEventListener(
    "click",
    adicionarTarefa
);




campoTarefa.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            adicionarTarefa();
        }

    }
);



const esperar = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));


async function iniciarPiscaPisca() {

    while (true) {

        document.body.classList.toggle(
            "tema-escuro"
        );

        await esperar(500);
    }
}



botaoTema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "tema-escuro"
        );


        decidaSe = decidaSe + 1;


        const icone =
            botaoTema.querySelector("i");


        if (
            document.body.classList.contains(
                "tema-escuro"
            )
        ) {

            icone.className =
                "fa-solid fa-sun";

        } else {

            icone.className =
                "fa-solid fa-moon";
        }



        if (decidaSe == 12) {

            document.getElementById(
                "peloAmorDeDeus"
            ).style = "display: block";
        }



        if (decidaSe == 16) {

            alert(
                "EU PEDI PARA VOCÊ PARAR, AGORA SOFRA COM EPILEPSIA !!!!!!!!!!"
            );


            document.getElementById(
                "peloAmorDeDeus"
            ).style = "display: none";


            document.getElementById(
                "botao-alternar-tema"
            ).style = "display: none";


            iniciarPiscaPisca();
        }


    }
);




carregarDados();