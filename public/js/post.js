// ---------- Função para preencher o endereço automaticamente ----------
const preencherFormulario = (endereco) => {
    document.getElementById("rua").value = endereco.logradouro || "";
    document.getElementById("bairro").value = endereco.bairro || "";
    document.getElementById("cidade").value = endereco.localidade || "";
    document.getElementById("estado").value = endereco.uf || "";
};

const cepValido = (cep) => cep.length === 8 && /^[0-9]+$/.test(cep);

const pesquisarCep = async () => {
    const cep = document.getElementById("cep").value.replace("-", "");
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (!endereco.erro) preencherFormulario(endereco);
        else alert("CEP não encontrado!");
    } else {
        alert("CEP inválido! Digite apenas números.");
    }
};

// Quando abrir a página, adiciona o evento de CEP automático
document.addEventListener("DOMContentLoaded", () => {
    const cepInput = document.getElementById("cep");
    if (cepInput) {
        cepInput.addEventListener("focusout", pesquisarCep);
    }
});


// ---------- Envio dos dados (POST) para o JSON Server ----------
function enviarDados() {

    const usuario = {
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value,
        cpf: document.getElementById('cpf').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        telefone: document.getElementById('telefone').value
    };

    if (!usuario.nome || !usuario.email || !usuario.senha) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    fetch("http://localhost:3000/pessoas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
    .then(r => r.json())
    .then(() => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "index.html";
    })
    .catch(() => alert("Erro ao cadastrar usuário!"));
}
