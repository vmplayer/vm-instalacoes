import { Autoatendimento } from "./Autoatendimento";
import solutionsData from './solucoes.json' with { type: 'json' };

let msg: Autoatendimento = new Autoatendimento ("Olá!");

const gridContainer = document.getElementById('solutions-grid');

if (gridContainer) {
    gridContainer.innerHTML = solutionsData.map(sol => `
        <div class="card-header">
            <div class="solucoes-card-img"></div>
            <h3 id="main-solucoes-img-txt">Elétrica</h3>
        </div>
        <div class="card-body">
            <p><strong><span class="material-symbols-outlined escudo">shield</span>
                <span>Com Garantia</span></strong></p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ipsa. Distinctio, officiis. Ea hic magni soluta facilis aspernatur, amet cupiditate quia sed itaque modi obcaecati minus tempora iusto quod voluptates!</p>
        </div>
        <div class="card-btn">Conhecer</div>
    `).join('');
}
