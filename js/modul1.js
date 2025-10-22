/* ===================================
   MODÜL 1: TÜM FONKSİYONLAR
   (modul1-1.html ve modul1-2.html için)
   =================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ========================
       MODÜL 1.1 FONKSİYONLARI
       ======================== */

    // 1. Formül Çevirici
    const formulaTrInput = document.getElementById('formula-tr');
    const formulaEnInput = document.getElementById('formula-en');
    const formulaDictionary = {
        "eğer": "IF", "düşeyara": "VLOOKUP", "topla.çarpım": "SUMPRODUCT",
        "eğersay": "COUNTIF", "eğertopla": "SUMIF", "çoketopla": "SUMIFS",
        "çokeğersay": "COUNTIFS", "indis": "INDEX", "kaçıncı": "MATCH",
        "yatayara": "HLOOKUP", "parçaal": "MID", "soldan": "LEFT",
        "sağdan": "RIGHT", "uzunluk": "LEN", "birleştir": "CONCATENATE",
        "metneçevir": "TEXT", "eğerhata": "IFERROR", "ve": "AND",
        "yada": "OR", "bugün": "TODAY", "şimdi": "NOW",
        "benzersiz": "UNIQUE", "filtre": "FILTER", "sırala": "SORT"
    };

    if (formulaTrInput && formulaEnInput) {
        formulaTrInput.addEventListener('input', function () {
            let key = this.value.toLowerCase().trim();
            formulaEnInput.value = formulaDictionary[key] || '';
        });
    }

    // 2. Yapı Sekmeleri (Kötü Veri vs İyi Veri)
    const structureTabs = document.getElementById('data-structure-tabs');
    if (structureTabs) {
        const tabButtons = structureTabs.querySelectorAll('.tab-button');
        // BUG FIX: Sadece bu sekmeye ait içerikleri seçmek için `parentElement` kullanıldı
        const tabContents = structureTabs.parentElement.querySelectorAll('.tab-content');

        structureTabs.addEventListener('click', function (e) {
            if (e.target.classList.contains('tab-button')) {
                const targetId = e.target.getAttribute('data-target');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                tabContents.forEach(content => {
                    // `toggle` ile daha temiz bir kod
                    content.classList.toggle('active', content.id === targetId);
                });
            }
        });
    }

    /* ========================
       MODÜL 1.2 FONKSİYONLARI
       ======================== */

    // 1. Sıralama Simülatörü
    const sortButton = document.getElementById('sort-button');
    if (sortButton) {
        sortButton.addEventListener('click', function () {
            const select = document.getElementById('sort-by-1');
            const [sortIndex, sortDir] = select.value.split('-');
            const colIndex = parseInt(sortIndex);
            const tbody = document.getElementById('sort-table-body');
            const rows = Array.from(tbody.querySelectorAll('tr'));

            rows.sort((a, b) => {
                let valA = a.cells[colIndex].textContent.trim();
                let valB = b.cells[colIndex].textContent.trim();
                const isNumeric = !isNaN(parseFloat(valA)) && isFinite(valA);

                if (isNumeric) {
                    valA = parseFloat(valA);
                    valB = parseFloat(valB);
                }

                let comparison = 0;
                if (valA > valB) comparison = 1;
                else if (valA < valB) comparison = -1;

                return (sortDir === 'desc') ? (comparison * -1) : comparison;
            });

            rows.forEach(row => tbody.appendChild(row));
        });
    }

    // 2. Koşullu Biçimlendirme Sekmeleri
    const cfTabsContainer = document.getElementById('cf-tabs');
    if (cfTabsContainer) {
        const tabButtons = cfTabsContainer.querySelectorAll('.tab-button');
        // BUG FIX: Sadece bu sekmeye ait içerikleri seçmek için `parentElement` kullanıldı
        const tabContents = cfTabsContainer.parentElement.querySelectorAll('.tab-content');

        cfTabsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('tab-button')) {
                const targetId = e.target.getAttribute('data-target');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                tabContents.forEach(content => {
                    content.classList.toggle('active', content.id === targetId);
                });
            }
        });
    }
});

