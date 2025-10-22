/* ===================================
   MODÜL 3.2: PIVOT TABLE ATÖLYESİ JS
   (Gelişmiş Arayüz ve Rehberlik)
   =================================== */

document.addEventListener("DOMContentLoaded", function () {

    // --- 3a. Simülasyon Veri ve Durumu ---
    const pivotRawData = [
        { "Tarih": "2025-01-05", "Bölge": "Marmara", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 15000 },
        { "Tarih": "2025-01-06", "Bölge": "Ege", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 8000 },
        { "Tarih": "2025-01-07", "Bölge": "Marmara", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 12000 },
        { "Tarih": "2025-01-10", "Bölge": "Ege", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 18000 },
        { "Tarih": "2025-01-11", "Bölge": "Marmara", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 5000 },
        { "Tarih": "2025-01-12", "Bölge": "Akdeniz", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 7000 },
        { "Tarih": "2025-01-15", "Bölge": "Marmara", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 11000 },
        { "Tarih": "2025-01-17", "Bölge": "Ege", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 22000 },
        { "Tarih": "2025-01-20", "Bölge": "Akdeniz", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 8500 },
        { "Tarih": "2025-01-21", "Bölge": "Marmara", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 13000 },
        { "Tarih": "2025-02-05", "Bölge": "Ege", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 4500 },
        { "Tarih": "2025-02-06", "Bölge": "Akdeniz", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 9000 },
        { "Tarih": "2025-02-10", "Bölge": "Marmara", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 3000 },
        { "Tarih": "2025-02-11", "Bölge": "Ege", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 6000 },
        { "Tarih": "2025-02-12", "Bölge": "Akdeniz", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 17000 },
        { "Tarih": "2025-02-15", "Bölge": "Marmara", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 14000 },
        { "Tarih": "2025-02-17", "Bölge": "Ege", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 5500 },
        { "Tarih": "2025-02-20", "Bölge": "Marmara", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 9500 },
        { "Tarih": "2025-03-01", "Bölge": "Akdeniz", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 21000 },
        { "Tarih": "2025-03-02", "Bölge": "Ege", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 11500 }
    ];

    let pivotState = { rows: null, columns: null, values: null, filters: null };

    const pivotScenarios = {
        'task1': {
            title: "Görev 1: Bölgesel Satış Raporu",
            steps: [
                { goal: "'Bölge' alanını 'SATIRLAR' kutusuna sürükleyin.", targetZone: "pivot-drop-rows", field: "Bölge" },
                { goal: "Harika! Şimdi 'Ürün Kategorisi' alanını 'SÜTUNLAR' kutusuna sürükleyin.", targetZone: "pivot-drop-columns", field: "Ürün Kategorisi" },
                { goal: "Süper. Son olarak 'Satış Tutarı' alanını 'DEĞERLER' kutusuna sürükleyin.", targetZone: "pivot-drop-values", field: "Satış Tutarı" },
                { goal: "Mükemmel! Bölgelere göre kategori satış kırılımını görüyorsunuz.", isFinal: true }
            ]
        },
        'task2': {
            title: "Görev 2: Temsilci Performansı",
            steps: [
                { goal: "'Satış Temsilcisi' alanını 'SATIRLAR' kutusuna sürükleyin.", targetZone: "pivot-drop-rows", field: "Satış Temsilcisi" },
                { goal: "Güzel. Şimdi 'Satış Tutarı' alanını 'DEĞERLER' kutusuna sürükleyin.", targetZone: "pivot-drop-values", field: "Satış Tutarı" },
                { goal: "Harika! Artık her temsilcinin toplam satışını görebilirsiniz.", isFinal: true }
            ]
        },
        'task3': {
            title: "Görev 3: Bölge-Temsilci Kırılımı",
            steps: [
                { goal: "'Bölge' alanını 'SATIRLAR' kutusuna sürükleyin.", targetZone: "pivot-drop-rows", field: "Bölge" },
                { goal: "'Satış Temsilcisi' alanını 'SÜTUNLAR' kutusuna sürükleyin.", targetZone: "pivot-drop-columns", field: "Satış Temsilcisi" },
                { goal: "'Satış Tutarı' alanını 'DEĞERLER' kutusuna sürükleyin.", targetZone: "pivot-drop-values", field: "Satış Tutarı" },
                { goal: "Mükemmel! Hangi bölgede hangi temsilcinin ne kadar satış yaptığını gösteren bir matris oluşturdunuz.", isFinal: true }
            ]
        },
        'task4': {
            title: "Görev 4: Filtrelenmiş Rapor",
            steps: [
                { goal: "'Ürün Kategorisi' alanını 'FİLTRELER' kutusuna sürükleyin.", targetZone: "pivot-drop-filters", field: "Ürün Kategorisi" },
                { goal: "Güzel! Şimdi 'Bölge' alanını 'SATIRLAR' kutusuna sürükleyin.", targetZone: "pivot-drop-rows", field: "Bölge" },
                { goal: "Son olarak, 'Satış Tutarı' alanını 'DEĞERLER' kutusuna sürükleyin.", targetZone: "pivot-drop-values", field: "Satış Tutarı" },
                { goal: "Harika! Tablonun üstündeki filtreyi kullanarak veriyi keşfedin.", isFinal: true }
            ]
        }
    };

    let currentScenarioKey = 'task1';
    let currentTaskSteps = [];
    let currentPivotStep = 0;
    let currentDraggingItem = null;

    // --- 3b. Sürükle-Bırak Fonksiyonları ---
    function handleFieldDragStart(e) {
        if (!e.target.classList.contains('pivot-field')) return;
        currentDraggingItem = e.target;
        e.dataTransfer.setData("text/plain", currentDraggingItem.getAttribute('data-field'));
        currentDraggingItem.classList.add('dragging');
    }
    function handleTagDragStart(e) {
        if (!e.target.classList.contains('pivot-field-tag')) return;
        currentDraggingItem = e.target;
        e.dataTransfer.setData("text/plain", currentDraggingItem.getAttribute('data-field'));
        currentDraggingItem.classList.add('dragging');
    }
    function handleDragEnd(e) {
        if (currentDraggingItem) {
            currentDraggingItem.classList.remove('dragging');
            currentDraggingItem = null;
        }
    }
    function handleDragOver(e) {
        e.preventDefault();
        const dropTarget = e.target.closest('.drop-zone, .pivot-field-list-container');
        if (dropTarget) dropTarget.classList.add('drag-over');
    }
    function handleDragLeave(e) {
        const dropTarget = e.target.closest('.drop-zone, .pivot-field-list-container');
        if (dropTarget) dropTarget.classList.remove('drag-over');
    }

    function handleDropOnZone(e) {
        e.preventDefault();
        const dropZone = e.target.closest('.drop-zone');
        if (!dropZone || !currentDraggingItem) return;

        dropZone.classList.remove('drag-over');
        const draggedFieldName = currentDraggingItem.getAttribute('data-field');
        const zoneKey = dropZone.id.split('-').pop();

        let previousZoneKey = null;
        for (const key in pivotState) {
            if (pivotState[key] === draggedFieldName) {
                const oldDropZone = document.getElementById(`pivot-drop-${key}`);
                if (oldDropZone && oldDropZone !== dropZone) oldDropZone.innerHTML = '';
                previousZoneKey = key;
                pivotState[key] = null;
            }
        }
        if (currentDraggingItem.classList.contains('pivot-field-tag')) {
            currentDraggingItem.remove();
        }

        const fieldTag = document.createElement('span');
        fieldTag.className = 'pivot-field-tag';
        fieldTag.textContent = draggedFieldName;
        fieldTag.setAttribute('draggable', 'true');
        fieldTag.setAttribute('data-field', draggedFieldName);
        fieldTag.addEventListener('dragstart', handleTagDragStart);
        fieldTag.addEventListener('dragend', handleDragEnd);

        dropZone.innerHTML = '';
        dropZone.appendChild(fieldTag);

        pivotState[zoneKey] = draggedFieldName;

        const originalField = document.querySelector(`.pivot-field[data-field="${draggedFieldName}"]`);
        if (originalField) originalField.style.display = 'none';

        if (zoneKey === 'filters' || previousZoneKey === 'filters') {
            renderFilterUI();
        }

        checkPivotTaskAfterUpdate();
        renderPivotTable();
    }

    function handleReturnDrop(e) {
        e.preventDefault();
        const container = e.target.closest('.pivot-field-list-container');
        if (!container || !currentDraggingItem) return;

        container.classList.remove('drag-over');
        const draggedFieldName = currentDraggingItem.getAttribute('data-field');

        const originalField = document.querySelector(`.pivot-field[data-field="${draggedFieldName}"]`);
        if (originalField) originalField.style.display = 'flex';

        if (currentDraggingItem.classList.contains('pivot-field-tag')) {
            currentDraggingItem.remove();
        }

        let wasFilter = false;
        for (const key in pivotState) {
            if (pivotState[key] === draggedFieldName) {
                if (key === 'filters') wasFilter = true;
                pivotState[key] = null;
                break;
            }
        }

        if (wasFilter) renderFilterUI();

        checkPivotTaskAfterUpdate();
        renderPivotTable();
    }

    // --- 3c. Görev, Çıktı ve Rehberlik Fonksiyonları ---

    function triggerConfetti() {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * -2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            container.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    function updateGuidance() {
        document.querySelectorAll('.highlight-guidance').forEach(el => el.classList.remove('highlight-guidance'));

        const task = currentTaskSteps[currentPivotStep];
        if (!task || task.isFinal) return;

        const fieldToDrag = document.querySelector(`.pivot-field[data-field="${task.field}"]`);
        const zoneToDrop = document.getElementById(task.targetZone);

        if (fieldToDrag && fieldToDrag.style.display !== 'none') {
            fieldToDrag.classList.add('highlight-guidance');
        }
        if (zoneToDrop) {
            zoneToDrop.classList.add('highlight-guidance');
        }
    }

    function checkPivotTaskAfterUpdate() {
        const instructionsEl = document.querySelector('#pivot-task-instructions');
        const instructionsP = instructionsEl ? instructionsEl.querySelector('p') : null;
        if (!instructionsEl || !instructionsP) return;

        instructionsEl.classList.remove('success', 'error');

        let firstUnmetStep = -1;
        for (let i = 0; i < currentTaskSteps.length; i++) {
            const task = currentTaskSteps[i];
            if (task.isFinal) break;

            const zoneKey = task.targetZone.split('-').pop();
            if (pivotState[zoneKey] !== task.field) {
                firstUnmetStep = i;
                break;
            }
        }

        if (firstUnmetStep === -1) {
            currentPivotStep = currentTaskSteps.length - 1;
            const finalTask = currentTaskSteps[currentPivotStep];
            if (finalTask && finalTask.isFinal) {
                instructionsP.innerHTML = `<strong>${finalTask.goal}</strong>`;
                instructionsEl.classList.add('success');
                triggerConfetti();
            }
        } else {
            currentPivotStep = firstUnmetStep;
            instructionsP.innerHTML = `<strong>Adım ${currentPivotStep + 1}:</strong> ${currentTaskSteps[currentPivotStep].goal}`;

            const stateValues = Object.values(pivotState).filter(v => v !== null);
            if (stateValues.length > 0) instructionsEl.classList.add('error');
        }
        updateGuidance();
    }

    function renderFilterUI() {
        const filterContainer = document.getElementById('pivot-filter-ui-container');
        if (!filterContainer) return;

        let currentSelectedValue = null;
        const oldSelect = filterContainer.querySelector('.pivot-filter-select');
        if (oldSelect) currentSelectedValue = oldSelect.value;

        filterContainer.innerHTML = '';

        if (pivotState.filters) {
            const filterField = pivotState.filters;
            const uniqueValues = ["(Tümü)", ...new Set(pivotRawData.map(item => item[filterField]))].sort();

            let html = `<div class="filter-item">
                            <label for="filter-select-${filterField}">${filterField}:</label>
                            <select id="filter-select-${filterField}" class="pivot-filter-select form-control">`;

            uniqueValues.forEach(val => {
                const isSelected = (val === currentSelectedValue) ? 'selected' : '';
                html += `<option value="${val}" ${isSelected}>${val}</option>`;
            });

            html += `</select></div>`;
            filterContainer.innerHTML = html;

            const filterSelect = document.getElementById(`filter-select-${filterField}`);
            if (filterSelect) filterSelect.addEventListener('change', renderPivotTable);
        }
    }

    function renderPivotTable() {
        const table = document.getElementById('pivot-output-table');
        if (!table) return;

        const { rows, columns, values, filters } = pivotState;

        let filteredData = [...pivotRawData];
        if (filters) {
            const filterSelect = document.getElementById(`filter-select-${filters}`);
            if (filterSelect && filterSelect.value !== "(Tümü)") {
                const filterValue = filterSelect.value;
                filteredData = pivotRawData.filter(item => item[filters] == filterValue);
            }
        }

        table.innerHTML = '<thead><tr><th>...</th></tr></thead><tbody><tr><td>Lütfen alanları sürükleyin...</td></tr></tbody>';

        if (!rows && !columns && !values) return;

        if (rows && !columns && values) {
            let aggregatedData = {};
            let grandTotal = 0;

            filteredData.forEach(item => {
                const rowKey = item[rows];
                const value = item[values] || 0;
                if (!aggregatedData[rowKey]) aggregatedData[rowKey] = 0;
                aggregatedData[rowKey] += value;
                grandTotal += value;
            });

            let html = `<thead><tr><th class="pivot-header">${rows}</th><th class="pivot-header">Toplam ${values}</th></tr></thead><tbody>`;
            const rowKeys = Object.keys(aggregatedData).sort();
            rowKeys.forEach(key => {
                html += `<tr><td class="pivot-header">${key}</td><td>${aggregatedData[key].toLocaleString('tr-TR')}</td></tr>`;
            });
            html += `<tr><td class="pivot-header">Genel Toplam</td><td><strong>${grandTotal.toLocaleString('tr-TR')}</strong></td></tr>`;
            html += `</tbody>`;
            table.innerHTML = html;
        }

        if (rows && columns && values) {
            let rowKeys = [...new Set(filteredData.map(item => item[rows]))].sort();
            let colKeys = [...new Set(filteredData.map(item => item[columns]))].sort();
            let aggregatedData = {};
            let rowTotals = {};
            let colTotals = {};
            let grandTotal = 0;

            filteredData.forEach(item => {
                const rowKey = item[rows];
                const colKey = item[columns];
                const value = item[values] || 0;

                if (!aggregatedData[rowKey]) aggregatedData[rowKey] = {};
                if (!aggregatedData[rowKey][colKey]) aggregatedData[rowKey][colKey] = 0;
                aggregatedData[rowKey][colKey] += value;

                if (!rowTotals[rowKey]) rowTotals[rowKey] = 0;
                rowTotals[rowKey] += value;

                if (!colTotals[colKey]) colTotals[colKey] = 0;
                colTotals[colKey] += value;

                grandTotal += value;
            });

            let html = '<thead><tr>';
            html += `<th class="pivot-header">${rows} \\ ${columns}</th>`;
            colKeys.forEach(colKey => html += `<th class="pivot-header">${colKey}</th>`);
            html += `<th class="pivot-header">Genel Toplam</th>`;
            html += '</tr></thead><tbody>';

            rowKeys.forEach(rowKey => {
                html += `<tr><td class="pivot-header">${rowKey}</td>`;
                colKeys.forEach(colKey => {
                    const cellValue = aggregatedData[rowKey] && aggregatedData[rowKey][colKey] ? aggregatedData[rowKey][colKey] : 0;
                    html += `<td>${cellValue.toLocaleString('tr-TR')}</td>`;
                });
                html += `<td><strong>${(rowTotals[rowKey] || 0).toLocaleString('tr-TR')}</strong></td>`;
                html += '</tr>';
            });

            html += '<tr><td class="pivot-header">Genel Toplam</td>';
            colKeys.forEach(colKey => {
                html += `<td><strong>${(colTotals[colKey] || 0).toLocaleString('tr-TR')}</strong></td>`;
            });
            html += `<td><strong>${grandTotal.toLocaleString('tr-TR')}</strong></td>`;
            html += '</tr>';

            html += '</tbody>';
            table.innerHTML = html;
        }
    }

    /* --- 3d. Modül 3 Olay Dinleyicilerini Başlatma --- */

    function initializePivotModule() {
        pivotState = { rows: null, columns: null, values: null, filters: null };
        currentPivotStep = 0;

        currentTaskSteps = pivotScenarios[currentScenarioKey].steps;

        renderFilterUI();
        renderPivotTable();

        document.querySelectorAll('.pivot-field').forEach(field => field.style.display = 'flex');
        document.querySelectorAll('.drop-zone').forEach(zone => zone.innerHTML = '');

        const taskTitleEl = document.getElementById('pivot-task-title');
        const instructionsEl = document.querySelector('#pivot-task-instructions');
        const instructionsP = instructionsEl ? instructionsEl.querySelector('p') : null;

        if (taskTitleEl) taskTitleEl.textContent = pivotScenarios[currentScenarioKey].title;
        if (instructionsP && currentTaskSteps.length > 0) {
            instructionsP.innerHTML = `<strong>Adım 1:</strong> ${currentTaskSteps[0].goal}`;
            if (instructionsEl) instructionsEl.classList.remove('success', 'error');
        }
        updateGuidance();
    }

    function loadTask(scenarioKey) {
        currentScenarioKey = scenarioKey;
        initializePivotModule();
    }

    // --- Olay Dinleyicileri ---

    const pivotFields = document.querySelectorAll('.pivot-field');
    pivotFields.forEach(field => {
        field.addEventListener('dragstart', handleFieldDragStart);
        field.addEventListener('dragend', handleDragEnd);
    });

    const allDropZones = document.querySelectorAll('.drop-zone');
    allDropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('dragleave', handleDragLeave);
        zone.addEventListener('drop', handleDropOnZone);
    });

    const fieldListContainer = document.querySelector('.pivot-field-list-container');
    if (fieldListContainer) {
        fieldListContainer.addEventListener('dragover', handleDragOver);
        fieldListContainer.addEventListener('dragleave', handleDragLeave);
        fieldListContainer.addEventListener('drop', handleReturnDrop);
    }

    const taskSelector = document.getElementById('task-selector');
    if (taskSelector) {
        taskSelector.addEventListener('change', (e) => loadTask(e.target.value));
    }

    const resetBtn = document.getElementById('reset-task-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', initializePivotModule);
    }

    loadTask('task1');
});
