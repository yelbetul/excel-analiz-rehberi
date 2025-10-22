/* ===================================
   MODÜL 4: GRAFİK STÜDYOSU JS
   (Rehberli Görev Sistemi ile - TAM SÜRÜM)
   =================================== */

document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Veri Seti ---
    const rawData = [
        { "Tarih": "2025-01-15", "Bölge": "Marmara", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 15000, "Maliyet": 11000, "Müşteri Segmenti": "Kurumsal" },
        { "Tarih": "2025-01-20", "Bölge": "Ege", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 8000, "Maliyet": 6000, "Müşteri Segmenti": "Bireysel" },
        { "Tarih": "2025-02-10", "Bölge": "Marmara", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 12000, "Maliyet": 9000, "Müşteri Segmenti": "Kurumsal" },
        { "Tarih": "2025-02-12", "Bölge": "Ege", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 18000, "Maliyet": 13000, "Müşteri Segmenti": "Bireysel" },
        { "Tarih": "2025-03-05", "Bölge": "Marmara", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 5000, "Maliyet": 3500, "Müşteri Segmenti": "Bireysel" },
        { "Tarih": "2025-03-08", "Bölge": "Akdeniz", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 7000, "Maliyet": 5000, "Müşteri Segmenti": "Kurumsal" },
        { "Tarih": "2025-01-25", "Bölge": "Marmara", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 11000, "Maliyet": 8000, "Müşteri Segmenti": "Kurumsal" },
        { "Tarih": "2025-02-20", "Bölge": "Ege", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 22000, "Maliyet": 16000, "Müşteri Segmenti": "Kurumsal" },
        { "Tarih": "2025-03-15", "Bölge": "Akdeniz", "Satış Temsilcisi": "Ali Veli", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 8500, "Maliyet": 6500, "Müşteri Segmenti": "Bireysel" },
        { "Tarih": "2025-01-28", "Bölge": "Marmara", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Elektronik", "Satış Tutarı": 13000, "Maliyet": 9500, "Müşteri Segmenti": "Bireysel" },
        { "Tarih": "2025-04-01", "Bölge": "Ege", "Satış Temsilcisi": "Zeynep Can", "Ürün Kategorisi": "Gıda", "Satış Tutarı": 4500, "Maliyet": 3000, "Müşteri Segmenti": "Kurumsal" },
        { "Tarih": "2025-04-05", "Bölge": "Akdeniz", "Satış Temsilcisi": "Ayşe Yılmaz", "Ürün Kategorisi": "Mobilya", "Satış Tutarı": 9000, "Maliyet": 7000, "Müşteri Segmenti": "Kurumsal" }
    ].map(d => ({ ...d, "Kâr": d["Satış Tutarı"] - d["Maliyet"] }));

    const numericFields = ["Satış Tutarı", "Maliyet", "Kâr"];
    const allFields = Object.keys(rawData[0]);

    // --- 2. Görev Senaryoları (TÜMÜ EKLENDİ) ---
    const chartScenarios = {
        regionalSales: {
            title: "Görev 1: Bölgesel Satış Performansı",
            story: "Bu analiz, şirketin en güçlü ve zayıf olduğu coğrafi bölgeleri belirlemek için yapılır. Görevi tamamlamak için talimatları izleyin.",
            steps: [
                { goal: "'Bölge' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Bölge" },
                { goal: "Harika! Şimdi sayısal bir değer olan 'Satış Tutarı' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Satış Tutarı" },
                { goal: "Süper! 'Çubuk' grafik tipini seçmek daha doğru olacaktır.", targetType: "bar" }
            ],
            finalGoal: "Mükemmel! Hangi bölgenin en yüksek satışa sahip olduğunu net bir şekilde görebilirsiniz."
        },
        repPerformance: {
            title: "Görev 2: Temsilci Performansı",
            story: "Ekip içindeki en başarılı temsilcileri ve desteğe ihtiyaç duyanları belirlemek için bu analiz kritiktir. Performans primleri ve eğitim ihtiyaçları bu analize göre şekillenebilir.",
            steps: [
                { goal: "'Satış Temsilcisi' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Satış Temsilcisi" },
                { goal: "Güzel. Şimdi 'Satış Tutarı' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Satış Tutarı" },
                { goal: "Çok sayıda kategori var. Okunabilirlik için 'Çubuk' (yatay) grafiği seçin.", targetType: "bar" }
            ],
            finalGoal: "Mükemmel! Temsilci performanslarını net bir şekilde gösteren bir çubuk grafik oluşturdunuz. Ayşe Yılmaz'ın performansını görebilirsiniz."
        },
        trendAnalysis: {
            title: "Görev 3: Aylık Satış Trendi",
            story: "İşletmenin genel sağlığını ve büyüme ivmesini görmek için zaman serisi analizi yapılır. Mevsimsellik veya kampanyaların etkisi gibi trendler bu grafikle ortaya çıkar.",
            steps: [
                { goal: "Trend analizi için 'Tarih' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Tarih" },
                { goal: "Güzel. Şimdi 'Satış Tutarı' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Satış Tutarı" },
                { goal: "Harika! Zaman serisi için en uygun grafik tipi 'Çizgi' grafiktir. Lütfen seçin.", targetType: "line" }
            ],
            finalGoal: "Başarılı! Aylık satış trendini gösteren bir çizgi grafik oluşturdun. Satışlardaki artış ve azalışları net bir şekilde görebilirsin."
        },
        regionalCategory: {
            title: "Görev 4: Bölgesel Kategori Kırılımı",
            story: "Bu analiz, hangi bölgede hangi ürün kategorisinin daha güçlü olduğunu gösterir. Çapraz satış fırsatlarını veya bölgesel ürün stratejilerini belirlemek için kullanılır.",
            steps: [
                { goal: "Kategorileri göstermek için 'Bölge' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Bölge" },
                { goal: "Değeri göstermek için 'Satış Tutarı' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Satış Tutarı" },
                { goal: "Şimdi kırılımı görmek için 'Ürün Kategorisi' alanını 'SERİLER' kutusuna sürükleyin.", targetZone: "chart-drop-series", field: "Ürün Kategorisi" },
                { goal: "Çok iyi! Bu gruplandırılmış veriyi görmek için 'Sütun' grafiği seçin.", targetType: "column" }
            ],
            finalGoal: "Tebrikler! Bölgelerin ürün kategorisi bazında satışlarını gösteren gruplandırılmış bir sütun grafik oluşturdun."
        },
        monthlyCategoryTrend: {
            title: "Görev 5: Aylık Kategori Trendleri",
            story: "Hangi ürün kategorisinin hangi dönemlerde popüler olduğunu anlamak için bu analiz yapılır. Stok yönetimi ve pazarlama kampanyalarının zamanlaması için önemlidir.",
            steps: [
                { goal: "Trendi görmek için 'Tarih' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Tarih" },
                { goal: "Değeri eklemek için 'Satış Tutarı' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Satış Tutarı" },
                { goal: "Kategorileri ayırmak için 'Ürün Kategorisi' alanını 'SERİLER' kutusuna sürükleyin.", targetZone: "chart-drop-series", field: "Ürün Kategorisi" },
                { goal: "Çoklu trendleri karşılaştırmak için 'Çizgi' grafiği seçin.", targetType: "line" }
            ],
            finalGoal: "Harika! Artık hangi kategorinin hangi ayda daha iyi performans gösterdiğini görebilirsin."
        },
        marketShare: {
            title: "Görev 6: Kategori Pazar Payı",
            story: "Toplam satışların hangi kategorilerden geldiğini oransal olarak görmek için bu analiz yapılır. Şirketin gelir kaynaklarının dağılımını anlamak için kullanılır.",
            steps: [
                { goal: "Oranları görmek için 'Ürün Kategorisi' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Ürün Kategorisi" },
                { goal: "Değerleri belirlemek için 'Satış Tutarı' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Satış Tutarı" },
                { goal: "Bir bütünün parçalarını görmek için en iyi grafik 'Pasta' grafiktir. Lütfen seçin.", targetType: "pie" }
            ],
            finalGoal: "İşte bu! Toplam gelirin en büyük dilimini hangi kategorinin oluşturduğunu net bir şekilde görebilirsin."
        },
        profitability: {
            title: "Görev 7: Kategori Kârlılığı",
            story: "En çok geliri getiren kategori, her zaman en kârlı olan olmayabilir. Bu analiz, maliyetleri de hesaba katarak hangi ürün gruplarının gerçekten kârlı olduğunu ortaya çıkarır.",
            steps: [
                { goal: "Kategorileri karşılaştırmak için 'Ürün Kategorisi' alanını 'X-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-x", field: "Ürün Kategorisi" },
                { goal: "Bu kez 'Satış Tutarı' yerine 'Kâr' alanını 'Y-EKSENİ' kutusuna sürükleyin.", targetZone: "chart-drop-y", field: "Kâr" },
                { goal: "Bu karşılaştırma için 'Çubuk' (yatay) grafiği seçmek iyi bir fikir.", targetType: "bar" }
            ],
            finalGoal: "Süper! Artık sadece gelire değil, kârlılığa göre de kategorileri analiz edebilirsin."
        }
    };


    // --- 3. Global State ve Değişkenler ---
    let chartState = { x: null, y: null, series: null, y_aggregation: 'sum' };
    let currentChartType = 'column'; // Varsayılan
    let currentDraggingItem = null;
    let myChart = null;
    let currentScenarioKey = 'regionalSales';
    let currentTaskSteps = [];
    let currentChartStep = 0;

    // --- 4. DOM Elementleri ---
    const scenarioSelector = document.getElementById('chart-scenario-select');
    const chartFieldList = document.getElementById('chart-field-list');
    const dropZones = document.querySelectorAll('.drop-zone');
    const fieldListContainer = document.querySelector('.pivot-field-list-container');
    const chartTypeButtons = document.querySelectorAll('.chart-type-selector .btn');
    const chartTitleDisplay = document.getElementById('chart-title-display');
    const analystStoryComment = document.getElementById('analyst-story-comment');
    const analystStoryText = document.getElementById('analyst-story-text');
    const studioFeedback = document.getElementById('studio-feedback');
    const storyBox = document.getElementById('chart-story-box');
    const resetChartTaskBtn = document.getElementById('reset-chart-task-btn');
    const instructionsEl = document.getElementById('chart-task-instructions');
    const instructionsP = instructionsEl ? instructionsEl.querySelector('p') : null;
    const taskTitleEl = document.getElementById('chart-task-title');
    const confettiContainer = document.getElementById('confetti-container');

    // --- 5. Sürükle & Bırak Mantığı ---
    function handleDragStart(e) {
        if (!e.target.matches('.pivot-field, .pivot-field-tag')) return;
        currentDraggingItem = e.target;
        e.dataTransfer.setData("text/plain", currentDraggingItem.getAttribute('data-field'));
        setTimeout(() => currentDraggingItem.classList.add('dragging'), 0);
    }
    function handleDragEnd(e) {
        if (currentDraggingItem) currentDraggingItem.classList.remove('dragging');
        currentDraggingItem = null;
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

    function handleDrop(e) {
        e.preventDefault();
        const dropTarget = e.target.closest('.drop-zone, .pivot-field-list-container');
        if (!dropTarget || !currentDraggingItem) return;
        dropTarget.classList.remove('drag-over');

        const fieldName = currentDraggingItem.getAttribute('data-field');

        // Durum 1: Alanı listeye geri sürükleme
        if (dropTarget.classList.contains('pivot-field-list-container')) {
            if (currentDraggingItem.classList.contains('pivot-field-tag')) {
                const originalField = document.querySelector(`.pivot-field[data-field="${fieldName}"]`);
                if (originalField) originalField.style.display = 'flex';
                currentDraggingItem.remove();
            }
        }
        // Durum 2: Alanı bir drop-zone'a sürükleme
        else if (dropTarget.classList.contains('drop-zone')) {
            const isNumeric = numericFields.includes(fieldName);
            const zoneId = dropTarget.id;

            if (zoneId === 'chart-drop-y' && !isNumeric) {
                showFeedback(`'${fieldName}' alanı sayısal olmadığı için Y-Eksenine eklenemez. Lütfen sayısal bir alan seçin.`, 'error');
                return;
            }
            if (zoneId === 'chart-drop-x' && isNumeric) {
                showFeedback(`'${fieldName}' sayısal bir alan. Genellikle X-Eksenine kategorik alanlar eklenir.`, 'info');
            } else {
                hideFeedback();
            }

            // Varsa, başka bir kutudaki etiketi kaldır
            const existingTag = document.querySelector(`.pivot-field-tag[data-field="${fieldName}"]`);
            if (existingTag) {
                if (existingTag.parentElement === dropTarget) return; // Aynı kutuya tekrar sürüklerse bişey yapma
                existingTag.remove();
            }

            // Yeni etiketi oluştur
            const fieldTag = document.createElement('span');
            fieldTag.className = 'pivot-field-tag';
            fieldTag.textContent = fieldName;
            fieldTag.setAttribute('draggable', 'true');
            fieldTag.setAttribute('data-field', fieldName);
            fieldTag.addEventListener('dragstart', handleDragStart);
            fieldTag.addEventListener('dragend', handleDragEnd);

            if (zoneId === 'chart-drop-y' && isNumeric) {
                const select = document.createElement('select');
                select.className = 'aggregation-select';
                select.innerHTML = `<option value="sum">SUM</option><option value="count">COUNT</option><option value="average">AVERAGE</option>`;
                select.addEventListener('change', (e) => {
                    chartState.y_aggregation = e.target.value;
                    checkChartTask(); // Toplama değiştiğinde de görevi kontrol et
                });
                fieldTag.appendChild(select);
            }

            dropTarget.innerHTML = ''; // Kutuyu temizle
            dropTarget.appendChild(fieldTag); // Yeni etiketi ekle

            const originalField = document.querySelector(`.pivot-field[data-field="${fieldName}"]`);
            if (originalField) originalField.style.display = 'none'; // Listedeki alanı gizle
        }

        updateChartState(); // Global state'i güncelle
        checkChartTask(); // Görevin durumunu kontrol et
    }

    function showFeedback(message, type = 'info') {
        studioFeedback.textContent = message;
        studioFeedback.className = type;
        studioFeedback.style.display = 'block';
    }
    function hideFeedback() {
        studioFeedback.style.display = 'none';
    }

    // --- 6. Grafik ve Durum Yönetimi ---
    function updateChartState() {
        const zones = ['x', 'y', 'series'];
        zones.forEach(zone => {
            const dropZone = document.getElementById(`chart-drop-${zone}`);
            const tag = dropZone ? dropZone.querySelector('.pivot-field-tag') : null;
            chartState[zone] = tag ? tag.getAttribute('data-field') : null;
        });

        const ySelect = document.querySelector('#chart-drop-y .aggregation-select');
        chartState.y_aggregation = ySelect ? ySelect.value : (numericFields.includes(chartState.y) ? 'sum' : 'count');
    }

    function renderChart() {
        const chartCanvas = document.getElementById('chart-output-canvas').getContext('2d');
        if (!chartState.x || !chartState.y) {
            if (myChart) myChart.destroy();
            analystStoryComment.style.display = 'none';
            return;
        }

        const isTimeSeries = chartState.x === 'Tarih';
        const labels = isTimeSeries
            ? [...new Set(rawData.map(item => item[chartState.x].substring(0, 7)))].sort()
            : [...new Set(rawData.map(item => item[chartState.x]))].sort();

        let datasets = [];
        let chartData;

        if (!chartState.series) {
            const data = labels.map(label => {
                const filtered = rawData.filter(item => isTimeSeries ? item[chartState.x].startsWith(label) : item[chartState.x] === label);
                if (chartState.y_aggregation === 'count') return filtered.length;
                const total = filtered.reduce((sum, item) => sum + (item[chartState.y] || 0), 0);
                if (chartState.y_aggregation === 'average') return filtered.length > 0 ? total / filtered.length : 0;
                return total;
            });
            datasets.push({
                label: `${chartState.y} (${chartState.y_aggregation.toUpperCase()})`,
                data: data,
                backgroundColor: 'rgba(0, 123, 255, 0.7)'
            });
            chartData = { labels, datasets };
        }
        else {
            const seriesLabels = [...new Set(rawData.map(item => item[chartState.series]))].sort();
            const colors = ['rgba(0, 123, 255, 0.7)', 'rgba(40, 167, 69, 0.7)', 'rgba(255, 193, 7, 0.7)'];
            datasets = seriesLabels.map((seriesLabel, index) => {
                const data = labels.map(label => {
                    const filtered = rawData.filter(item => {
                        const xMatch = isTimeSeries ? item[chartState.x].startsWith(label) : item[chartState.x] === label;
                        return xMatch && item[chartState.series] === seriesLabel;
                    });
                    if (chartState.y_aggregation === 'count') return filtered.length;
                    const total = filtered.reduce((sum, item) => sum + (item[chartState.y] || 0), 0);
                    if (chartState.y_aggregation === 'average') return filtered.length > 0 ? total / filtered.length : 0;
                    return total;
                });
                return { label: seriesLabel, data: data, backgroundColor: colors[index % colors.length] };
            });
            chartData = { labels, datasets };
        }

        if (myChart) myChart.destroy();

        let finalChartType = currentChartType;
        if (finalChartType === 'pie' && (chartState.series || isTimeSeries)) {
            finalChartType = 'bar';
            showFeedback("Pasta grafik, 'Seriler' veya 'Tarih' ekseni ile kullanılamaz. Grafik türü 'Çubuk' olarak değiştirildi.", "info");
        }

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: !!chartState.series } },
            indexAxis: (finalChartType === 'bar') ? 'y' : 'x',
        };

        let typeForChartJs = (finalChartType === 'column' || finalChartType === 'bar') ? 'bar' : finalChartType;

        if (typeForChartJs === 'bar') {
            if (options.indexAxis === 'y') { options.scales = { x: { beginAtZero: true }, y: {} }; }
            else { options.scales = { y: { beginAtZero: true }, x: {} }; }
            if (chartState.series) { options.scales.x.stacked = false; options.scales.y.stacked = false; }
        }

        if (typeForChartJs === 'line') chartData.datasets.forEach(d => { d.borderColor = d.backgroundColor; d.fill = false; d.tension = 0.2 });

        myChart = new Chart(chartCanvas, { type: typeForChartJs, data: chartData, options: options });
        updateAnalystNote();
    }

    function updateAnalystNote() {
        const { x, y, series, y_aggregation } = chartState;
        let story = '';
        if (x && y) {
            story = `Bu grafik, <strong>${x}</strong> bazında <strong>${y}</strong> metriğini <strong>${y_aggregation.toUpperCase()}</strong> işlemiyle gösteriyor. `;
            if (series) story += `Ayrıca, <strong>${series}</strong> kırılımı ile verinin alt gruplarını karşılaştırıyoruz. `;
            story += `Grafik, en yüksek değere sahip olan ${x} grubunu net bir şekilde görmemizi sağlıyor.`;
        }
        if (story) {
            analystStoryComment.style.display = 'block';
            analystStoryText.innerHTML = story;
        } else {
            analystStoryComment.style.display = 'none';
        }
    }

    // --- 7. Görev & Rehberlik Fonksiyonları (YENİ) ---
    function triggerConfetti() {
        if (!confettiContainer) return;
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDelay = Math.random() * -2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    function updateGuidance() {
        document.querySelectorAll('.highlight-guidance').forEach(el => el.classList.remove('highlight-guidance'));

        const task = currentTaskSteps[currentChartStep];
        if (!task || (currentChartStep === currentTaskSteps.length && chartScenarios[currentScenarioKey].finalGoal)) return; // Son adımdaysak rehberlik yok

        // Final goal'e ulaşıldıysa bu adıma hiç girme
        if (currentChartStep >= currentTaskSteps.length) return;

        if (task.targetZone) {
            const fieldToDrag = document.querySelector(`.pivot-field[data-field="${task.field}"]`);
            const zoneToDrop = document.getElementById(task.targetZone);
            if (fieldToDrag && fieldToDrag.style.display !== 'none') {
                fieldToDrag.classList.add('highlight-guidance');
            }
            if (zoneToDrop) {
                zoneToDrop.classList.add('highlight-guidance');
            }
        } else if (task.targetType) {
            const buttonToClick = document.querySelector(`.chart-type-selector .btn[data-chart-type="${task.targetType}"]`);
            if (buttonToClick) {
                buttonToClick.classList.add('highlight-guidance');
            }
        }
    }

    function checkChartTask() {
        if (!instructionsP) return;
        instructionsEl.classList.remove('success', 'error');

        let firstUnmetStep = -1;
        for (let i = 0; i < currentTaskSteps.length; i++) {
            const task = currentTaskSteps[i];
            let stepMet = false;

            if (task.targetZone) {
                const zoneKey = task.targetZone.split('-').pop(); // 'x', 'y', 'series'
                if (chartState[zoneKey] === task.field) {
                    stepMet = true;
                }
            } else if (task.targetType) {
                if (currentChartType === task.targetType) {
                    stepMet = true;
                }
            }

            if (!stepMet) {
                firstUnmetStep = i;
                break;
            }
        }

        // X ve Y doluysa her zaman grafiği çiz
        if (chartState.x && chartState.y) {
            renderChart();
        } else {
            if (myChart) myChart.destroy(); // X veya Y geri çekilirse grafiği sil
            analystStoryComment.style.display = 'none';
        }

        if (firstUnmetStep === -1) {
            // Tüm görevler tamamlandı
            currentChartStep = currentTaskSteps.length; // Adım sayısını aş
            instructionsP.innerHTML = `<strong>${chartScenarios[currentScenarioKey].finalGoal}</strong>`;
            instructionsEl.classList.add('success');
            triggerConfetti();
        } else {
            // Görev devam ediyor
            currentChartStep = firstUnmetStep;
            instructionsP.innerHTML = `<strong>Adım ${currentChartStep + 1}:</strong> ${currentTaskSteps[currentChartStep].goal}`;

            // Kullanıcı bir şey sürükledi ama henüz görev bitmediyse 'hata' stili
            const stateValues = Object.values(chartState).filter(v => v !== null).length;
            if (stateValues > 0 || currentChartType !== 'column') {
                instructionsEl.classList.add('error');
            }
        }

        updateGuidance();
    }

    function loadChartTask(scenarioKey) {
        currentScenarioKey = scenarioKey;
        const scenario = chartScenarios[scenarioKey];
        if (!scenario) return;

        currentTaskSteps = scenario.steps;
        currentChartStep = 0;

        // Paneli temizle
        chartState = { x: null, y: null, series: null, y_aggregation: 'sum' };
        document.querySelectorAll('.drop-zone').forEach(dz => dz.innerHTML = '');
        document.querySelectorAll('.pivot-field').forEach(pf => pf.style.display = 'flex');
        if (myChart) myChart.destroy();
        analystStoryComment.style.display = 'none';
        hideFeedback();
        chartTypeButtons.forEach(btn => btn.classList.remove('active'));
        const defaultBtn = document.querySelector('.chart-type-selector .btn[data-chart-type="column"]');
        if (defaultBtn) defaultBtn.classList.add('active');
        currentChartType = 'column';


        // Talimatları ve hikayeyi güncelle
        storyBox.innerHTML = `<h4>Senaryo Hikayesi</h4><p>${scenario.story}</p>`;
        storyBox.style.display = 'block';
        taskTitleEl.textContent = scenario.title;
        instructionsP.innerHTML = `<strong>Adım 1:</strong> ${currentTaskSteps[0].goal}`;
        instructionsEl.classList.remove('success', 'error');

        updateGuidance();
    }


    // --- 8. Başlangıç ve Olay Dinleyicileri ---
    function initialize() {
        // Hata kontrolü
        if (!scenarioSelector || !chartFieldList || !instructionsP) {
            console.error("HATA: Gerekli HTML elementleri bulunamadı. ID'leri kontrol et.");
            return;
        }

        renderExampleCharts();

        scenarioSelector.innerHTML = Object.keys(chartScenarios).map(key => `<option value="${key}">${chartScenarios[key].title}</option>`).join('');
        chartFieldList.innerHTML = allFields.map(field => `<li class="pivot-field" draggable="true" data-field="${field}"><i class="fas fa-grip-vertical"></i> ${field}</li>`).join('');

        attachAllListeners();
        loadChartTask(scenarioSelector.value); // İlk görevi yükle
    }

    function attachAllListeners() {
        document.querySelectorAll('.drop-zone, .pivot-field-list-container').forEach(target => {
            target.addEventListener('dragover', handleDragOver);
            target.addEventListener('dragleave', handleDragLeave);
            target.addEventListener('drop', handleDrop);
        });

        chartTypeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                currentChartType = e.currentTarget.getAttribute('data-chart-type');
                chartTypeButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
                hideFeedback();
                checkChartTask(); // Grafik tipi değiştiğinde de görevi kontrol et
            });
        });

        scenarioSelector.addEventListener('change', (e) => loadChartTask(e.target.value));

        resetChartTaskBtn.addEventListener('click', () => loadChartTask(currentScenarioKey));

        document.querySelectorAll('.pivot-field').forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });
    }

    function renderExampleCharts() {
        const commonOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { display: false }, x: { display: false } } };

        const colCanvas = document.getElementById('chart-example-column');
        const barCanvas = document.getElementById('chart-example-bar');
        const lineCanvas = document.getElementById('chart-example-line');
        const pieCanvas = document.getElementById('chart-example-pie');

        try {
            if (colCanvas) new Chart(colCanvas.getContext('2d'), { type: 'bar', data: { labels: ['A', 'B', 'C'], datasets: [{ data: [120, 190, 150], backgroundColor: 'rgba(0, 123, 255, 0.6)' }] }, options: { ...commonOptions, indexAxis: 'x' } });
            if (barCanvas) new Chart(barCanvas.getContext('2d'), { type: 'bar', data: { labels: ['Satış Temsilcisi A', 'B', 'C'], datasets: [{ data: [120, 190, 150], backgroundColor: 'rgba(0, 123, 255, 0.6)' }] }, options: { ...commonOptions, indexAxis: 'y' } });
            if (lineCanvas) new Chart(lineCanvas.getContext('2d'), { type: 'line', data: { labels: ['Oca', 'Şub', 'Mar', 'Nis'], datasets: [{ data: [65, 59, 80, 81], borderColor: 'rgba(40, 167, 69, 1)', fill: false, tension: 0.1 }] }, options: commonOptions });
            if (pieCanvas) new Chart(pieCanvas.getContext('2d'), { type: 'pie', data: { labels: ['Elektronik', 'Mobilya', 'Gıda'], datasets: [{ data: [300, 150, 100], backgroundColor: ['rgba(255, 193, 7, 0.7)', 'rgba(23, 162, 184, 0.7)', 'rgba(108, 117, 125, 0.7)'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
        } catch (e) {
            console.error("Örnek grafikler çizilirken hata oluştu:", e);
        }
    }

    initialize();
});