/**
 * Chatbot Widget Auto-Injetável - Gelateria Jardim Genebra
 * Versão Otimizada: Dados alinhados ao negócio, sem reload e sem conflito de init
 */
(function () {
  if (window.chatbotScriptCarregado) return;
  window.chatbotScriptCarregado = true;

  // 1. ESTILOS CSS
  const cssStyles = `
    #faq-chatbot-widget {
      font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
      position: fixed !important;
      bottom: 20px !important;
      right: 20px !important;
      z-index: 9998 !important;
    }

    #faq-toggle-btn {
      width: 60px !important;
      height: 60px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #db2777, #be185d) !important;
      color: #ffffff !important;
      border: none !important;
      box-shadow: 0 4px 14px rgba(219, 39, 119, 0.4) !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: transform 0.2s ease, box-shadow 0.2s ease !important;
    }

    #faq-toggle-btn:hover {
      transform: scale(1.05) !important;
    }

    #faq-toggle-btn:focus {
      outline: 3px solid #f472b6 !important;
      outline-offset: 2px !important;
    }

    #faq-toggle-btn:active {
      transform: scale(0.95) !important;
    }

    #faq-toggle-btn svg {
      width: 28px !important;
      height: 28px !important;
      fill: #ffffff !important;
      pointer-events: none !important;
    }

    #faq-chat-window {
      position: fixed !important;
      bottom: 90px !important;
      right: 20px !important;
      width: 360px !important;
      max-width: calc(100vw - 40px) !important;
      height: 500px !important;
      max-height: calc(100vh - 120px) !important;
      background-color: #ffffff !important;
      border-radius: 16px !important;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
      display: flex !important;
      flex-direction: column !important;
      overflow: hidden !important;
      z-index: 9998 !important;
      border: 1px solid #fce7f3 !important;
    }

    .faq-hidden {
      display: none !important;
    }

    .faq-header {
      background: linear-gradient(135deg, #db2777, #be185d) !important;
      color: #ffffff !important;
      padding: 14px 16px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
    }

    .faq-header-actions {
      display: flex !important;
      align-items: center !important;
      gap: 10px !important;
    }

    .faq-header h3 {
      margin: 0 !important;
      font-size: 15px !important;
      font-weight: 700 !important;
      color: #ffffff !important;
    }

    .faq-icon-btn {
      background: transparent !important;
      border: none !important;
      color: #ffffff !important;
      font-size: 18px !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      padding: 4px !important;
      border-radius: 6px !important;
      opacity: 0.9;
    }

    .faq-icon-btn:hover,
    .faq-icon-btn:focus {
      opacity: 1;
      background: rgba(255, 255, 255, 0.15) !important;
    }

    .faq-icon-btn:active {
      transform: scale(0.92) !important;
    }

    #faq-messages {
      flex: 1 !important;
      padding: 14px !important;
      overflow-y: auto !important;
      background-color: #fffbeb !important;
      display: flex !important;
      flex-direction: column !important;
      gap: 10px !important;
    }

    .faq-msg {
      max-width: 82% !important;
      padding: 10px 12px !important;
      border-radius: 12px !important;
      font-size: 13.5px !important;
      line-height: 1.45 !important;
    }

    .faq-msg.bot {
      align-self: flex-start !important;
      background-color: #ffffff !important;
      color: #1e293b !important;
      border: 1px solid #fbcfe8 !important;
    }

    .faq-msg.user {
      align-self: flex-end !important;
      background-color: #db2777 !important;
      color: #ffffff !important;
    }

    .faq-msg.system-info {
      align-self: center !important;
      background-color: #d1fae5 !important;
      color: #065f46 !important;
      font-size: 12px !important;
      border-radius: 8px !important;
      padding: 6px 10px !important;
      text-align: center !important;
    }

    .faq-options {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      margin-top: 4px !important;
    }

    .faq-chip {
      background-color: #fdf2f8 !important;
      color: #db2777 !important;
      border: 1px solid #fbcfe8 !important;
      padding: 7px 11px !important;
      border-radius: 16px !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      transition: background-color 0.2s ease, transform 0.1s ease !important;
    }

    .faq-chip:hover,
    .faq-chip:focus {
      background-color: #fce7f3 !important;
    }

    .faq-chip:active {
      transform: scale(0.96) !important;
    }

    .faq-footer {
      padding: 12px !important;
      background-color: #ffffff !important;
      border-top: 1px solid #fce7f3 !important;
    }

    .faq-input-area {
      display: flex !important;
      gap: 8px !important;
      margin: 0 !important;
    }

    #faq-input {
      flex: 1 !important;
      padding: 10px 14px !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 20px !important;
      font-size: 13.5px !important;
      outline: none !important;
    }

    #faq-input:focus {
      border-color: #db2777 !important;
      box-shadow: 0 0 0 2px rgba(219, 39, 119, 0.2) !important;
    }

    #faq-send-btn {
      background-color: #db2777 !important;
      color: #ffffff !important;
      border: none !important;
      width: 38px !important;
      height: 38px !important;
      border-radius: 50% !important;
      cursor: pointer !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    #faq-send-btn:hover {
      background-color: #be185d !important;
    }

    #faq-send-btn:active {
      transform: scale(0.94) !important;
    }

    #faq-send-btn svg {
      width: 18px !important;
      height: 18px !important;
      fill: #ffffff !important;
    }
  `;

  // 2. ESTRUTURA HTML
  const htmlTemplate = `
    <button id="faq-toggle-btn" type="button" aria-label="Abrir Atendimento Virtual">
      <svg id="faq-icon-open" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
      </svg>
      <svg id="faq-icon-close" viewBox="0 0 24 24" style="display: none;" aria-hidden="true">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    </button>

    <div id="faq-chat-window" class="faq-hidden" role="dialog" aria-label="Janela de Atendimento Virtual">
      <div class="faq-header">
        <h3>Atendimento Gelateria</h3>
        <div class="faq-header-actions">
          <label for="faq-json-file" class="faq-icon-btn" title="Anexar base JSON extra">📁</label>
          <input type="file" id="faq-json-file" accept=".json" style="display: none;" />
          <button type="button" id="faq-close-btn" class="faq-icon-btn" aria-label="Fechar Chat">✕</button>
        </div>
      </div>
      <div id="faq-messages"></div>
      <div class="faq-footer">
        <div class="faq-input-area">
          <input type="text" id="faq-input" placeholder="Digite sua dúvida..." autocomplete="off" />
          <button type="button" id="faq-send-btn" aria-label="Enviar mensagem">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // 3. BASE DE DADOS PADRÃO (ALINHADA À GELATERIA JARDIM GENEBRA)
  const FAQ_PADRAO = [
    {
      titulo: "🕒 Horário de Atendimento",
      keywords: ["horario", "horas", "funciona", "aberto", "fecha"],
      resposta: "Atendemos de **Segunda a Domingo, das 09:00h às 18:00h**."
    },
    {
      titulo: "💳 Formas de Pagamento",
      keywords: ["pagamento", "pagar", "pix", "cartao", "credito", "debito"],
      resposta: "Aceitamos **PIX (Copia e Cola / QR Code)** e **Cartão de Crédito ou Débito** na entrega."
    },
    {
      titulo: "📍 Localização / Endereço",
      keywords: ["onde", "endereco", "localizacao", "fica", "bairro"],
      resposta: "Estamos na **Av. Principal do Jardim Genebra, nº 123 - Jardim Genebra**."
    },
    {
      titulo: "🛵 Entrega e Taxa",
      keywords: ["prazo", "entrega", "frete", "chega", "motoboy", "taxa"],
      resposta: "Entregamos via **Motoboy em 20 a 35 min** no Jd. Genebra (taxa fixa **R$ 5,00**) ou **Retirada Grátis** no balcão."
    },
    {
      titulo: "📞 Falar no WhatsApp",
      keywords: ["contato", "atendente", "whatsapp", "telefone"],
      resposta: "Fale diretamente conosco no **WhatsApp: (19) 99876-5432**."
    }
  ];

  let baseConhecimento = [...FAQ_PADRAO];
  let jsonCarregadoUrl = null;

  function carregarJsonExterno(url, addMessageFn) {
    if (!url || jsonCarregadoUrl === url) return;
    jsonCarregadoUrl = url;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(dados => {
        if (Array.isArray(dados)) {
          baseConhecimento = [...FAQ_PADRAO, ...dados];
          if (typeof addMessageFn === "function") {
            addMessageFn(`📂 Base de conhecimento carregada (${dados.length} tópicos)`, "system-info");
          }
        }
      })
      .catch(err => console.warn("Aviso ao carregar JSON externo:", err));
  }

  // 4. FUNÇÃO DE INICIALIZAÇÃO
  window.initChatbot = function (opcoes = {}) {
    const messagesBoxExistente = document.getElementById("faq-messages");

    // Se o widget já existir na tela, apenas carrega o jsonUrl se fornecido (evita conflito de dupla chamada)
    if (document.getElementById("faq-chatbot-widget")) {
      if (opcoes.jsonUrl && messagesBoxExistente) {
        carregarJsonExterno(opcoes.jsonUrl, function (texto, tipo) {
          const div = document.createElement("div");
          div.className = `faq-msg ${tipo}`;
          div.innerHTML = texto.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
          messagesBoxExistente.appendChild(div);
        });
      }
      return;
    }

    // Injeta Estilos
    const styleTag = document.createElement("style");
    styleTag.textContent = cssStyles;
    document.head.appendChild(styleTag);

    // Injeta Widget na Raiz do Body
    const container = document.createElement("div");
    container.id = "faq-chatbot-widget";
    container.innerHTML = htmlTemplate;
    document.body.appendChild(container);

    const toggleBtn = document.getElementById("faq-toggle-btn");
    const closeBtn = document.getElementById("faq-close-btn");
    const chatWindow = document.getElementById("faq-chat-window");
    const iconOpen = document.getElementById("faq-icon-open");
    const iconClose = document.getElementById("faq-icon-close");
    const messagesBox = document.getElementById("faq-messages");
    const sendBtn = document.getElementById("faq-send-btn");
    const input = document.getElementById("faq-input");
    const jsonFileInput = document.getElementById("faq-json-file");

    function addMessage(texto, tipo) {
      const div = document.createElement("div");
      div.className = `faq-msg ${tipo}`;
      div.innerHTML = texto.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      messagesBox.appendChild(div);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function carregarMenuInicial() {
      messagesBox.innerHTML = "";
      addMessage("Olá! 👋 Bem-vindo à **Gelateria Jardim Genebra**. Como posso ajudar?", "bot");

      const optsContainer = document.createElement("div");
      optsContainer.className = "faq-options";

      FAQ_PADRAO.forEach(item => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "faq-chip";
        btn.innerText = item.titulo;
        btn.addEventListener("click", () => {
          addMessage(item.titulo, "user");
          setTimeout(() => addMessage(item.resposta, "bot"), 200);
        });
        optsContainer.appendChild(btn);
      });

      messagesBox.appendChild(optsContainer);
      messagesBox.scrollTop = messagesBox.scrollHeight;
    }

    function normalizarTexto(txt) {
      return txt
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/gi, "");
    }

    function buscarResposta(textoUsuario) {
      const queryNorm = normalizarTexto(textoUsuario);
      const palavrasUsuario = queryNorm.split(/\s+/).filter(w => w.length > 2);

      let melhorMatch = null;
      let maiorPontuacao = 0;

      baseConhecimento.forEach(item => {
        let pontos = 0;
        const pergunta = normalizarTexto(item.titulo || item.pergunta || "");
        const resposta = normalizarTexto(item.resposta || "");

        if (pergunta.includes(queryNorm) && queryNorm.length > 2) pontos += 10;

        palavrasUsuario.forEach(palavra => {
          if (pergunta.includes(palavra)) pontos += 3;
          if (resposta.includes(palavra)) pontos += 1;
          if (item.keywords && Array.isArray(item.keywords)) {
            item.keywords.forEach(kw => {
              if (normalizarTexto(kw).includes(palavra)) pontos += 4;
            });
          }
        });

        if (pontos > maiorPontuacao) {
          maiorPontuacao = pontos;
          melhorMatch = item;
        }
      });

      if (melhorMatch && maiorPontuacao >= 3) {
        return melhorMatch.resposta;
      }
      return "Não encontrei essa informação na minha base. 😅 Tente clicar em uma das opções acima ou perguntar sobre sabores, preços, entrega ou horários!";
    }

    function dispararEnvio() {
      const txt = input.value.trim();
      if (!txt) return;

      addMessage(txt, "user");
      input.value = "";

      setTimeout(() => {
        addMessage(buscarResposta(txt), "bot");
      }, 250);
    }

    function toggleChat() {
      const estaFechado = chatWindow.classList.contains("faq-hidden");
      if (estaFechado) {
        chatWindow.classList.remove("faq-hidden");
        iconOpen.style.display = "none";
        iconClose.style.display = "block";
        input.focus();
      } else {
        chatWindow.classList.add("faq-hidden");
        iconOpen.style.display = "block";
        iconClose.style.display = "none";
      }
    }

    carregarMenuInicial();

    // Carregar JSON via parâmetro opcional
    if (opcoes.jsonUrl) {
      carregarJsonExterno(opcoes.jsonUrl, addMessage);
    }

    // Carregar JSON via Upload
    jsonFileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (evt) {
        try {
          const json = JSON.parse(evt.target.result);
          if (Array.isArray(json)) {
            baseConhecimento = [...FAQ_PADRAO, ...json];
            addMessage(`📂 Base extra carregada (${json.length} itens)`, "system-info");
          }
        } catch (err) {
          addMessage("⚠️ Arquivo JSON inválido.", "system-info");
        }
      };
      reader.readAsText(file);
    });

    toggleBtn.addEventListener("click", toggleChat);
    closeBtn.addEventListener("click", toggleChat);
    sendBtn.addEventListener("click", dispararEnvio);

    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation();
        dispararEnvio();
      }
    });
  };
})();
