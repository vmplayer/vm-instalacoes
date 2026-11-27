import { Autoatendimento } from "./Autoatendimento";

// Sistema de Atendimento Inteligente

const msg = new Autoatendimento("Olá!");

document.addEventListener('submit', (e) => {
    const form = e.target as HTMLFormElement;

    if (!form.querySelector('#auto-submit-btn')) return;

    e.preventDefault();

    const autoNome = form.querySelector<HTMLInputElement>('#auto-nome');
    const autoCidade = form.querySelector<HTMLInputElement>('#auto-cidade');
    const autoServico = form.querySelector<HTMLSelectElement>('#auto-servico');
    const autoDetalhes = form.querySelector<HTMLTextAreaElement>('#auto-detalhes');

    if (!autoNome || !autoCidade || !autoServico || !autoDetalhes) return;

    msg.altMsg(`*Nome:* ${autoNome.value}.\n\n*Cidade:* ${autoCidade.value}.\n\n*Solução:* ${autoServico.value}.\n\n${autoDetalhes.value}`);
    msg.sendMessage();
});

// Sistema de copiar o número de celular para a área de transferência do usuário

async function copiarTexto(): Promise<void> {
    const copyBtn = document.getElementById('copy-btn') as HTMLSpanElement | null;

    if (!copyBtn) return;

    try {
        await navigator.clipboard.writeText("+5551997445796");

        copyBtn.textContent = "check";

        setTimeout(() => {
            if (copyBtn) {
                copyBtn.textContent = "content_copy";
            }
        }, 2000);

    } catch (err) {
        copyBtn.textContent = "error";
        
        console.error("Erro ao acessar a área de transferência:", err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById('copy-btn');
    if (btn) {
        btn.addEventListener('click', copiarTexto);
    }
});

// Sistema de menu hambúrguer

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-icon') as HTMLSpanElement | null;
    const navBar = document.querySelector('nav') as HTMLElement | null;

    if (!menuBtn || !navBar) return;

    const desktopQuery = window.matchMedia('(min-width: 992px)');

    const closeMobileMenu = () => {
        navBar.setAttribute('hidden', '');
        menuBtn.setAttribute('aria-expanded', 'false');
    };

    const syncMenuState = (isDesktop: boolean, forceShowOnDesktop = false) => {
        if (isDesktop) {
            if (forceShowOnDesktop) {
                navBar.removeAttribute('hidden');
            }
            const isHidden = navBar.hasAttribute('hidden');
            menuBtn.setAttribute('aria-expanded', String(!isHidden));
        } else {
            closeMobileMenu();
        }
    };

    if (desktopQuery.matches) {
        navBar.removeAttribute('hidden');
        menuBtn.setAttribute('aria-expanded', 'true');
    } else {
        closeMobileMenu();
    }

    desktopQuery.addEventListener('change', (event) => {
        if (event.matches) {
            syncMenuState(true, true);
        } else {
            syncMenuState(false);
        }
    });

    menuBtn.setAttribute('role', 'button');
    menuBtn.setAttribute('tabindex', '0');

    const toggleMenu = () => {
        const isHidden = navBar.toggleAttribute('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isHidden));
    };

    menuBtn.addEventListener('click', toggleMenu);
    menuBtn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });

    navBar.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (window.innerWidth <= 991 && !target.closest('.item')) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && window.innerWidth <= 991 && !navBar.hasAttribute('hidden')) {
            closeMobileMenu();
        }
    });
});

// Marquee da desgraça lá que não pega

function atualizarMarqueeTitulos(): void {
    const headers = document.querySelectorAll<HTMLElement>('div.card-header');

    headers.forEach((header) => {
        const h3 = header.querySelector<HTMLElement>('h3');
        if (!h3) return;

        h3.style.setProperty('--scroll-dist', '0px');
        header.setAttribute('data-overflow', 'false');

        const diferenca = (h3.scrollWidth + 15) - header.clientWidth;

        if (diferenca > 2) {
            header.setAttribute('data-overflow', 'true');
            h3.style.setProperty('--scroll-dist', `-${Math.ceil(diferenca)}px`);
        }
    });
}

document.addEventListener('DOMContentLoaded', atualizarMarqueeTitulos);
window.addEventListener('resize', atualizarMarqueeTitulos);
