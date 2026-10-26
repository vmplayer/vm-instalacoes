import solutionsData from './solucoes.json' with { type: 'json' };

interface Solution {
    id: number;
    img: string[];
    titulo: string;
    descricao: string;
    garantia: boolean;
}

const solutions: Solution[] = solutionsData as Solution[];

let currentSolutionIndex = 0;
let currentImageIndex = 0;

function renderCarrossel(solIndex: number, imgIndex: number) {
    const sol = solutions[solIndex];
    const changerContainer = document.getElementById('changer');
    
    if (!changerContainer || !sol) return;

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

    document.getElementById('changer-back')?.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            renderCarrossel(currentSolutionIndex, currentImageIndex);
        }
    });

    document.getElementById('changer-next')?.addEventListener('click', () => {
        if (sol.img && currentImageIndex < sol.img.length - 1) {
            currentImageIndex++;
            renderCarrossel(currentSolutionIndex, currentImageIndex);
        }
    });
}

renderCarrossel(currentSolutionIndex, currentImageIndex);