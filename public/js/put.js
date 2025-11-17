function buscarDados() {
    var cpf = document.getElementById('identificadorCPF').value;

    fetch('http://localhost:3000/pessoas', { method: 'GET' })
        .then(resposta => resposta.json())
        .then(dados => {
            let pessoaEncontrada = dados.find(pessoa => pessoa.cpf === cpf);

            if (pessoaEncontrada) {
                document.getElementById('nomeAtualizar').value = pessoaEncontrada.nome;
                document.getElementById('sobrenomeAtualizar').value = pessoaEncontrada.sobrenome;
                document.getElementById('identificador').value = pessoaEncontrada.id;
                document.getElementById('emailAtualizar').value = pessoaEncontrada.email;
                document.getElementById('senhaAtualizar').value = pessoaEncontrada.senha;
                document.getElementById('ruaAtualizar').value = pessoaEncontrada.rua;
                document.getElementById('cepAtualizar').value = pessoaEncontrada.cep;
                document.getElementById('cidadeAtualizar').value = pessoaEncontrada.cidade;
                document.getElementById('estadoAtualizar').value = pessoaEncontrada.estado;
                document.getElementById('telefoneAtualizar').value = pessoaEncontrada.telefone;
            } else {
                alert("Pessoa não encontrada");
            }
        });
}
