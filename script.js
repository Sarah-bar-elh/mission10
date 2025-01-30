document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('#table_inv tbody');
    const lastLine = document.querySelector('.lastrow');
    const sousTotalSpan = document.querySelector('#sousTotal');
    const remiseInput = document.querySelector('#remise');
    const sousTotalApresRemiseSpan = document.querySelector('#sousTotalApresRemise');
    const taxeTotaleSpan = document.querySelector('#taxeTotale');
    const expeditionInput = document.querySelector('#expedition');
    const soldeSpan = document.querySelector('#solde');

    function calculerLigne(row) {
        const qte = row.querySelector('.qte').value;
        const prix = row.querySelector('.prix').value;
        const totalCell = row.querySelector('.total');
        const total = qte * prix;
        totalCell.value = total.toFixed(2);
    }

    function calculerSousTotal() {
        let sousTotal = 0;
        table.querySelectorAll('.row').forEach(row => {
            const total = parseFloat(row.querySelector('.total').value) || 0;
            sousTotal += total;
        });
        sousTotalSpan.textContent = sousTotal.toFixed(2);
        return sousTotal;
    }

    function mettreAJourCalculs() {
        const sousTotal = calculerSousTotal();
        const remise = parseFloat(remiseInput.value) || 0;
        const sousTotalApresRemise = sousTotal * (1 - remise / 100);
        sousTotalApresRemiseSpan.textContent = sousTotalApresRemise.toFixed(2);

        const taxeTotale = sousTotalApresRemise * 0.1;
        taxeTotaleSpan.textContent = taxeTotale.toFixed(2);

        const expedition = parseFloat(expeditionInput.value) || 0;
        const solde = sousTotalApresRemise + taxeTotale + expedition;
        soldeSpan.textContent = solde.toFixed(2);
    }

    document.querySelector('#calculer').addEventListener('click', () => {
        mettreAJourCalculs();
    });

    document.querySelector('#ajouterLigne').addEventListener('click', () => {
        const newRow = lastLine.cloneNode(true);
        newRow.querySelectorAll('input').forEach(input => input.value = '');
        table.insertBefore(newRow, lastLine);
    });

    document.querySelector('#remplirAuto').addEventListener('click', () => {
        table.querySelectorAll('.row').forEach(row => {
            row.querySelector('.desc').value = 'Article exemple';
            row.querySelector('.qte').value = 1;
            row.querySelector('.prix').value = 10;
            calculerLigne(row);
        });
        mettreAJourCalculs();
    });

    document.querySelector('#annuler').addEventListener('click', () => {
        table.querySelectorAll('.row').forEach(row => {
            row.querySelectorAll('input').forEach(input => input.value = '');
        });
        mettreAJourCalculs();
    });

    table.addEventListener('input', (e) => {
        if (e.target.classList.contains('qte') || e.target.classList.contains('prix')) {
            const row = e.target.closest('.row');
            calculerLigne(row);
            mettreAJourCalculs();
        }
    });
    // pour le bouton
    document.getElementById("btn-retour").addEventListener("click", function() {
        window.location.href = "https://sarah-bar-elh.github.io/newbst_sio/mission.html";
    });
});
