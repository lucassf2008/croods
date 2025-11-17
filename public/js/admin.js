// Carregar todos os usuários
function carregarUsuarios() {
    fetch("http://localhost:3000/pessoas")
        .then(res => res.json())
        .then(dados => {
            const tabela = document
                .getElementById("tabelaUsuarios")
                .querySelector("tbody");

            tabela.innerHTML = "";

            dados.forEach(usuario => addLinhaTabela(usuario));
        });
}

// Criar linha na tabela (reutilizável)
function addLinhaTabela(usuario) {
    const tabela = document
        .getElementById("tabelaUsuarios")
        .querySelector("tbody");

    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.cpf || "Sem CPF"}</td>
        <td>
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button onclick="excluirUsuario(${usuario.id})">Excluir</button>
        </td>
    `;

    tabela.appendChild(tr);
}

// Buscar usuário pelo CPF
function buscarPorCPF() {
    const cpfBusca = document.getElementById("buscarCPF").value.trim();

    if (!cpfBusca) {
        alert("Digite um CPF para buscar!");
        return;
    }

    fetch("http://localhost:3000/pessoas")
        .then(res => res.json())
        .then(dados => {
            const resultado = dados.find(u => u.cpf === cpfBusca);

            const tabela = document
                .getElementById("tabelaUsuarios")
                .querySelector("tbody");

            tabela.innerHTML = ""; // limpa tabela

            if (resultado) {
                addLinhaTabela(resultado);
            } else {
                tabela.innerHTML = `<tr><td colspan="4">CPF não encontrado.</td></tr>`;
            }
        });
}

// Excluir usuário
function excluirUsuario(id) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    fetch(`http://localhost:3000/pessoas/${id}`, {
        method: "DELETE"
    })
        .then(() => carregarUsuarios());
}

// Editar usuário
function editarUsuario(id) {
    const novoNome = prompt("Novo nome:");
    const novoCpf = prompt("Novo CPF:");

    if (!novoNome || !novoCpf) {
        alert("Os campos não podem estar vazios.");
        return;
    }

    fetch(`http://localhost:3000/pessoas/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: novoNome,
            cpf: novoCpf
        })
    })
        .then(() => carregarUsuarios());
}

// Executa ao abrir a página
carregarUsuarios();
