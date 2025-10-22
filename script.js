/* ===================================
   ANA SAYFA (index.html) SCRİPT'İ
   =================================== */

   document.addEventListener("DOMContentLoaded", function () {

    // --- VERİ SETİ (İndirme için kullanılacak) ---
    const rawDataSet = [
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

    // 1. "Hemen Başla" butonu için yumuşak kaydırma
    const startButton = document.querySelector('.hero .btn');
    if (startButton) {
        startButton.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // ===================================
    // 2. GELİŞMİŞ QUIZ MANTIĞI
    // ===================================
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('quiz-result');

    const quizData = [
        {
            question: "Excel formülleriyle aran nasıl?",
            answers: [
                { text: "TOPLA ve ORTALAMA dışında pek kullanmam.", value: "a" },
                { text: "EĞER (IF) ve DÜŞEYARA (VLOOKUP) formüllerini biliyorum.", value: "b" },
                { text: "İNDİS-KAÇINCI (INDEX-MATCH) veya XLOOKUP benim için standart.", value: "c" }
            ]
        },
        {
            question: "Pivot Tablo sizin için ne ifade ediyor?",
            answers: [
                { text: "Nedir bilmiyorum / pek kullanmadım.", value: "a" },
                { text: "Veriyi özetlemek için sık sık kullanırım.", value: "b" },
                { text: "Hesaplanmış Alanlar ve Dilimleyiciler ile interaktif raporlar yaparım.", value: "c" }
            ]
        },
        {
            question: "Veri setin genelde nasıl görünüyor?",
            answers: [
                { text: "Karışık, çok fazla birleştirilmiş hücre ve manuel düzenleme var.", value: "a" },
                { text: "Başlıkları olan düzgün listeler halinde.", value: "b" },
                { text: "Zaten 'Tablo Olarak Biçimlendir' özelliğini hep kullanırım.", value: "c" }
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let scores = { a: 0, b: 0, c: 0 };

    function startQuiz() {
        if (!quizContainer) return;
        currentQuestionIndex = 0;
        scores = { a: 0, b: 0, c: 0 };
        resultContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        renderQuestion();
    }

    function renderQuestion() {
        if (!quizContainer) return;
        quizContainer.innerHTML = '';

        const progress = (currentQuestionIndex / quizData.length) * 100;
        const progressBarHTML = `
            <div class="quiz-progress">
                <div class="progress-bar" style="width: ${progress}%"></div>
            </div>
        `;

        const questionData = quizData[currentQuestionIndex];
        let answersHTML = '';
        questionData.answers.forEach((answer) => {
            answersHTML += `
                <label>
                    <input type="radio" name="q${currentQuestionIndex}" value="${answer.value}">
                    <span class="checkmark"></span>
                    <span>${answer.text}</span>
                </label>
            `;
        });

        const isLastQuestion = currentQuestionIndex === quizData.length - 1;
        const buttonText = isLastQuestion ? "Testi Bitir" : "İleri &rarr;";

        const questionHTML = `
            <div class="quiz-question">
                <p><strong>Soru ${currentQuestionIndex + 1}/${quizData.length}:</strong> ${questionData.question}</p>
                <div class="quiz-options">
                    ${answersHTML}
                </div>
                <button class="btn btn-next">${buttonText}</button>
                <p class="quiz-feedback" id="quiz-feedback"></p>
            </div>
        `;

        quizContainer.innerHTML = progressBarHTML + questionHTML;
        // Animasyonla göstermek için
        setTimeout(() => {
            const questionEl = quizContainer.querySelector('.quiz-question');
            if(questionEl) questionEl.classList.add('active');
        }, 50);
    }

    function handleNextClick() {
        const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
        const feedbackEl = document.getElementById('quiz-feedback');

        if (!selected) {
            // GÜNCELLEME: alert() yerine, hatayı doğrudan sayfada gösteriyoruz.
            // Bu, kullanıcı deneyimini daha akıcı hale getirir.
            if (feedbackEl) {
                feedbackEl.textContent = 'Lütfen bir seçim yapın.';
            }
            return;
        }

        scores[selected.value]++;

        const questionEl = quizContainer.querySelector('.quiz-question');
        if(questionEl) questionEl.classList.remove('active');
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                renderQuestion();
            } else {
                showResult();
            }
        }, 300);
    }

    function showResult() {
        if (!quizContainer || !resultContainer) return;
        
        quizContainer.style.display = 'none';

        let resultText = '';
        let resultLink = '#';

        let maxScore = Math.max(scores.a, scores.b, scores.c);
        let resultCategory = 'a';

        if (scores.c >= maxScore) {
            resultCategory = 'c';
        } else if (scores.b >= maxScore) {
            resultCategory = 'b';
        }
        
        if (resultCategory === 'a') {
            resultText = "Harika bir başlangıç noktasındasın! Sana <strong>Modül 1: Excel'e Hazırlık</strong> bölümünü öneriyoruz. Veriyi nasıl temizleyeceğini ve temel ayarları öğreneceksin.";
            resultLink = 'modul1-1.html';
        } else if (resultCategory === 'b') {
            resultText = "Formüllerde ustalaşma zamanı! Sana <strong>Modül 2: Formül Kütüphanesi</strong> ve <strong>Modül 3: Pivot Table Atölyesi</strong>'ni öneriyoruz.";
            resultLink = 'modul2-1.html';
        } else {
            resultText = "Sen zaten bir uzmansın! <strong>Modül 4: Görselleştirme</strong> ve <strong>Final: Meydan Okuma</strong> bölümleriyle yeteneklerini bir üst seviyeye taşı.";
            resultLink = 'modul4-1.html';
        }

        const resultTextEl = document.getElementById('result-text');
        const resultLinkEl = document.getElementById('result-link');
        
        if(resultTextEl) resultTextEl.innerHTML = resultText;
        if(resultLinkEl) resultLinkEl.href = resultLink;
        
        resultContainer.style.display = 'block';
    }

    if (quizContainer) {
        // "İleri" butonuna tıklamayı dinle
        quizContainer.addEventListener('click', function(e){
            if (e.target.classList.contains('btn-next')) {
                handleNextClick();
            }
        });

        // GÜNCELLEME: Kullanıcı bir seçenek (radio button) seçtiği anda
        // hata mesajını temizle.
        quizContainer.addEventListener('change', function(e){
            if (e.target.type === 'radio') {
                const feedbackEl = document.getElementById('quiz-feedback');
                if (feedbackEl) {
                    feedbackEl.textContent = '';
                }
            }
        });

        startQuiz();
    }

    // --- Veri Seti İndirme Mantığı ---

    function convertToCSV(objArray) {
        const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        const headers = Object.keys(array[0]);
        str += headers.join(',') + '\r\n';

        for (let i = 0; i < array.length; i++) {
            let line = '';
            for (let index in array[i]) {
                if (line != '') line += ','
                
                let value = array[i][index].toString();
                if (value.includes(',')) {
                    value = `"${value}"`;
                }
                line += value;
            }
            str += line + '\r\n';
        }
        return str;
    }

    const downloadButton = document.querySelector('.resources-section .btn');
    if (downloadButton) {
        downloadButton.textContent = 'Tüm Örnek Veri Setlerini İndir (.csv)';
        downloadButton.addEventListener('click', function(e) {
            e.preventDefault();
            const csvData = convertToCSV(rawDataSet);
            const blob = new Blob(["\uFEFF" + csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", "excel_analiz_lab_veri_seti.csv");
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }

});

