/* ===================================
   MODÜL 7: MEYDAN OKUMA JS (GELİŞMİŞ NAVİGASYON)
   =================================== */

   document.addEventListener("DOMContentLoaded", function () {
    const tabsContainer = document.getElementById('challenge-tabs');
    const tabContents = document.querySelectorAll('.tab-content');
    const challengeContainer = document.querySelector('.challenge-container');
    const progressBar = document.getElementById('challenge-progress-bar');
    const prevTaskBtn = document.getElementById('prev-task-btn');
    const nextTaskBtn = document.getElementById('next-task-btn');

    const totalTasks = 4;
    const tabOrder = ['tab-scenario', 'tab-task1', 'tab-task2', 'tab-task3', 'tab-task4', 'tab-conclusion'];
    
    let progress = { '1': false, '2': false, '3': false, '4': false };

    /**
     * İlerleme çubuğunu ve sekmelerdeki onay işaretlerini günceller
     */
    function updateProgress() {
        const completedTasks = Object.values(progress).filter(Boolean).length;
        const percentage = (completedTasks / totalTasks) * 100;
        
        progressBar.style.width = percentage + '%';
        progressBar.textContent = Math.round(percentage) + '%';
        
        for(const taskNumber in progress) {
            if (progress[taskNumber]) {
                const tabButton = document.querySelector(`.tab-button[data-target="tab-task${taskNumber}"]`);
                if (tabButton && !tabButton.querySelector('.fa-check-circle')) {
                    tabButton.innerHTML += ' <i class="fas fa-check-circle"></i>';
                }
            }
        }
    }
    
    /**
     * Önceki/Sonraki butonlarının durumunu ve metnini günceller
     */
    function updateNavButtons(currentTabId) {
        const currentIndex = tabOrder.indexOf(currentTabId);
        
        // Önceki Buton
        prevTaskBtn.disabled = (currentIndex <= 0);
        
        // Sonraki Buton
        nextTaskBtn.disabled = (currentIndex >= tabOrder.length - 1);

        if (currentIndex === 0) {
            // İlk sekme (Senaryo)
            nextTaskBtn.textContent = 'Hadi Başlayalım! →';
        } else {
            // Diğer tüm sekmeler
            nextTaskBtn.textContent = 'Sonraki Adım →';
        }
    }

    /**
     * Belirtilen sekmeye geçer ve navigasyon butonlarını günceller
     */
    function switchToTab(targetId) {
        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        tabButtons.forEach(btn => btn.classList.remove('active'));
        
        const activeTabButton = document.querySelector(`.tab-button[data-target="${targetId}"]`);
        if(activeTabButton) activeTabButton.classList.add('active');

        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === targetId);
        });
        
        updateNavButtons(targetId);
    }

    // Sekme (Tab) Değiştirme Mantığı
    if (tabsContainer) {
        tabsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('tab-button')) {
                switchToTab(e.target.getAttribute('data-target'));
            }
        });
    }
    
    // Önceki/Sonraki Butonları Mantığı
    if(prevTaskBtn && nextTaskBtn) {
        prevTaskBtn.addEventListener('click', () => {
            const currentActiveTab = document.querySelector('.tab-button.active');
            const currentId = currentActiveTab.getAttribute('data-target');
            const currentIndex = tabOrder.indexOf(currentId);
            if(currentIndex > 0) {
                switchToTab(tabOrder[currentIndex - 1]);
            }
        });
        
        nextTaskBtn.addEventListener('click', () => {
            const currentActiveTab = document.querySelector('.tab-button.active');
            const currentId = currentActiveTab.getAttribute('data-target');
            const currentIndex = tabOrder.indexOf(currentId);
            if(currentIndex < tabOrder.length - 1) {
                switchToTab(tabOrder[currentIndex + 1]);
            }
        });
    }

    // Cevapları Kontrol Etme Mantığı
    if (challengeContainer) {
        challengeContainer.addEventListener('click', function(e) {
            const targetButton = e.target;

            // Quiz ve Formül görevleri
            if (targetButton.matches('button[data-task]')) {
                const taskNumber = targetButton.getAttribute('data-task');
                const feedbackEl = document.getElementById(`feedback-task${taskNumber}`);
                let isCorrect = false;

                if (taskNumber === '1') {
                    const selected = document.querySelector('input[name="q1"]:checked');
                    if (selected && selected.value === 'b') isCorrect = true;
                } else if (taskNumber === '2') {
                    const formulaInput = document.getElementById('formula-input-task2');
                    const userInput = formulaInput.value.toLowerCase().replace(/ /g, '').replace(';', ',');
                    const expected = 'sumifs(c:c,a:a,"marmara",b:b,"elektronik")';
                    if (userInput.includes(expected) || userInput.includes(expected.replace('sumifs', 'çoketopla'))) isCorrect = true;
                } else if (taskNumber === '3') {
                     const selected = document.querySelector('input[name="q3"]:checked');
                    if (selected && selected.value === 'b') isCorrect = true; 
                } else if (taskNumber === '4') {
                    const selectedIcon = document.querySelector('.chart-icon-wrapper.selected');
                    if (selectedIcon && selectedIcon.dataset.chartType === 'bar') isCorrect = true;
                }

                if (isCorrect) {
                    feedbackEl.textContent = "Tebrikler, doğru cevap! Bir sonraki göreve yönlendiriliyorsunuz...";
                    feedbackEl.className = "feedback-message success";
                    
                    if (!progress[taskNumber]) {
                        progress[taskNumber] = true;
                        updateProgress();
                    }
                    
                    const nextTaskNumber = parseInt(taskNumber) + 1;
                    setTimeout(() => {
                        const targetTab = (nextTaskNumber <= totalTasks) ? `tab-task${nextTaskNumber}` : 'tab-conclusion';
                        switchToTab(targetTab);
                    }, 1500);

                } else {
                    let errorMessage = "Tam olarak değil, lütfen tekrar deneyin veya önceki modülleri gözden geçirin.";
                    if (taskNumber === '4') {
                        errorMessage = "Tam olarak değil. Hangi grafik türünün kategorik karşılaştırma için en iyisi olduğunu hatırlayın.";
                    }
                    feedbackEl.textContent = errorMessage;
                    feedbackEl.className = "feedback-message error";
                }
            } 
            // Grafik ikonlarına tıklama
            else if (e.target.closest('.chart-icon-wrapper')) {
                 document.querySelectorAll('.chart-icon-wrapper').forEach(icon => {
                    icon.style.borderColor = 'transparent';
                    icon.classList.remove('selected');
                 });
                 const iconWrapper = e.target.closest('.chart-icon-wrapper');
                 iconWrapper.style.borderColor = '#007bff';
                 iconWrapper.classList.add('selected');
            }
        });
    }
    
    // İlk Yükleme
    switchToTab('tab-scenario'); // İlk sekmeyi aktif et ve butonları ayarla
    updateProgress(); // Başlangıç ilerlemesini göster
});

