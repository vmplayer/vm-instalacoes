import solutionsData from './data/solucoes.json' with { type: 'json' };

export class Modal {
    private modal: HTMLDivElement;
    
    constructor (data?: HTMLDivElement) {
        this.modal = data ?? document.createElement('div');
    }

    mkModal(): void {
        this.modal.classList.add('modal-auto');
    
        this.modal.innerHTML = `
            <div id="modal-auto-bg">
                <div id="modal-auto-header">
                    <h2>Atendimento Inteligente</h2>
                    <div id="auto-right-options">
                        <span class="material-symbols-outlined" id="help-btn">help</span>
                        <span class="material-symbols-outlined" id="close-btn">close</span>
                    </div>
                </div>
                <hr id="linha-quebra">
                <div class="modal-auto-form">
                    <form>
                        <div class="form-group">
                            <label for="auto-nome">Nome: </label>
                            <input type="text" id="auto-nome" placeholder="Digite seu nome completo" autocomplete="name" required>
                        </div>

                        <div class="form-group">
                            <label for="auto-cidade">Cidade: </label>
                            <input type="tel" id="auto-cidade" placeholder="Ex.: São Leopoldo" autocomplete="adress-level2" required>
                        </div>

                        <div class="form-group">
                            <label for="auto-servico">Qual solução você precisa?</label>
                            <select id="auto-servico" required>
                                <option value="" disabled selected>Selecione uma opção...</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="auto-detalhes">Detalhes do atendimento</label>
                            <textarea id="auto-detalhes" autocomplete="none" rows="8" placeholder="Descreva brevemente o que está acontecendo ou o que precisa..."></textarea>
                        </div>

                        <button type="submit" id="auto-submit-btn">
                            Iniciar Atendimento
                        </button>
                        <p style="text-align: center;">Por favor, envie as imagens na conversa quando entrar em contato.</p>
                    </form>

                    <div class="modal-auto-preview">
                        <div id="auto-how">
                            <div id="auto-how-header">
                                <span id="auto-how-opt">
                                    <h2>Como funciona?</h2>
                                    <span class="material-symbols-outlined" id="close-help-btn">close</span>
                                </span>
                                <hr id="linha-quebra">
                            </div>
                            <div id="auto-how-txt">
                                <h2>1. Selecione o Serviço</h2>
                                <p>Navegue pelas nossas soluções especializadas em instalações e manutenções e escolha exatamente o que você precisa para o seu projeto.</p>
                                <br>
                                <h2>2. Informe os Dados no Modal</h2>
                                <p>Insira seu nome, cidade e descreva brevemente o seu problema ou necessidade no nosso sistema inteligente de triagem.</p>
                                <br>
                                <h2>3. Pronto, Fale Conosco</h2>
                                <p>O sistema formata o seu pedido automaticamente e te conecta direto com o nosso técnico pelo WhatsApp para agilizar o orçamento.</p>
                                <br><br>
                                <div id="modal-advice">
                                    <strong><span class="material-symbols-outlined" id="info-icon">info</span></strong><br>
                                    <p><i>Quando pressionar o botão de <strong>"Iniciar Atendimento"</strong>, o <strong>WhatsApp será aberto com uma mensagem pronta</strong>, utilizando todos os dados preenchidos acima.<i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const serviceSelect = this.modal.querySelector<HTMLSelectElement>('#auto-servico');
        if (serviceSelect) {
            solutionsData.forEach(sol => {
                const option = document.createElement('option');
                option.value = sol.titulo;
                option.textContent = sol.titulo;
                serviceSelect.appendChild(option);
            });
        }

        const closeBtn = this.modal.querySelector('#close-btn');
        closeBtn?.addEventListener('click', () => {
            this.rmModal();
        });
    }


    rmModal(): void {
        this.modal.remove();
    }
}

const modalContainer = document.querySelector<HTMLDivElement>('.modal-auto');

if (modalContainer) {
    const modal = new Modal(modalContainer);
    modal.mkModal();
}
