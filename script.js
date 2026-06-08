let tarefas =
JSON.parse(localStorage.getItem("tarefas")) || [];

listarTarefas();

function salvarDados(){
    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}

function adicionarTarefa(){

    const descricao =
    document.getElementById("tarefa").value.trim();

    const prioridade =
    document.getElementById("prioridade").value;

    if(descricao === ""){
        alert("Digite uma tarefa.");
        return;
    }

    tarefas.push({
        descricao,
        prioridade,
        concluida:false
    });

    salvarDados();

    document.getElementById("tarefa").value="";

    listarTarefas();
}

function listarTarefas(){

    const filtro =
    document.getElementById("filtro").value;

    const lista =
    document.getElementById("lista");

    lista.innerHTML = "";

    tarefas.forEach((tarefa,index)=>{

        if(
            filtro==="pendentes" &&
            tarefa.concluida
        ) return;

        if(
            filtro==="concluidas" &&
            !tarefa.concluida
        ) return;

        const li =
        document.createElement("li");

        li.innerHTML = `
        <span class="
        ${tarefa.concluida ? 'concluida':''}
        ${tarefa.prioridade.toLowerCase()}
        ">
        ${tarefa.descricao}
        (${tarefa.prioridade})
        </span>

        <button onclick="concluir(${index})">
            ✔
        </button>

        <button onclick="editar(${index})">
            Editar
        </button>

        <button onclick="excluir(${index})">
            Excluir
        </button>
        `;

        lista.appendChild(li);
    });
}

function concluir(index){

    tarefas[index].concluida =
    !tarefas[index].concluida;

    salvarDados();

    listarTarefas();
}

function editar(index){

    const novaDescricao =
    prompt(
        "Nova descrição:",
        tarefas[index].descricao
    );

    if(
        novaDescricao &&
        novaDescricao.trim() !== ""
    ){
        tarefas[index].descricao =
        novaDescricao;

        salvarDados();

        listarTarefas();
    }
}

function excluir(index){

    tarefas.splice(index,1);

    salvarDados();

    listarTarefas();
}
