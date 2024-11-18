// Seleciona o iframe principal
const videoPrincipal = document.getElementById("video-principal");

// Seleciona todas as miniaturas
const miniaturas = document.querySelectorAll(".categoria-videos img");

// Adiciona evento de clique a cada miniatura
miniaturas.forEach((miniatura) => {
    miniatura.addEventListener("click", () => {
        const novoVideo = miniatura.getAttribute("data-video");

        // Testa se o vídeo pode ser carregado
        testarVideoDisponivel(novoVideo, (disponivel) => {
            if (disponivel) {
                videoPrincipal.src = novoVideo;
            } else {
                alert("Este vídeo não pode ser exibido aqui. Você será redirecionado para o YouTube.");
                window.open(novoVideo.replace("/embed/", "/watch?v="), "_blank");
            }
        });
    });
});

// Função para verificar se o vídeo está disponível
function testarVideoDisponivel(url, callback) {
    const testeIframe = document.createElement("iframe");
    testeIframe.src = url;

    testeIframe.onload = () => {
        callback(true); // Vídeo disponível
    };

    testeIframe.onerror = () => {
        callback(false); // Vídeo indisponível
    };

    // Adiciona temporariamente o iframe ao DOM para teste
    document.body.appendChild(testeIframe);
    setTimeout(() => {
        testeIframe.remove(); // Remove após o teste
    }, 1000);
}
