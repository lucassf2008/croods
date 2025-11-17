function login() {
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    if (!email || !senha) {
        alert("Preencha os campos!");
        return;
    }

    fetch('http://localhost:3000/pessoas')
        .then(res => res.json())
        .then(dados => {

            const usuario = dados.find(u => u.email === email && u.senha === senha);

            if (!usuario) {
                alert('Email ou senha incorretos!');
                return;
            }

            // Guardar informações
            localStorage.setItem('usuarioNome', usuario.nome);
            localStorage.setItem('usuarioEmail', usuario.email);

            // Verificar admin
            if (usuario.email === 'admin@playblue.com') {
                window.location.href = 'html/admin.html';
            } else {
                window.location.href = 'html/produtos.html';
            }
        })
        .catch(() => alert('Erro ao realizar login.'));
}
