// Atualiza o iframe (botão)
function atualizarGrafico() {
    const iframe = document.querySelector("iframe");
    const src = iframe.src;
    iframe.src = ''; // limpa temporariamente
    setTimeout(() => {
        iframe.src = src; // recarrega o gráfico
    }, 100);
}

// Busca valor atual de PPM via API do ThingSpeak
async function buscarPPM() {
    const url = 'https://api.thingspeak.com/channels/2894388/fields/1/last.json';
    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        const ppm = dados.field1;
        document.getElementById("ppm-valor").textContent = `Valor atual: ${ppm} ppm`;
    } catch (erro) {
        document.getElementById("ppm-valor").textContent = 'Erro ao carregar dados';
    }
}

// Atualiza valor PPM a cada 5 segundos
setInterval(buscarPPM, 5000);
buscarPPM(); // chama na primeira vez

function mostrarQualidade(ppm) {
    const qualidade = document.getElementById("qualidade");
    if (ppm < 50) {
        qualidade.textContent = "✅ Qualidade do ar: Boa";
        qualidade.style.color = "green";
    } else if (ppm < 100) {
        qualidade.textContent = "⚠️ Qualidade do ar: Moderada";
        qualidade.style.color = "orange";
    } else {
        qualidade.textContent = "🚨 Qualidade do ar: Ruim";
        qualidade.style.color = "red";
    }
}
