import solutionsData from './data/solucoes.json' with { type: 'json' };

interface Solution {
    id: number;
    img: string[];
    titulo: string;
    descricao: string;
    garantia: boolean;
}

const solutions: Solution[] = solutionsData as Solution[];
const urlParams = new URLSearchParams(window.location.search);
const paramId = urlParams.get('id');

let currentSolutionIndex = paramId !== null ? parseInt(paramId, 10) : 0;
let currentImageIndex = 0;

const changerContainer = document.getElementById('changer');
const infoSlTitle = document.querySelector('#info-sl h1');
const infoSlDesc = document.getElementById('description-solucoes-header');
const garantiaStatus = document.getElementById('garantia-status');

function renderCarrossel(solIndex: number, imgIndex: number) {
    const sol = solutions[solIndex];
    if (!changerContainer || !sol) return;

    if (infoSlTitle) infoSlTitle.textContent = sol.titulo;
    if (infoSlDesc) infoSlDesc.textContent = sol.descricao;
    if (garantiaStatus) garantiaStatus.textContent = sol.garantia ? "Com garantia" : "Sem garantia";

    changerContainer.innerHTML = `
        <span id="changer-back">&lsaquo;</span>
        <div id="dots-container" style="display: flex; flex-direction: row; align-items: center; gap: 6px;"></div>
        <span id="changer-next">&rsaquo;</span>
    `;

    const dotsContainer = document.getElementById('dots-container');

    if (dotsContainer && sol.img) {
        sol.img.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            
            if (i === imgIndex) {
                dot.classList.add('active');
            }

            dot.addEventListener('click', () => {
                currentImageIndex = i;
                renderCarrossel(currentSolutionIndex, currentImageIndex);
            });

            dotsContainer.appendChild(dot);
        });
    }

    const btnBack = document.getElementById('changer-back');
    if (btnBack) {
        btnBack.onclick = () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                renderCarrossel(currentSolutionIndex, currentImageIndex);
            }
        };
    }

    const btnNext = document.getElementById('changer-next');
    if (btnNext) {
        btnNext.onclick = () => {
            if (sol.img && currentImageIndex < sol.img.length - 1) {
                currentImageIndex++;
                renderCarrossel(currentSolutionIndex, currentImageIndex);
            }
        };
    }
}

if (changerContainer) {
    renderCarrossel(currentSolutionIndex, currentImageIndex);
}

const gridContainer = document.getElementById('solutions-grid');
const gridContainerIndex = document.getElementById('cards-container')

if (gridContainer) {
    gridContainer.innerHTML = solutions.map((sol) => `
        <div class="card" data-index="${sol.id}">
            <div class="card-header">
                <div class="solucoes-card-img" style="background-image: url('${sol.img[0] || ''}'); background-size: cover;"></div>
                <h3 id="main-solucoes-img-txt">${sol.titulo}</h3>
            </div>
            <div class="card-body">
                <p><strong><span class="material-symbols-outlined escudo">shield</span>
                    <span>${sol.garantia ? "Com Garantia" : "Sem Garantia"}</span></strong></p>
                <p>${sol.descricao}</p>
            </div>
            <div class="card-btn" data-index="${sol.id}">Conhecer</div>
        </div>
    `).join('');

    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = (e.currentTarget as HTMLElement).getAttribute('data-index');
            const isInsidePages = window.location.pathname.includes('/pages/');
            
            if (isInsidePages) {
                window.location.href = `solucoes.html?id=${index}`;
            } else {
                window.location.href = `src/pages/solucoes.html?id=${index}`;
            }
        });
    });
} else if (gridContainerIndex) {
    gridContainerIndex.innerHTML = solutions.slice(0, 4).map((sol) => `
        <div class="card" data-index="${sol.id}">
            <div class="card-header">
                <div class="solucoes-card-img" style="background-image: url('${sol.img[0] || ''}'); background-size: cover;"></div>
                <h3 id="main-solucoes-img-txt">${sol.titulo}</h3>
            </div>
            <div class="card-body">
                <p><strong><span class="material-symbols-outlined escudo">shield</span>
                    <span>${sol.garantia ? "Com Garantia" : "Sem Garantia"}</span></strong></p>
                <p>${sol.descricao}</p>
            </div>
            <div class="card-btn" data-index="${sol.id}">Conhecer</div>
        </div>
    `).join('');

    document.querySelectorAll('.card-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = (e.currentTarget as HTMLElement).getAttribute('data-index');
            
            const isInsidePages = window.location.pathname.includes('/pages/');
            if (isInsidePages) {
                window.location.href = `solucoes.html?id=${index}`;
            } else {
                window.location.href = `src/pages/solucoes.html?id=${index}`;
            }
        });
    });
}

const fullScreenBtn = document.getElementById('fullscr-solucoes');

if (fullScreenBtn) {
    fullScreenBtn.addEventListener('click', () => {
        const sol = solutions[currentSolutionIndex];
        if (!sol || !sol.img) return;

        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');

        modalOverlay.innerHTML = `
            <div class="modal-content" style="background-image: url('${sol.img[currentImageIndex] || ''}'); background-size: cover; background-position: center;">
                <div class="modal-controls">
                    <div id="modal-changer">
                        <span id="modal-back" style="font-size: 1.8rem; font-weight: bold; cursor: pointer; user-select: none;">&lsaquo;</span>
                        <div id="modal-dots" style="display: flex; gap: 6px; align-items: center;"></div>
                        <span id="modal-next" style="font-size: 1.8rem; font-weight: bold; cursor: pointer; user-select: none;">&rsaquo;</span>
                    </div>
                    
                    <div id="modal-title-center">
                        <span>${sol.titulo}</span>
                    </div>

                    <div id="modal-close-container">
                        <div id="modal-close" class="modal-close">
                            <span class="material-symbols-outlined">
                                zoom_in_map
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const modalDotsContainer = modalOverlay.querySelector('#modal-dots');
        if (modalDotsContainer) {
            sol.img.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentImageIndex) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    currentImageIndex = i;
                    renderCarrossel(currentSolutionIndex, currentImageIndex);
                    modalOverlay.remove();
                    fullScreenBtn.click();
                });
                modalDotsContainer.appendChild(dot);
            });
        }

        modalOverlay.querySelector('#modal-back')?.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                currentImageIndex--;
                renderCarrossel(currentSolutionIndex, currentImageIndex);
                modalOverlay.remove();
                fullScreenBtn.click();
            }
        });

        modalOverlay.querySelector('#modal-next')?.addEventListener('click', () => {
            if (sol.img && currentImageIndex < sol.img.length - 1) {
                currentImageIndex++;
                renderCarrossel(currentSolutionIndex, currentImageIndex);
                modalOverlay.remove();
                fullScreenBtn.click();
            }
        });

        const closeModal = () => modalOverlay.remove();
        modalOverlay.querySelector('#modal-close')?.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    });
}
