document.addEventListener('DOMContentLoaded', function() {
    // ===== CONTADOR REGRESSIVO =====
    function atualizarContador() {
        const dataCasamento = new Date("2025-11-29T18:30:00");
        const diff = dataCasamento - new Date();

        if (diff <= 0) {
            document.getElementById("contador").innerHTML = "<h2>🎉 O grande dia chegou! 🎉</h2>";
            return;
        }

        const segundos = Math.floor(diff / 1000) % 60;
        const minutos = Math.floor(diff / (1000 * 60)) % 60;
        const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
        const dias = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
        const meses = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

        document.getElementById("meses").textContent = meses.toString().padStart(2, "0");
        document.getElementById("dias").textContent = dias.toString().padStart(2, "0");
        document.getElementById("horas").textContent = horas.toString().padStart(2, "0");
        document.getElementById("minutos").textContent = minutos.toString().padStart(2, "0");
        document.getElementById("segundos").textContent = segundos.toString().padStart(2, "0");
    }

    // ===== FORMULÁRIO SIMPLIFICADO (SEM ACOMPANHANTES) =====
    document.getElementById("form-presenca").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const nome = document.getElementById("nome-convidado").value.trim();

        if (!nome) return alert("Por favor, insira seu nome");

        const lista = JSON.parse(localStorage.getItem("listaCasamento")) || [];
        
        if (lista.some(conv => conv.nome.toLowerCase() === nome.toLowerCase())) {
            return alert(`${nome}, você já confirmou presença!`);
        }

        lista.push({
            nome: nome,
            data: new Date().toLocaleString("pt-BR")
        });

        localStorage.setItem("listaCasamento", JSON.stringify(lista));
        alert("Presença confirmada com sucesso!");
        this.reset();
    });

    // ===== BOTÃO ADMIN =====
    document.getElementById("admin-area").addEventListener("click", function() {
        const lista = JSON.parse(localStorage.getItem("listaCasamento")) || [];
        const listaHTML = lista.map(conv => `
            <div style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <p style="font-weight: bold;">${conv.nome}</p>
                <p style="font-size: 0.9em; color: #666;">Confirmado em: ${conv.data}</p>
            </div>
        `).join("") || "<p style='text-align: center;'>Nenhuma confirmação ainda</p>";
        
        document.getElementById("lista-conteudo").innerHTML = listaHTML;
        document.getElementById("lista-popup").style.display = "block";
    });

    // ===== FECHAR POPUP =====
    document.addEventListener("click", function(e) {
        if (e.target === document.getElementById("lista-popup") || 
            e.target.textContent === "Fechar") {
            document.getElementById("lista-popup").style.display = "none";
        }
    });

    // ===== INICIALIZAÇÃO =====
    atualizarContador();
    setInterval(atualizarContador, 1000);
});

function copiarChave() {
    const chave = "sua-chave-pix-aqui"; // Substitua pela chave real
    navigator.clipboard.writeText(chave)
        .then(() => alert("Chave PIX copiada!"))
        .catch(err => console.error("Falha ao copiar: ", err));
}


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});
