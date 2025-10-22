/* ===================================
   VERİTABANLARI (Global Sabitler)
   =================================== */

/**
 * Modül 2 - Formül Kütüphanesi Veritabanı
 * (TÜM FORMÜLLER İÇİN DOLDURULMUŞ KAPSAMLI YAPI)
 */
const formulaData = {
    // === 1. Mantıksal ===
    'if': {
        name: 'IF (EĞER)',
        desc: 'Belirttiğiniz koşul doğruysa bir değer, yanlışsa başka bir değer döndürür.',
        syntax: 'IF(şart, değer_doğruysa, değer_yanlışsa)',
        syntaxArgs: ['şart', 'değer_doğruysa', 'değer_yanlışsa'],
        note: 'Veriyi kategorilere ayırmak veya basit kararlar vermek için kullanılır. Çok fazla iç içe IF kullanmak yerine IFS veya VLOOKUP/XLOOKUP tercih edilebilir.',
        beforeAfter: {
            title: "Senaryo: Koşullu Değer Atama",
            desc: "Aşağıdaki tabloda, 10000'den yüksek satışları 'Hedefe Ulaştı' olarak etiketleyeceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Satış Tutarı</td></tr><tr><td>2</td><td>Marmara</td><td>15000</td></tr><tr><td>3</td><td>Ege</td><td>8000</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Satış Tutarı</td><td>Durum</td></tr><tr><td>2</td><td>Marmara</td><td>15000</td><td class="result-highlight">Hedefe Ulaştı</td></tr><tr><td>3</td><td>Ege</td><td>8000</td><td class="result-highlight">Hedef Altı</td></tr></tbody>`,
            appliedFormula: '=IF(B2>=10000, "Hedefe Ulaştı", "Hedef Altı")'
        },
        task: {
            goal: 'C2 hücresi için: "Satış Tutarı" (B2 Sütunu) 10000\'den büyükse "Hedefe Ulaştı", değilse "Hedef Altı" yazdırın.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>15000</td></tr>',
            result: 'Hedefe Ulaştı',
            finalFormula: 'if(b2>=10000,"hedefe ulaştı","hedef altı")',
            steps: [
                { regex: /^=if\s*\($/i, hint: 'Harika! Şimdi mantıksal şartı girin (örn: B2>=10000).', error: 'Formüle =IF( yazarak başlayın.', activeArg: 0 },
                { regex: /^=if\s*\(b2\s*(>=|=>)\s*10000\s*[,;]\s*$/i, hint: 'Şart tamam. Şimdi doğruysa ne olacağını tırnak içinde yazın (örn: "Hedefe Ulaştı").', error: 'Şartı kontrol edin. Beklenen: B2>=10000, (veya ;)', activeArg: 1 },
                { regex: /^=if\s*\(b2\s*(>=|=>)\s*10000\s*[,;]\s*".*"\s*[,;]\s*$/i, hint: 'Süper. Son olarak yanlışsa ne olacağını tırnak içinde yazın (örn: "Hedef Altı").', error: 'Doğruysa değerini tırnak içinde yazmalısınız (örn: "Hedefe Ulaştı", ...)', activeArg: 2 },
                { regex: /^=if\s*\(b2\s*(>=|=>)\s*10000\s*[,;]\s*".*"\s*[,;]\s*".*"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Yanlışsa değerini tırnak içinde yazıp parantezi kapatın (örn: "Hedef Altı")".)', activeArg: -1 }
            ]
        }
    },
    'ifs': {
        name: 'IFS (ÇOKEĞER)',
        desc: 'Birden fazla koşulu art arda test eder. İç içe IF yazma karmaşasını çözer.',
        syntax: 'IFS(şart1, değer1, [şart2, değer2], ...)',
        syntaxArgs: ['şart1', 'değer1', 'şart2', 'değer2', '...'],
        note: 'Excel 2019 ve 365\'te bulunur. C2>=90, "A", C2>=80, "B", C2>=70, "C" gibi not baremleri için idealdir.',
        beforeAfter: {
            title: "Senaryo: Not Baremi Hesaplama",
            desc: "Puanlara göre harf notlarını hesaplayacağız (90+ A, 80+ B, kalanı C).",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Öğrenci</td><td>Puan</td></tr><tr><td>2</td><td>Ali</td><td>92</td></tr><tr><td>3</td><td>Veli</td><td>85</td></tr><tr><td>4</td><td>Ayşe</td><td>77</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Öğrenci</td><td>Puan</td><td>Not</td></tr><tr><td>2</td><td>Ali</td><td>92</td><td class="result-highlight">A</td></tr><tr><td>3</td><td>Veli</td><td>85</td><td class="result-highlight">B</td></tr><tr><td>4</td><td>Ayşe</td><td>77</td><td class="result-highlight">C</td></tr></tbody>`,
            appliedFormula: '=IFS(B2>=90, "A", B2>=80, "B", B2<80, "C")'
        },
        task: {
            goal: 'C2 hücresi için: Puan (B2) 90\'dan büyükse "A", 80\'den büyükse "B", değilse "C" yazdırın.',
            sampleData: '<tr><td>2</td><td>Ali</td><td>92</td></tr>',
            result: 'A',
            finalFormula: 'ifs(b2>=90,"a",b2>=80,"b",true,"c")',
            steps: [
                { regex: /^=ifs\s*\($/i, hint: 'İlk şartı girin (örn: B2>=90).', error: 'Formüle =IFS( yazarak başlayın.', activeArg: 0 },
                { regex: /^=ifs\s*\(b2\s*(>=|=>)\s*90\s*[,;]\s*$/i, hint: 'Şart 1 tamam. Şimdi 1. sonucu yazın (örn: "A").', error: 'İlk şart B2>=90 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=ifs\s*\(b2\s*(>=|=>)\s*90\s*[,;]\s*"a"\s*[,;]\s*$/i, hint: 'Süper. Şimdi 2. şartı girin (örn: B2>=80).', error: 'İlk sonuç "A" olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=ifs\s*\(b2\s*(>=|=>)\s*90\s*[,;]\s*"a"\s*[,;]\s*b2\s*(>=|=>)\s*80\s*[,;]\s*$/i, hint: 'Şart 2 tamam. Şimdi 2. sonucu yazın (örn: "B").', error: 'İkinci şart B2>=80 olmalı, ardından , veya ; koyun.', activeArg: 3 },
                { regex: /^=ifs\s*\(b2\s*(>=|=>)\s*90\s*[,;]\s*"a"\s*[,;]\s*b2\s*(>=|=>)\s*80\s*[,;]\s*"b"\s*[,;]\s*$/i, hint: 'Harika. Kalan tüm durumlar için "TRUE" şartını kullanın.', error: 'İkinci sonuç "B" olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=ifs\s*\(b2\s*(>=|=>)\s*90\s*[,;]\s*"a"\s*[,;]\s*b2\s*(>=|=>)\s*80\s*[,;]\s*"b"\s*[,;]\s*true\s*[,;]\s*$/i, hint: 'Sonuç olarak "C" yazın.', error: 'Kalan durumlar için TRUE, yazın.', activeArg: 3 },
                { regex: /^=ifs\s*\(b2\s*(>=|=>)\s*90\s*[,;]\s*"a"\s*[,;]\s*b2\s*(>=|=>)\s*80\s*[,;]\s*"b"\s*[,;]\s*true\s*[,;]\s*"c"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Sonuç "C" olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'and-or': {
        name: 'AND / OR (VE / YADA)',
        desc: 'Genellikle IF fonksiyonu içinde birden fazla şartı birleştirmek için kullanılır.',
        syntax: 'AND(şart1, [şart2], ...) / OR(şart1, [şart2], ...)',
        syntaxArgs: ['şart1', 'şart2', '...'],
        note: 'AND, tüm şartlar doğruysa TRUE döner. OR, şartlardan en az biri doğruysa TRUE döner.',
        beforeAfter: {
            title: "Senaryo: Çoklu Koşul (AND)",
            desc: "Sadece hem bölgesi 'Marmara' OLAN hem de satışı 10000'den BÜYÜK olanlara 'Bonus' vereceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Satış</td></tr><tr><td>2</td><td>Marmara</td><td>15000</td></tr><tr><td>3</td><td>Marmara</td><td>8000</td></tr><tr><td>4</td><td>Ege</td><td>20000</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Satış</td><td>Durum</td></tr><tr><td>2</td><td>Marmara</td><td>15000</td><td class="result-highlight">Bonus</td></tr><tr><td>3</td><td>Marmara</td><td>8000</td><td class="result-highlight"></td></tr><tr><td>4</td><td>Ege</td><td>20000</td><td class="result-highlight"></td></tr></tbody>`,
            appliedFormula: '=IF(AND(A2="Marmara", B2>10000), "Bonus", "")'
        },
        task: {
            goal: 'C2 hücresi için: Hem Bölge (A2) "Marmara" İSE hem de Satış (B2) 10000\'den büyükse "Bonus", değilse "" (boş) yazdırın.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>15000</td></tr>',
            result: 'Bonus',
            finalFormula: 'if(and(a2="marmara",b2>10000),"bonus","")',
            steps: [
                { regex: /^=if\s*\($/i, hint: 'AND kullanacağımız için =IF( ile başlayın.', error: 'Formüle =IF( yazarak başlayın.', activeArg: 0 },
                { regex: /^=if\s*\(\s*and\s*\($/i, hint: 'Şimdi AND\'in ilk şartını yazın (A2="Marmara").', error: 'IF\'in şartı olarak AND( yazın.', activeArg: 0 },
                { regex: /^=if\s*\(\s*and\s*\(a2\s*=\s*"marmara"\s*[,;]\s*$/i, hint: 'AND\'in ikinci şartını yazın (B2>10000).', error: 'İlk şart A2="Marmara", olmalı, ardından , veya ; koyun.', activeArg: 0 },
                { regex: /^=if\s*\(\s*and\s*\(a2\s*=\s*"marmara"\s*[,;]\s*b2\s*(>)\s*10000\s*\)\s*[,;]\s*$/i, hint: 'AND bitti. Şimdi IF\'in "doğruysa" değerini yazın ("Bonus").', error: 'İkinci şart B2>10000 olmalı, AND\'i ) ile kapatın, sonra , veya ; koyun.', activeArg: 1 },
                { regex: /^=if\s*\(\s*and\s*\(a2\s*=\s*"marmara"\s*[,;]\s*b2\s*(>)\s*10000\s*\)\s*[,;]\s*"bonus"\s*[,;]\s*$/i, hint: 'Şimdi IF\'in "yanlışsa" değerini yazın ("").', error: 'Doğruysa değeri "Bonus" olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=if\s*\(\s*and\s*\(a2\s*=\s*"marmara"\s*[,;]\s*b2\s*(>)\s*10000\s*\)\s*[,;]\s*"bonus"\s*[,;]\s*""\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Yanlışsa değeri "" (boş metin) olmalı ve IF\'i ) ile kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'iferror': {
        name: 'IFERROR (EĞERHATA)',
        desc: 'Bir formül hata (#N/A, #DIV/0! vb.) döndürürse, bunun yerine belirlediğiniz alternatif bir değeri gösterir.',
        syntax: 'IFERROR(hesaplanacak_formül, hata_durumunda_değer)',
        syntaxArgs: ['değer', 'hata_durumunda_değer'],
        note: 'Raporlarınızı temizlemek için hayat kurtarır. Özellikle VLOOKUP ve bölme işlemlerinde kullanılır. Örn: =IFERROR(A1/B1, 0)',
        beforeAfter: {
            title: "Senaryo: Bölme Hatasını Gizleme",
            desc: "A sütununu B sütununa böleceğiz. B sütununda 0 olduğunda #DIV/0! hatası alırız. Bunu 0 olarak göstereceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Satış</td><td>Adet</td></tr><tr><td>2</td><td>100</td><td>5</td></tr><tr><td>3</td><td>70</td><td>0</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Satış</td><td>Adet</td><td>Birim Fiyat</td></tr><tr><td>2</td><td>100</td><td>5</td><td class="result-highlight">20</td></tr><tr><td>3</td><td>70</td><td>0</td><td class="result-highlight">0</td></tr></tbody>`,
            appliedFormula: '=IFERROR(A2/B2, 0)'
        },
        task: {
            goal: 'C2 hücresi için: Satış (A2) / Adet (B2) formülünü yazın. Hata verirse (0\'a bölme gibi) sonuç 0 olsun.',
            sampleData: '<tr><td>2</td><td>100</td><td>0</td></tr>',
            result: '0',
            finalFormula: 'iferror(a2/b2,0)',
            steps: [
                { regex: /^=iferror\s*\($/i, hint: 'Hata kontrolü için =IFERROR( yazın.', error: 'Formüle =IFERROR( yazarak başlayın.', activeArg: 0 },
                { regex: /^=iferror\s*\(a2\s*\/\s*b2\s*[,;]\s*$/i, hint: 'Harika. Şimdi hata durumunda ne olacağını yazın (örn: 0).', error: 'İlk değer olarak bölme işlemini (A2/B2) yazın, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=iferror\s*\(a2\s*\/\s*b2\s*[,;]\s*0\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Hata değeri 0 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },

    // === 2. Arama & Başvuru ===
    'xlookup': {
        name: 'XLOOKUP',
        desc: 'Excel 365 ile gelen, VLOOKUP\'ın yerini alan güçlü ve esnek bir arama fonksiyonudur.',
        syntax: 'XLOOKUP(aranan_değer, arama_dizisi, döndürme_dizisi, [bulunamazsa], ...)',
        syntaxArgs: ['aranan_değer', 'arama_dizisi', 'döndürme_dizisi', '[bulunamazsa]', '...'],
        note: 'XLOOKUP, VLOOKUP\'ın "sadece sağa doğru arama" ve "yanlışlıkla en yakın eşleşmeyi bulma" gibi tüm dertlerini çözer.',
        beforeAfter: {
            title: "Senaryo: Modern Arama",
            desc: "Ürün ID'sine (A sütunu) bakarak Ürün Adını (B sütunu) getireceğiz. XLOOKUP sağ/sol farketmeksizin çalışır.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>ID</td><td>Ürün</td></tr><tr><td>2</td><td>101</td><td>Kalem</td></tr><tr><td>3</td><td>102</td><td>Defter</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td>1</td><td>ID</td><td>Ürün</td><td>Aranan ID:</td><td class="result-highlight">Defter</td></tr><tr><td>2</td><td>101</td><td>Kalem</td><td>102</td><td></td></tr><tr><td>3</td><td>102</td><td>Defter</td><td></td><td></td></tr></tbody>`,
            appliedFormula: '=XLOOKUP(C2, A2:A3, B2:B3)'
        },
        task: {
            goal: 'Aşağıdaki tabloda "Ege" bölgesindeki (Sütun A) "Satış Tutarını" (Sütun C) bulun.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>Ege</td><td>Mobilya</td><td>8000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>12000</td></tr>',
            result: '8000',
            finalFormula: 'xlookup("ege",a:a,c:c)',
            steps: [
                { regex: /^=xlookup\s*\($/i, hint: '=XLOOKUP( yazarak başlayın.', error: 'Formüle =XLOOKUP( yazarak başlayın.', activeArg: 0 },
                { regex: /^=xlookup\s*\("ege"\s*[,;]\s*$/i, hint: 'Aranan değer "Ege". Şimdi nerede aranacağını seçin (A:A).', error: 'Aranan değeri tırnak içinde yazın: "Ege",', activeArg: 1 },
                { regex: /^=xlookup\s*\("ege"\s*[,;]\s*a:a\s*[,;]\s*$/i, hint: 'Arama dizisi A:A. Şimdi hangi dizinin döndürüleceğini seçin (C:C).', error: 'Arama dizisi A:A olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=xlookup\s*\("ege"\s*[,;]\s*a:a\s*[,;]\s*c:c\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Döndürme dizisi C:C olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'vlookup': {
        name: 'VLOOKUP (DÜŞEYARA)',
        desc: 'Bir tablonun ilk sütununda bir değeri arar ve aynı satırdan istediğiniz sütun numarasındaki değeri getirir.',
        syntax: 'VLOOKUP(aranan, tablo_aralığı, sütun_indis_sayısı, [aralık_bak])',
        syntaxArgs: ['aranan_değer', 'tablo_aralığı', 'sütun_indis_sayısı', 'aralık_bak (0/FALSE)'],
        note: 'En çok bilinen arama fonksiyonudur. XLOOKUP yoksa kullanılır. Sadece sola bakıp sağdan getirir ve son parametre 0 (Tam Eşleşme) olmalıdır.',
        beforeAfter: {
            title: "Senaryo: Klasik Arama (DÜŞEYARA)",
            desc: "ID'ye (ilk sütun) bakarak Ürün Adını (2. sütun) getireceğiz. (Aranan ID: 102)",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>ID</td><td>Ürün</td></tr><tr><td>2</td><td>101</td><td>Kalem</td></tr><tr><td>3</td><td>102</td><td>Defter</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>ID</td><td>Ürün</td><td class="result-highlight">Defter</td></tr><tr><td>2</td><td>101</td><td>Kalem</td><td></td></tr><tr><td>3</td><td>102</td><td>Defter</td><td></td></tr></tbody>`,
            appliedFormula: '=VLOOKUP(102, A2:B3, 2, 0)'
        },
        task: {
            goal: 'VLOOKUP kullanarak ID\'si 102 (A sütununda) olan ürünün Adını (B sütunu) bulun. Tüm tablo A:B aralığıdır.',
            sampleData: '<tr><td>2</td><td>101</td><td>Kalem</td><td></td></tr><tr><td>3</td><td>102</td><td>Defter</td><td></td></tr>',
            result: 'Defter',
            finalFormula: 'vlookup(102,a:b,2,0)',
            steps: [
                { regex: /^=vlookup\s*\($/i, hint: '=VLOOKUP( ile başlayın.', error: 'Formüle =VLOOKUP( yazarak başlayın.', activeArg: 0 },
                { regex: /^=vlookup\s*\(102\s*[,;]\s*$/i, hint: 'Aranan değer 102. Şimdi tablo aralığını seçin (A:B).', error: 'Aranan değer 102 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=vlookup\s*\(102\s*[,;]\s*a:b\s*[,;]\s*$/i, hint: 'Tablo aralığı A:B. Şimdi sütun sayısını yazın (Ürün Adı 2. sütunda).', error: 'Tablo aralığı A:B olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=vlookup\s*\(102\s*[,;]\s*a:b\s*[,;]\s*2\s*[,;]\s*$/i, hint: 'Sütun sayısı 2. Şimdi tam eşleşme için 0 veya FALSE yazın.', error: 'Sütun indis sayısı 2 olmalı, ardından , veya ; koyun.', activeArg: 3 },
                { regex: /^=vlookup\s*\(102\s*[,;]\s*a:b\s*[,;]\s*2\s*[,;]\s*(0|false)\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Eşleşme türü 0 (veya FALSE) olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'index-match': {
        name: 'INDEX & MATCH (İNDİS & KAÇINCI)',
        desc: 'Birlikte kullanıldığında VLOOKUP\'tan daha esnek bir arama yöntemi sunar. Sola doğru arama yapabilir.',
        syntax: 'INDEX(döndürme_dizisi, MATCH(aranan_değer, arama_dizisi, 0))',
        syntaxArgs: ['INDEX(döndürme_dizisi,', 'MATCH(aranan_değer,', 'arama_dizisi, 0))'],
        note: 'XLOOKUP öncesi dönemin en güçlü arama yöntemidir. MATCH, aranan değerin kaçıncı sırada olduğunu bulur. INDEX, o sıradaki değeri getirir.',
        beforeAfter: {
            title: "Senaryo: Esnek Arama (Sola Doğru)",
            desc: "Ürün Adına (B sütunu) bakarak ID'sini (A sütunu) getireceğiz. VLOOKUP bunu yapamaz. (Aranan Ürün: 'Defter')",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>ID</td><td>Ürün</td></tr><tr><td>2</td><td>101</td><td>Kalem</td></tr><tr><td>3</td><td>102</td><td>Defter</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>ID</td><td>Ürün</td><td class="result-highlight">102</td></tr><tr><td>2</td><td>101</td><td>Kalem</td><td></td></tr><tr><td>3</td><td>102</td><td>Defter</td><td></td></tr></tbody>`,
            appliedFormula: '=INDEX(A2:A3, MATCH("Defter", B2:B3, 0))'
        },
        task: {
            goal: 'INDEX/MATCH kullanarak "Mobilya" (B sütunu) ürününün "Bölge"sini (A sütunu) bulun. (Sola arama)',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td></tr><tr><td>3</td><td>Ege</td><td>Mobilya</td></tr>',
            result: 'Ege',
            finalFormula: 'index(a:a,match("mobilya",b:b,0))',
            steps: [
                { regex: /^=index\s*\($/i, hint: '=INDEX( ile başlayın.', error: 'Formüle =INDEX( yazarak başlayın.', activeArg: 0 },
                { regex: /^=index\s*\(a:a\s*[,;]\s*$/i, hint: 'Döndürülecek dizi A:A. Şimdi satır sayısını bulmak için MATCH( yazın.', error: 'Döndürülecek dizi A:A olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=index\s*\(a:a\s*[,;]\s*match\s*\($/i, hint: 'MATCH\'in aranan değerini yazın ("Mobilya").', error: 'Satır numarası için MATCH( yazın.', activeArg: 1 },
                { regex: /^=index\s*\(a:a\s*[,;]\s*match\s*\("mobilya"\s*[,;]\s*$/i, hint: 'Aranan değer "Mobilya". Şimdi nerede aranacağını yazın (B:B).', error: 'MATCH\'in aranan değeri "Mobilya" olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=index\s*\(a:a\s*[,;]\s*match\s*\("mobilya"\s*[,;]\s*b:b\s*[,;]\s*$/i, hint: 'Arama dizisi B:B. Şimdi tam eşleşme için 0 yazın.', error: 'MATCH\'in arama dizisi B:B olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=index\s*\(a:a\s*[,;]\s*match\s*\("mobilya"\s*[,;]\s*b:b\s*[,;]\s*0\s*\)\s*$/i, hint: 'MATCH bitti. Şimdi INDEX\'i kapatmak için son bir ) koyun.', error: 'Tam eşleşme için 0 yazın ve MATCH\'i ) ile kapatın.', activeArg: 2 },
                { regex: /^=index\s*\(a:a\s*[,;]\s*match\s*\("mobilya"\s*[,;]\s*b:b\s*[,;]\s*0\s*\)\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'INDEX formülünü de ) ile kapatmalısınız.', activeArg: -1 }
            ]
        }
    },

    // === 3. Özetleme ve İstatistik ===
    'sumifs': {
        name: 'SUMIFS (ÇOKETOPLA)',
        desc: 'Birden fazla kritere uyan hücrelerin toplamını hesaplar.',
        syntax: 'SUMIFS(toplam_aralığı, kriter_aralık1, kriter1, [kriter_aralık2, kriter2], ...)',
        syntaxArgs: ['toplam_aralığı', 'kriter_aralık1', 'kriter1', 'kriter_aralık2', 'kriter2', '...'],
        note: 'Pivot tablo kullanmadan hızlıca çoklu koşullu özetler almak için idealdir.',
        beforeAfter: {
            title: "Senaryo: Çoklu Koşullu Toplam",
            desc: "Sadece Bölgesi 'Marmara' olan 'Elektronik' satışlarını toplayacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Kategori</td><td>Satış</td></tr><tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>100</td></tr><tr><td>3</td><td>Ege</td><td>Elektronik</td><td>50</td></tr><tr><td>4</td><td>Marmara</td><td>Gıda</td><td>200</td></tr><tr><td>5</td><td>Marmara</td><td>Elektronik</td><td>30</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Kategori</td><td>Satış</td><td class="result-highlight">130</td></tr></tbody>`,
            appliedFormula: '=SUMIFS(C2:C5, A2:A5, "Marmara", B2:B5, "Elektronik")'
        },
        task: {
            goal: 'Aşağıdaki tabloda "Marmara" bölgesindeki (Sütun A) "Elektronik" (Sütun B) satışlarının (Sütun C) toplamını bulun.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>Ege</td><td>Elektronik</td><td>18000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>12000</td></tr>' +
                '<tr><td>5</td><td>Marmara</td><td>Elektronik</td><td>5000</td></tr>',
            result: '20000',
            finalFormula: 'sumifs(c:c,a:a,"marmara",b:b,"elektronik")',
            steps: [
                { regex: /^=sumifs\s*\($/i, hint: '=SUMIFS( ile başlayın.', error: 'Formüle =SUMIFS( yazarak başlayın.', activeArg: 0 },
                { regex: /^=sumifs\s*\(c:c\s*[,;]\s*$/i, hint: 'Önce toplam aralığını (C:C) seçin.', error: 'Toplam aralığı C:C olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=sumifs\s*\(c:c\s*[,;]\s*a:a\s*[,;]\s*$/i, hint: 'Şimdi 1. kriter aralığını (Bölge, A:A) seçin.', error: 'Kriter aralığı 1 (A:A) olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=sumifs\s*\(c:c\s*[,;]\s*a:a\s*[,;]\s*"marmara"\s*[,;]\s*$/i, hint: '1. kriteri ("Marmara") yazın. Şimdi 2. kriter aralığını (Ürün, B:B) seçin.', error: 'Kriter 1 ("Marmara") olmalı, ardından , veya ; koyun.', activeArg: 3 },
                { regex: /^=sumifs\s*\(c:c\s*[,;]\s*a:a\s*[,;]\s*"marmara"\s*[,;]\s*b:b\s*[,;]\s*$/i, hint: '2. kriter aralığı (B:B). Şimdi 2. kriteri ("Elektronik") yazın.', error: 'Kriter aralığı 2 (B:B) olmalı, ardından , veya ; koyun.', activeArg: 4 },
                { regex: /^=sumifs\s*\(c:c\s*[,;]\s*a:a\s*[,;]\s*"marmara"\s*[,;]\s*b:b\s*[,;]\s*"elektronik"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Kriter 2 ("Elektronik") olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'sumif': {
        name: 'SUMIF (ETOPLA)',
        desc: 'Belirttiğiniz bir ölçüte (koşula) uyan hücreleri toplar.',
        syntax: 'SUMIF(aralık, ölçüt, [toplam_aralığı])',
        syntaxArgs: ['aralık (ölçüt için)', 'ölçüt', '[toplam_aralığı]'],
        note: 'Tek koşullu toplamlar için kullanılır. Sadece "X" ürününün satışlarını bulmanızı sağlar.',
        beforeAfter: {
            title: "Senaryo: Koşullu Toplam Alma",
            desc: "Aşağıdaki tabloda, sadece 'Meyve' kategorisindeki ürünlerin satış tutarlarını toplayacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Kategori</td><td>Satış Tutarı</td></tr><tr><td>2</td><td>Meyve</td><td>150</td></tr><tr><td>3</td><td>Sebze</td><td>200</td></tr><tr><td>4</td><td>Meyve</td><td>100</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Kategori</td><td>Satış Tutarı</td><td class="result-highlight">250</td></tr></tbody>`,
            appliedFormula: '=SUMIF(A2:A5, "Meyve", B2:B5)'
        },
        task: {
            goal: "Görev: 'Meyve' kategorisinin (Sütun A) toplam satışını (Sütun B) bulun.",
            sampleData: `<tr><td>2</td><td>Meyve</td><td>150</td></tr><tr><td>3</td><td>Sebze</td><td>200</td></tr><tr><td>4</td><td>Meyve</td><td>100</td></tr>`,
            result: '250',
            finalFormula: 'sumif(a:a,"meyve",b:b)',
            steps: [
                { regex: /^=sumif\s*\($/i, hint: '=SUMIF( ile başlayın.', error: 'Formüle =SUMIF( yazarak başlayın.', activeArg: 0 },
                { regex: /^=sumif\s*\(a:a\s*[,;]\s*$/i, hint: 'Önce ölçüt aralığını (A:A) seçin.', error: 'Ölçüt aralığı (A:A) olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=sumif\s*\(a:a\s*[,;]\s*"meyve"\s*[,;]\s*$/i, hint: 'Şimdi ölçütü ("Meyve") yazın. Sonra toplam aralığını (B:B) seçin.', error: 'Ölçüt ("Meyve") olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=sumif\s*\(a:a\s*[,;]\s*"meyve"\s*[,;]\s*b:b\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Toplam aralığı (B:B) olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'countifs': {
        name: 'COUNTIFS (ÇOKEĞERSAY)',
        desc: 'Birden fazla kritere uyan hücrelerin sayısını (adedini) hesaplar.',
        syntax: 'COUNTIFS(kriter_aralık1, kriter1, [kriter_aralık2, kriter2], ...)',
        syntaxArgs: ['kriter_aralık1', 'kriter1', 'kriter_aralık2', 'kriter2', '...'],
        note: 'Örneğin, "Kaç tane Ege bölgesi siparişi var?" veya "Kaç kişi 90\'dan yüksek not aldı?" gibi soruları yanıtlar.',
        beforeAfter: {
            title: "Senaryo: Çoklu Koşullu Sayım",
            desc: "Bölgesi 'Marmara' olan 'Elektronik' kategorisinden kaç adet satış olduğunu sayacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Kategori</td></tr><tr><td>2</td><td>Marmara</td><td>Elektronik</td></tr><tr><td>3</td><td>Ege</td><td>Elektronik</td></tr><tr><td>4</td><td>Marmara</td><td>Gıda</td></tr><tr><td>5</td><td>Marmara</td><td>Elektronik</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Kategori</td><td class="result-highlight">2</td></tr></tbody>`,
            appliedFormula: '=COUNTIFS(A2:A5, "Marmara", B2:B5, "Elektronik")'
        },
        task: {
            goal: 'Aşağıdaki tabloda "Marmara" (Sütun A) ve "Elektronik" (Sütun B) olan kaç adet kayıt olduğunu sayın.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>Ege</td><td>Elektronik</td><td>18000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>12000</td></tr>' +
                '<tr><td>5</td><td>Marmara</td><td>Elektronik</td><td>5000</td></tr>',
            result: '2',
            finalFormula: 'countifs(a:a,"marmara",b:b,"elektronik")',
            steps: [
                { regex: /^=countifs\s*\($/i, hint: '=COUNTIFS( ile başlayın.', error: 'Formüle =COUNTIFS( yazarak başlayın.', activeArg: 0 },
                { regex: /^=countifs\s*\(a:a\s*[,;]\s*$/i, hint: '1. kriter aralığını (A:A) seçin.', error: 'Kriter aralığı 1 (A:A) olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=countifs\s*\(a:a\s*[,;]\s*"marmara"\s*[,;]\s*$/i, hint: '1. kriteri ("Marmara") yazın. Şimdi 2. kriter aralığını (B:B) seçin.', error: 'Kriter 1 ("Marmara") olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=countifs\s*\(a:a\s*[,;]\s*"marmara"\s*[,;]\s*b:b\s*[,;]\s*$/i, hint: '2. kriter aralığı (B:B). Şimdi 2. kriteri ("Elektronik") yazın.', error: 'Kriter aralığı 2 (B:B) olmalı, ardından , veya ; koyun.', activeArg: 3 },
                { regex: /^=countifs\s*\(a:a\s*[,;]\s*"marmara"\s*[,;]\s*b:b\s*[,;]\s*"elektronik"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Kriter 2 ("Elektronik") olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'averageifs': {
        name: 'AVERAGEIFS (ÇOKORTALAMA)',
        desc: 'Birden fazla kritere uyan hücrelerin ortalamasını hesaplar.',
        syntax: 'AVERAGEIFS(ortalama_aralığı, kriter_aralık1, kriter1, ...)',
        syntaxArgs: ['ortalama_aralığı', 'kriter_aralık1', 'kriter1', '...'],
        note: 'Örneğin, "Elektronik kategorisinin ortalama satış tutarı nedir?" sorusunu yanıtlar.',
        beforeAfter: {
            title: "Senaryo: Koşullu Ortalama",
            desc: "'Marmara' bölgesinin ortalama satışını hesaplayacağız. (100 + 200) / 2 = 150.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Satış</td></tr><tr><td>2</td><td>Marmara</td><td>100</td></tr><tr><td>3</td><td>Ege</td><td>50</td></tr><tr><td>4</td><td>Marmara</td><td>200</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Satış</td><td class="result-highlight">150</td></tr></tbody>`,
            appliedFormula: '=AVERAGEIFS(B2:B4, A2:A4, "Marmara")'
        },
        task: {
            goal: '"Marmara" (Sütun A) bölgesinin ortalama satışını (Sütun C) bulun.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>Ege</td><td>Elektronik</td><td>18000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>5000</td></tr>',
            result: '10000', // (15000 + 5000) / 2
            finalFormula: 'averageifs(c:c,a:a,"marmara")',
            steps: [
                { regex: /^=averageifs\s*\($/i, hint: '=AVERAGEIFS( ile başlayın.', error: 'Formüle =AVERAGEIFS( yazarak başlayın.', activeArg: 0 },
                { regex: /^=averageifs\s*\(c:c\s*[,;]\s*$/i, hint: 'Önce ortalama alınacak aralığı (C:C) seçin.', error: 'Ortalama aralığı (C:C) olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=averageifs\s*\(c:c\s*[,;]\s*a:a\s*[,;]\s*$/i, hint: 'Şimdi kriter aralığını (A:A) seçin.', error: 'Kriter aralığı 1 (A:A) olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=averageifs\s*\(c:c\s*[,;]\s*a:a\s*[,;]\s*"marmara"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Kriter 1 ("Marmara") olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'subtotal': {
        name: 'SUBTOTAL (ALTTOPLAM)',
        desc: 'Filtrelenmiş veya gizlenmiş satırları dikkate alarak özet hesaplamalar (Toplam, Ortalama, Sayım vb.) yapar.',
        syntax: 'SUBTOTAL(işlev_kodu, aralık)',
        syntaxArgs: ['işlev_kodu (9=TOPLA)', 'aralık1', '...'],
        note: 'En sık kullanılan işlev kodu 9 (SUM - Toplam) veya 109 (Görünür TOPLA). Filtreli listelerin tepesinde bir özet görmek için mükemmeldir.',
        beforeAfter: {
            title: "Senaryo: Filtreli Toplam",
            desc: "Tablo filtrelendiğinde sadece görünür olanların toplamını (Kod 109) alır.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Kategori</td><td>Satış</td></tr><tr><td>2</td><td>Meyve</td><td>100</td></tr><tr><td>3</td><td>(Filtrelendi) Sebze</td><td>50</td></tr><tr><td>4</td><td>Meyve</td><td>200</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>0</td><td>Genel Toplam:</td><td class="result-highlight">300</td></tr></tbody>`,
            appliedFormula: '=SUBTOTAL(109, B2:B4)'
        },
        task: {
            goal: 'Sadece görünür hücreleri toplayan formülü yazın (İşlev Kodu 109). Toplam aralığı C:C.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>(Gizli)</td><td>(Gizli)</td><td>18000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>5000</td></tr>',
            result: '20000', // 15000 + 5000 (18000 gizli)
            finalFormula: 'subtotal(109,c:c)',
            steps: [
                { regex: /^=subtotal\s*\($/i, hint: '=SUBTOTAL( ile başlayın.', error: 'Formüle =SUBTOTAL( yazarak başlayın.', activeArg: 0 },
                { regex: /^=subtotal\s*\(109\s*[,;]\s*$/i, hint: 'Görünür hücreleri toplamak için 109 yazın. Şimdi aralığı seçin (C:C).', error: 'İşlev kodu 109 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=subtotal\s*\(109\s*[,;]\s*c:c\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Toplanacak aralık C:C olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },

    // === 4. Metin ===
    'left-right': {
        name: 'LEFT / RIGHT',
        desc: 'Bir metnin en solundan veya en sağından istediğiniz sayıda karakteri alır.',
        syntax: 'LEFT(metin, [karakter_sayısı]) / RIGHT(metin, [karakter_sayısı])',
        syntaxArgs: ['metin', 'karakter_sayısı'],
        note: 'Ürün kodlarının ilk 3 hanesini (örn: =LEFT(A2, 3)) veya dosya uzantılarının son 3 hanesini almak için kullanılır.',
        beforeAfter: {
            title: "Senaryo: Metin Parçalama (Baştan)",
            desc: "A2 hücresindeki 'TR-123' kodunun 'TR' kısmını alacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Kod</td></tr><tr><td>2</td><td>TR-123</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Kod</td><td>Ülke</td></tr><tr><td>2</td><td>TR-123</td><td class="result-highlight">TR</td></tr></tbody>`,
            appliedFormula: '=LEFT(A2, 2)'
        },
        task: {
            goal: 'A2 hücresindeki metnin (ABC-123) solundan ilk 3 karakteri (ABC) alın.',
            sampleData: '<tr><td>2</td><td>ABC-123</td><td></td></tr>',
            result: 'ABC',
            finalFormula: 'left(a2,3)',
            steps: [
                { regex: /^=left\s*\($/i, hint: '=LEFT( ile başlayın.', error: 'Formüle =LEFT( yazarak başlayın.', activeArg: 0 },
                { regex: /^=left\s*\(a2\s*[,;]\s*$/i, hint: 'Metin A2. Şimdi kaç karakter alacağınızı yazın (3).', error: 'Metin hücresi A2 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=left\s*\(a2\s*[,;]\s*3\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Karakter sayısı 3 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'mid': {
        name: 'MID (PARÇAAL)',
        desc: 'Bir metnin ortasından, belirlediğiniz konumdan başlayarak istediğiniz sayıda karakteri alır.',
        syntax: 'MID(metin, başlangıç_sayısı, karakter_sayısı)',
        syntaxArgs: ['metin', 'başlangıç_sayısı', 'karakter_sayısı'],
        note: 'TC Kimlik No\'nun 3. karakterinden itibaren 2 karakter almak gibi hassas metin parçalama işlemleri için kullanılır.',
        beforeAfter: {
            title: "Senaryo: Metin Parçalama (Ortadan)",
            desc: "A2 hücresindeki 'TR-123-X' kodunun '123' kısmını alacağız (4. karakterden başla, 3 karakter al).",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Kod</td></tr><tr><td>2</td><td>TR-123-X</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Kod</td><td>Orta Kod</td></tr><tr><td>2</td><td>TR-123-X</td><td class="result-highlight">123</td></tr></tbody>`,
            appliedFormula: '=MID(A2, 4, 3)'
        },
        task: {
            goal: 'A2 hücresindeki metnin (ABC-123) 5. karakterinden başlayarak 3 karakter alın (123).',
            sampleData: '<tr><td>2</td><td>ABC-123</td><td></td></tr>',
            result: '123',
            finalFormula: 'mid(a2,5,3)',
            steps: [
                { regex: /^=mid\s*\($/i, hint: '=MID( ile başlayın.', error: 'Formüle =MID( yazarak başlayın.', activeArg: 0 },
                { regex: /^=mid\s*\(a2\s*[,;]\s*$/i, hint: 'Metin A2. Şimdi başlangıç sayısını yazın (5).', error: 'Metin hücresi A2 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=mid\s*\(a2\s*[,;]\s*5\s*[,;]\s*$/i, hint: 'Başlangıç 5. Şimdi kaç karakter alacağınızı yazın (3).', error: 'Başlangıç sayısı 5 olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=mid\s*\(a2\s*[,;]\s*5\s*[,;]\s*3\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Karakter sayısı 3 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'find-search': {
        name: 'FIND / SEARCH (BUL)',
        desc: 'Bir metin içinde başka bir metin parçasının kaçıncı karakterde başladığını bulur.',
        syntax: 'FIND(bulunacak_metin, metin, [başlangıç_sayısı])',
        syntaxArgs: ['bulunacak_metin', 'metin', '[başlangıç_sayısı]'],
        note: 'Genellikle diğer metin formülleriyle birlikte kullanılır. Örneğin, bir e-postadaki "@" işaretinin yerini bulup, oradan itibaren metni almak için (MID ile birlikte).',
        beforeAfter: {
            title: "Senaryo: Karakter Yeri Bulma",
            desc: "A2 hücresindeki 'TR-123' metnindeki '-' (tire) işaretinin kaçıncı karakterde olduğunu bulacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Kod</td></tr><tr><td>2</td><td>TR-123</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Kod</td><td>Tire Yeri</td></tr><tr><td>2</td><td>TR-123</td><td class="result-highlight">3</td></tr></tbody>`,
            appliedFormula: '=FIND("-", A2)'
        },
        task: {
            goal: 'A2 hücresindeki (ABC-123) metinde "-" (tire) işaretinin yerini bulun.',
            sampleData: '<tr><td>2</td><td>ABC-123</td><td></td></tr>',
            result: '4',
            finalFormula: 'find("-",a2)',
            steps: [
                { regex: /^=find\s*\($/i, hint: '=FIND( ile başlayın.', error: 'Formüle =FIND( yazarak başlayın.', activeArg: 0 },
                { regex: /^=find\s*\("-"\s*[,;]\s*$/i, hint: 'Bulunacak metin "-". Şimdi nerede aranacağını yazın (A2).', error: 'Bulunacak metin "-" olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=find\s*\("-"\s*[,;]\s*a2\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Metin hücresi A2 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'trim': {
        name: 'TRIM (KIRP)',
        desc: 'Bir metnin başında, sonunda veya kelimeler arasında birden fazla olan gereksiz boşlukları temizler.',
        syntax: 'TRIM(metin)',
        syntaxArgs: ['metin'],
        note: 'Veri temizliğinin ilk adımıdır. Dış kaynaklardan kopyalanan verilerde gizli boşluklar olabilir. Eşleştirme (VLOOKUP vb.) yapmadan önce mutlaka kullanılmalıdır.',
        beforeAfter: {
            title: "Senaryo: Gereksiz Boşlukları Temizleme",
            desc: "A2 hücresindeki '   İçerik   ' metnini B2'de temizleyeceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Metin</td></tr><tr><td>2</td><td>"&nbsp;&nbsp;&nbsp;İçerik&nbsp;&nbsp;&nbsp;"</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Metin</td><td>Temizlenmiş</td></tr><tr><td>2</td><td>"&nbsp;&nbsp;&nbsp;İçerik&nbsp;&nbsp;&nbsp;"</td><td class="result-highlight">"İçerik"</td></tr></tbody>`,
            appliedFormula: '=TRIM(A2)'
        },
        task: {
            goal: "Görev: A2 hücresindeki metnin başındaki ve sonundaki boşlukları temizleyin.",
            sampleData: '<tr><td>2</td><td>&nbsp;&nbsp;Gereksiz Boşluk&nbsp;&nbsp;</td><td></td></tr>',
            result: 'Gereksiz Boşluk',
            finalFormula: 'trim(a2)',
            steps: [
                { regex: /^=trim\s*\($/i, hint: '=TRIM( ile başlayın.', error: 'Formüle =TRIM( yazarak başlayın.', activeArg: 0 },
                { regex: /^=trim\s*\(a2\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Temizlenecek metni (A2) seçin ve parantezi kapatın.', activeArg: -1 }
            ]
        }
    },
    'textjoin': {
        name: 'TEXTJOIN',
        desc: 'Birden fazla metni veya bir aralığı, belirlediğiniz bir ayırıcı ile birleştirir.',
        syntax: 'TEXTJOIN(ayırıcı, boş_olanı_yoksay, metin1, [metin2], ...)',
        syntaxArgs: ['ayırıcı', 'boş_olanı_yoksay (TRUE)', 'metin1', 'metin2', '...'],
        note: 'Eski CONCATENATE formülünden çok daha güçlüdür. Bir listedeki (A2:A10) tüm isimleri aralarına virgül koyarak tek hücrede birleştirebilir.',
        beforeAfter: {
            title: "Senaryo: Metin Birleştirme",
            desc: "A2 ve B2 hücrelerindeki metinleri aralarına '-' (tire) koyarak birleştireceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Kod</td></tr><tr><td>2</td><td>TR</td><td>123</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td>Kod</td><td>Tam Kod</td></tr><tr><td>2</td><td>TR</td><td>123</td><td class="result-highlight">TR-123</td></tr></tbody>`,
            appliedFormula: '=TEXTJOIN("-", TRUE, A2, B2)'
        },
        task: {
            goal: 'A2 (Bölge) ve B2 (Ürün) hücrelerini aralarında " - " (tire ve boşluklar) olacak şekilde birleştirin.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td></tr>',
            result: 'Marmara - Elektronik',
            finalFormula: 'textjoin(" - ",true,a2,b2)',
            steps: [
                { regex: /^=textjoin\s*\($/i, hint: '=TEXTJOIN( ile başlayın.', error: 'Formüle =TEXTJOIN( yazarak başlayın.', activeArg: 0 },
                { regex: /^=textjoin\s*\(" - "\s*[,;]\s*$/i, hint: 'Ayırıcı " - ". Şimdi boş hücrelerin yoksayılıp yoksayılmayacağını yazın (TRUE).', error: 'Ayırıcı " - " olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=textjoin\s*\(" - "\s*[,;]\s*true\s*[,;]\s*$/i, hint: 'Boş hücreler yoksayılsın (TRUE). Şimdi ilk metni seçin (A2).', error: 'Boş hücreleri yoksaymak için TRUE yazın, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=textjoin\s*\(" - "\s*[,;]\s*true\s*[,;]\s*a2\s*[,;]\s*$/i, hint: 'İlk metin A2. Şimdi ikinci metni seçin (B2).', error: 'İlk metin A2 olmalı, ardından , veya ; koyun.', activeArg: 3 },
                { regex: /^=textjoin\s*\(" - "\s*[,;]\s*true\s*[,;]\s*a2\s*[,;]\s*b2\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'İkinci metin B2 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },

    // === 5. Tarih ve Saat ===
    'today-now': {
        name: 'TODAY / NOW',
        desc: 'TODAY, bugünün tarihini verir. NOW, şu anki anlık tarih ve saati verir. Her ikisi de dosya her açıldığında güncellenir.',
        syntax: 'TODAY() / NOW()',
        syntaxArgs: [''],
        note: '"Bugün itibariyle kalan gün" veya "raporda son güncelleme tarihi" gibi dinamik hesaplamalar için kullanılır.',
        beforeAfter: {
            title: "Senaryo: Dinamik Tarih",
            desc: "A2 hücresine bugünün tarihini dinamik olarak ekleyeceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Rapor Tarihi:</td></tr><tr><td>2</td><td></td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Rapor Tarihi:</td></tr><tr><td>2</td><td class="result-highlight">18.10.2025</td></tr></tbody>`, // (Simulated date)
            appliedFormula: '=TODAY()'
        },
        task: {
            goal: 'Bugünün tarihini almak için formülü yazın (argüman almaz).',
            sampleData: '<tr><td>2</td><td></td><td></td></tr>',
            result: '18.10.2025', // (Simulated date)
            finalFormula: 'today()',
            steps: [
                { regex: /^=today\s*\(\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Formül =TODAY() şeklinde olmalı.', activeArg: -1 }
            ]
        }
    },
    'year-month-day': {
        name: 'YEAR / MONTH / DAY',
        desc: 'Bir tarih değerinin Yıl, Ay veya Gün bileşenini sayı olarak döndürür.',
        syntax: 'YEAR(tarih) / MONTH(tarih) / DAY(tarih)',
        syntaxArgs: ['tarih'],
        note: 'Tarih bazlı gruplama yapmak için kullanılır. Örneğin, Pivot Tablo kullanmadan =YEAR(A2) ile "Yıl" sütunu oluşturabilirsiniz.',
        beforeAfter: {
            title: "Senaryo: Tarihten Yıl Ayıklama",
            desc: "A2 hücresindeki '15.03.2024' tarihinin 'Yıl' bileşenini (2024) alacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Tarih</td></tr><tr><td>2</td><td>15.03.2024</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Tarih</td><td>Yıl</td></tr><tr><td>2</td><td>15.03.2024</td><td class="result-highlight">2024</td></tr></tbody>`,
            appliedFormula: '=YEAR(A2)'
        },
        task: {
            goal: 'A2 hücresindeki (15.03.2024) tarihin "Yıl" (YEAR) bölümünü alın.',
            sampleData: '<tr><td>2</td><td>15.03.2024</td><td></td></tr>',
            result: '2024',
            finalFormula: 'year(a2)',
            steps: [
                { regex: /^=year\s*\($/i, hint: '=YEAR( ile başlayın.', error: 'Formüle =YEAR( yazarak başlayın.', activeArg: 0 },
                { regex: /^=year\s*\(a2\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Tarih hücresi A2 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'eomonth': {
        name: 'EOMONTH (SERİAY)',
        desc: 'Belirtilen tarihten belirli sayıda ay ileri veya geri giderek, o ayın son gününün tarihini verir.',
        syntax: 'EOMONTH(başlangıç_tarihi, ay_sayısı)',
        syntaxArgs: ['başlangıç_tarihi', 'ay_sayısı (0=bu ay)'],
        note: 'Finansal raporlamada ve vade hesaplamalarında çok kullanılır. =EOMONTH(A2, 0) o ayın son gününü, =EOMONTH(A2, 1) bir sonraki ayın son gününü verir.',
        beforeAfter: {
            title: "Senaryo: Ayın Son Gününü Bulma",
            desc: "A2 hücresindeki '15.03.2024' tarihinin bulunduğu ayın son gününü ('31.03.2024') bulacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Tarih</td></tr><tr><td>2</td><td>15.03.2024</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Tarih</td><td>Ay Sonu</td></tr><tr><td>2</td><td>15.03.2024</td><td class="result-highlight">31.03.2024</td></tr></tbody>`,
            appliedFormula: '=EOMONTH(A2, 0)'
        },
        task: {
            goal: 'A2 hücresindeki (15.03.2024) tarihin bulunduğu ayın son gününü bulun (ay_sayısı = 0).',
            sampleData: '<tr><td>2</td><td>15.03.2024</td><td></td></tr>',
            result: '31.03.2024',
            finalFormula: 'eomonth(a2,0)',
            steps: [
                { regex: /^=eomonth\s*\($/i, hint: '=EOMONTH( ile başlayın.', error: 'Formüle =EOMONTH( yazarak başlayın.', activeArg: 0 },
                { regex: /^=eomonth\s*\(a2\s*[,;]\s*$/i, hint: 'Tarih A2. Şimdi kaç ay ileri/geri gideceğinizi yazın (bu ay için 0).', error: 'Tarih hücresi A2 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=eomonth\s*\(a2\s*[,;]\s*0\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Ay sayısı 0 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'datedif': {
        name: 'DATEDIF (ETARİHLİ)',
        desc: 'İki tarih arasındaki farkı Yıl, Ay veya Gün olarak hesaplar. (Resmi olarak belgelenmemiş ama çok kullanışlıdır).',
        syntax: 'DATEDIF(başlangıç_tarihi, bitiş_tarihi, "birim")',
        syntaxArgs: ['başlangıç_tarihi', 'bitiş_tarihi', '"birim" (Y, M, D)'],
        note: 'Kıdem hesabı (birim "Y"), yaş hesabı (birim "Y") veya iki tarih arası tam ay (birim "M") hesabı için kullanılır.',
        beforeAfter: {
            title: "Senaryo: İki Tarih Arası Tam Yıl",
            desc: "A2 (Başlangıç) ve B2 (Bitiş) tarihleri arasındaki tam YIL (\"Y\") farkını bulacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Başlangıç</td><td>Bitiş</td></tr><tr><td>2</td><td>10.01.2020</td><td>20.05.2024</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Başlangıç</td><td>Bitiş</td><td>Kıdem (Yıl)</td></tr><tr><td>2</td><td>10.01.2020</td><td>20.05.2024</td><td class="result-highlight">4</td></tr></tbody>`,
            appliedFormula: '=DATEDIF(A2, B2, "Y")'
        },
        task: {
            goal: 'A2 (10.01.2020) ve B2 (20.05.2024) arasındaki tam YIL farkını ("Y") bulun.',
            sampleData: '<tr><td>2</td><td>10.01.2020</td><td>20.05.2024</td></tr>',
            result: '4',
            finalFormula: 'datedif(a2,b2,"y")',
            steps: [
                { regex: /^=datedif\s*\($/i, hint: '=DATEDIF( ile başlayın.', error: 'Formüle =DATEDIF( yazarak başlayın.', activeArg: 0 },
                { regex: /^=datedif\s*\(a2\s*[,;]\s*$/i, hint: 'Başlangıç tarihi A2. Şimdi bitiş tarihini yazın (B2).', error: 'Başlangıç tarihi A2 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=datedif\s*\(a2\s*[,;]\s*b2\s*[,;]\s*$/i, hint: 'Bitiş tarihi B2. Şimdi birimi tırnak içinde yazın ("Y").', error: 'Bitiş tarihi B2 olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=datedif\s*\(a2\s*[,;]\s*b2\s*[,;]\s*"y"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Birim "Y" (tırnak içinde) olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'networkdays': {
        name: 'NETWORKDAYS',
        desc: 'İki tarih arasındaki tam iş günü sayısını verir (hafta sonlarını -Cmt/Paz- hariç tutar).',
        syntax: 'NETWORKDAYS(başlangıç_tarihi, bitiş_tarihi, [tatiller])',
        syntaxArgs: ['başlangıç_tarihi', 'bitiş_tarihi', '[tatiller]'],
        note: 'Proje teslim sürelerini veya "kaç iş gününde tamamlandı" gibi süreleri hesaplamak için kullanılır. NETWORKDAYS.INTL versiyonu, farklı hafta sonu tatillerini seçmenize izin verir.',
        beforeAfter: {
            title: "Senaryo: İş Günü Hesaplama",
            desc: "A2 (Başlangıç) ve B2 (Bitiş) tarihleri arasındaki iş günü (Cmt/Pzr hariç) sayısını bulacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Başlangıç</td><td>Bitiş</td></tr><tr><td>2</td><td>01.10.2025 (Çrş)</td><td>08.10.2025 (Çrş)</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Başlangıç</td><td>Bitiş</td><td>İş Günü</td></tr><tr><td>2</td><td>01.10.2025</td><td>08.10.2025</td><td class="result-highlight">6</td></tr></tbody>`, // 1, 2, 3, 6, 7, 8 = 6 days
            appliedFormula: '=NETWORKDAYS(A2, B2)'
        },
        task: {
            goal: 'A2 (01.10.2025) ve B2 (08.10.2025) arasındaki iş günü sayısını bulun.',
            sampleData: '<tr><td>2</td><td>01.10.2025</td><td>08.10.2025</td></tr>',
            result: '6',
            finalFormula: 'networkdays(a2,b2)',
            steps: [
                { regex: /^=networkdays\s*\($/i, hint: '=NETWORKDAYS( ile başlayın.', error: 'Formüle =NETWORKDAYS( yazarak başlayın.', activeArg: 0 },
                { regex: /^=networkdays\s*\(a2\s*[,;]\s*$/i, hint: 'Başlangıç tarihi A2. Şimdi bitiş tarihini yazın (B2).', error: 'Başlangıç tarihi A2 olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=networkdays\s*\(a2\s*[,;]\s*b2\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Bitiş tarihi B2 olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },

    // === 6. Dinamik Dizi Formülleri ===
    'unique': {
        name: 'UNIQUE (BENZERSİZ)',
        desc: 'Bir listedeki veya aralıktaki benzersiz değerlerin bir listesini döndürür. (Dinamik Dizi Formülü)',
        syntax: 'UNIQUE(dizi, [by_col], [exactly_once])',
        syntaxArgs: ['dizi', '[by_col]', '[exactly_once]'],
        note: 'Excel 365 ile gelmiştir. Eskiden "yinelenenleri kaldır" ile yapılan işi, tek bir formülle dinamik olarak yapar.',
        beforeAfter: {
            title: "Senaryo: Benzersiz Liste Oluşturma",
            desc: "A sütunundaki 'Bölge' listesinin benzersiz (tekrarsız) halini C sütununa alacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td></tr><tr><td>2</td><td>Marmara</td></tr><tr><td>3</td><td>Ege</td></tr><tr><td>4</td><td>Marmara</td></tr><tr><td>5</td><td>Akdeniz</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead><tbody><tr><td>1</td><td>Bölge</td><td></td><td>Benzersiz Bölgeler</td></tr><tr><td>2</td><td>Marmara</td><td></td><td class="result-highlight">Marmara</td></tr><tr><td>3</td><td>Ege</td><td></td><td class="result-highlight">Ege</td></tr><tr><td>4</td><td>Marmara</td><td></td><td class="result-highlight">Akdeniz</td></tr><tr><td>5</td><td>Akdeniz</td><td></td><td class="result-highlight">... (dökülür)</td></tr></tbody>`,
            appliedFormula: '=UNIQUE(A2:A5)'
        },
        task: {
            goal: 'A sütunundaki (Bölge) listenin benzersiz (UNIQUE) halini alın.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td></td></tr>' +
                '<tr><td>3</td><td>Ege</td><td></td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td></td></tr>',
            result: 'Marmara, Ege', // Simülasyonda tek hücrede gösterelim
            finalFormula: 'unique(a:a)', // Basit tutalım
            steps: [
                { regex: /^=unique\s*\($/i, hint: '=UNIQUE( ile başlayın.', error: 'Formüle =UNIQUE( yazarak başlayın.', activeArg: 0 },
                { regex: /^=unique\s*\(a:a\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Benzersizi alınacak dizi A:A olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'filter': {
        name: 'FILTER (FİLTRE)',
        desc: 'Belirlediğiniz koşullara göre bir veri aralığını filtreler ve sonuçları döndürür. (Dinamik Dizi Formülü)',
        syntax: 'FILTER(dizi, include_matrix, [if_empty])',
        syntaxArgs: ['dizi (döndürülecek)', 'include (şart dizisi)', '[bulunamazsa]'],
        note: 'Excel 365\'in en güçlü formüllerindendir. Formül yoluyla filtreleme yapar.',
        beforeAfter: {
            title: "Senaryo: Dinamik Filtreleme",
            desc: "Tüm tablodaki (A:B) verilerden, sadece Kategorisi (B:B) 'Meyve' olanları C sütununa filtreleyeceğiz.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Ürün</td><td>Kategori</td></tr><tr><td>2</td><td>Elma</td><td>Meyve</td></tr><tr><td>3</td><td>Havuç</td><td>Sebze</td></tr><tr><td>4</td><td>Armut</td><td>Meyve</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td>1</td><td>Ürün</td><td>Kategori</td><td>Filtrelenenler</td><td></td></tr><tr><td>2</td><td>Elma</td><td>Meyve</td><td class="result-highlight">Elma</td><td class="result-highlight">Meyve</td></tr><tr><td>3</td><td>Havuç</td><td>Sebze</td><td class="result-highlight">Armut</td><td class="result-highlight">Meyve</td></tr><tr><td>4</td><td>Armut</td><td>Meyve</td><td class="result-highlight">... (dökülür)</td><td></td></tr></tbody>`,
            appliedFormula: '=FILTER(A2:B4, B2:B4="Meyve")'
        },
        task: {
            goal: 'Tüm tabloyu (A:C), Bölgesi (Sütun A) "Marmara" olanlara göre filtreleyin.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>Ege</td><td>Mobilya</td><td>8000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>12000</td></tr>',
            result: 'Marmara, Elektronik, 15000 | ...',
            finalFormula: 'filter(a:c,a:a="marmara")',
            steps: [
                { regex: /^=filter\s*\($/i, hint: '=FILTER( ile başlayın.', error: 'Formüle =FILTER( yazarak başlayın.', activeArg: 0 },
                { regex: /^=filter\s*\(a:c\s*[,;]\s*$/i, hint: 'Filtrelenecek dizi A:C. Şimdi şart dizisini yazın (A:A="Marmara").', error: 'Filtrelenecek dizi A:C olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=filter\s*\(a:c\s*[,;]\s*a:a\s*=\s*"marmara"\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Şart dizisi A:A="Marmara" olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    },
    'sort': {
        name: 'SORT (SIRALA)',
        desc: 'Bir aralıktaki verileri belirli bir sütuna göre sıralar. (Dinamik Dizi Formülü)',
        syntax: 'SORT(dizi, [sort_index], [sort_order], [by_col])',
        syntaxArgs: ['dizi', '[sort_index (sütun no)]', '[sort_order (-1 Azalan)]', '[by_col]'],
        note: 'Excel 365. =SORT(A2:C100, 3, -1) A2:C100 aralığını 3. sütuna (C) göre azalan (-1) sırada listeler.',
        beforeAfter: {
            title: "Senaryo: Dinamik Sıralama",
            desc: "A:B tablosunu Satış (B sütunu - 2. sütun) miktarına göre Azalan (-1) sırada sıralayacağız.",
            beforeTable: `<thead><tr><th></th><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td>Ürün</td><td>Satış</td></tr><tr><td>2</td><td>Elma</td><td>150</td></tr><tr><td>3</td><td>Havuç</td><td>300</td></tr><tr><td>4</td><td>Armut</td><td>100</td></tr></tbody>`,
            afterTable: `<thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody><tr><td>1</td><td>Ürün</td><td>Satış</td><td>Sıralı Liste</td><td></td></tr><tr><td>2</td><td>Elma</td><td>150</td><td class="result-highlight">Havuç</td><td class="result-highlight">300</td></tr><tr><td>3</td><td>Havuç</td><td>300</td><td class="result-highlight">Elma</td><td class="result-highlight">150</td></tr><tr><td>4</td><td>Armut</td><td>100</td><td class="result-highlight">Armut</td><td class="result-highlight">100</td></tr></tbody>`,
            appliedFormula: '=SORT(A2:B4, 2, -1)'
        },
        task: {
            goal: 'Tüm tabloyu (A:C), Satış Tutarına (Sütun C - 3. sütun) göre Azalan (-1) sırada sıralayın.',
            sampleData: '<tr><td>2</td><td>Marmara</td><td>Elektronik</td><td>15000</td></tr>' +
                '<tr><td>3</td><td>Ege</td><td>Mobilya</td><td>8000</td></tr>' +
                '<tr><td>4</td><td>Marmara</td><td>Gıda</td><td>12000</td></tr>',
            result: 'Marmara, Elektronik, 15000 | ...',
            finalFormula: 'sort(a:c,3,-1)',
            steps: [
                { regex: /^=sort\s*\($/i, hint: '=SORT( ile başlayın.', error: 'Formüle =SORT( yazarak başlayın.', activeArg: 0 },
                { regex: /^=sort\s*\(a:c\s*[,;]\s*$/i, hint: 'Sıralanacak dizi A:C. Şimdi hangi sütuna göre sıralanacağını yazın (3).', error: 'Dizi A:C olmalı, ardından , veya ; koyun.', activeArg: 1 },
                { regex: /^=sort\s*\(a:c\s*[,;]\s*3\s*[,;]\s*$/i, hint: 'Sütun no 3. Şimdi sıralama yönünü yazın (Artan=1, Azalan=-1).', error: 'Sıralama indisi 3 olmalı, ardından , veya ; koyun.', activeArg: 2 },
                { regex: /^=sort\s*\(a:c\s*[,;]\s*3\s*[,;]\s*-1\s*\)\s*$/i, hint: 'Mükemmel! Formül tamamlandı.', error: 'Sıralama yönü -1 (Azalan) olmalı ve parantezi kapatmalısınız.', activeArg: -1 }
            ]
        }
    }
};

/* ===================================
   MODÜL 2: ANA UYGULAMA BAŞLANGICI
   =================================== */
document.addEventListener("DOMContentLoaded", function () {

    /**
     * MODÜL 2: Dinamik olarak eklenen formül editörü için olay dinleyicileri atar
     */
    function attachEditorListener() {
        const formulaInput = document.getElementById('formula-input');
        if (!formulaInput) return;

        // Olay dinleyicilerini temizlemek için klonla ve değiştir (daha güvenli)
        const newFormulaInput = formulaInput.cloneNode(true);
        formulaInput.parentNode.replaceChild(newFormulaInput, formulaInput);

        // Dinamik geri bildirim için 'keyup' (tuş bırakıldığında)
        newFormulaInput.addEventListener('keyup', function (e) {
            runFormulaSimulation(); // Her tuş vuruşunda simülasyonu çalıştır
        });

        // İlk yüklendiğinde de mevcut durumu kontrol et
        runFormulaSimulation();
    }

    /**
     * MODÜL 2: Argüman Yardımcısını Güncelleyen Fonksiyon
     */
    function updateSyntaxHelper(key, activeIndex) {
        const helperBox = document.getElementById('syntax-helper');
        if (!helperBox) return;

        const data = formulaData[key];
        if (!data || !data.syntaxArgs || !data.task || data.syntaxArgs.length === 0) {
            helperBox.style.display = 'none';
            return;
        }

        helperBox.style.display = 'block';
        const args = data.syntaxArgs;

        if (args.length === 1 && args[0] === '') {
            helperBox.innerHTML = `<code>${data.name.split(' ')[0]}()</code>`;
            return;
        }

        let html = `<code>${data.name.split(' ')[0]}(`;
        html += args.map((arg, index) => {
            if (index === activeIndex) {
                return `<strong>[${arg}]</strong>`;
            }
            return arg;
        }).join(', ');
        html += ')</code>';

        helperBox.innerHTML = html;
    }

    /**
     * MODÜL 2: Formül İçeriğini Yükleyen Fonksiyon
     */
    function updateFormulaContent(key) {
        const detailContent = document.getElementById('formula-detail-content');
        if (!detailContent) return;

        // Eğer 'key' boş ise, başlangıç ekranını göster
        if (!key) {
            detailContent.innerHTML = `
                <h3>Formül Kütüphanesine Hoş Geldin!</h3>
                <p>Excel'in yüzlerce fonksiyonu arasından bir veri analistinin en çok kullanacağı kritik formülleri burada topladık. Lütfen soldaki menüden hakkında bilgi almak ve interaktif olarak denemek istediğiniz bir formülü seçin.</p>
                <div class="analyst-tip">
                    <h4>Nasıl Çalışır?</h4>
                    <p>Bir formül seçtiğinizde, bu alanda o formülün tam açıklaması, söz dizimi (syntax), analist notları ve en önemlisi, formülü canlı olarak test edebileceğiniz <strong>uygulamalı bir editör</strong> görünecektir.</p>
                    <p>Her formül için önce statik "Önce/Sonra" örneğini inceleyebilir, ardından "Canlı Formül Editörü" ile görevi tamamlamaya çalışabilirsiniz. Sistem, siz yazarken size adım adım ipuçları ve hata mesajları vererek rehberlik edecektir.</p>
                </div>
            `;
            return;
        }

        const data = formulaData[key];

        if (!data) {
            detailContent.innerHTML = `<h3>Detaylar Çok Yakında</h3><p>${key} formülü için içerik hazırlanıyor...</p>`;
            return;
        }

        let html = `
            <h3>${data.name}</h3>
            <p>${data.desc}</p>
            <div class="syntax-box">
                <strong>Söz Dizimi:</strong>
                <code>${data.syntax}</code>
            </div>
            <div class="analyst-tip">
                <h4>Analist Notu</h4>
                <p>${data.note}</p>
            </div>
        `;

        if (data.beforeAfter) {
            html += `
                <section class="interactive-section before-after-section">
                    <h3>Uygulama Örneği: ${data.beforeAfter.title || ''}</h3>
                    <p>${data.beforeAfter.desc || ''}</p>
                    <div class="before-after-layout">
                        <div class="table-container">
                            <h4>Önce (Ham Veri)</h4>
                            <table class="styled-table excel-sim">${data.beforeAfter.beforeTable}</table>
                        </div>
                        <div class="table-container">
                            <h4>Sonra (Formül Uygulanmış)</h4>
                            <table class="styled-table excel-sim">${data.beforeAfter.afterTable}</table>
                        </div>
                    </div>
                    <div class="syntax-box applied-formula">
                        <strong>Uygulanan Formül:</strong>
                        <code>${data.beforeAfter.appliedFormula}</code>
                    </div>
                </section>
            `;
        }

        if (data.task && data.task.steps) {
            html += `
                <section class="interactive-section editor-section">
                    <h3>Canlı Formül Editörü: ${data.name}</h3>
                    <p><strong>Görev:</strong> ${data.task.goal}</p>
                    <div class="live-editor-layout">
                        <table class="styled-table excel-sim">
                            <thead><tr><th></th><th>A</th><th>B</th><th>C</th></tr></thead>
                            <tbody>
                                <tr><td>1</td><td>Bölge/Değer1</td><td>Ürün/Değer2</td><td>Satış/Sonuç</td></tr>
                                ${data.task.sampleData} 
                            </tbody>
                        </table>
                        <div class="formula-entry" data-current-task="${key}">
                            <label for="formula-input"><strong>Formülü buraya yazın:</strong></label>
                            <div class="fx-bar">
                                <span>fx</span>
                                <input type="text" id="formula-input" placeholder="=...">
                            </div>
                            <div id="syntax-helper" class="syntax-helper-box"></div>
                            <div class="result-box">
                                <span>Sonuç:</span>
                                <div id="result-cell" class="result-cell-value">...</div>
                            </div>
                            <div id="formula-feedback" class="feedback-message neutral">Formülü yazmaya başlayın...</div>
                        </div>
                    </div>
                </section>
            `;
        }

        if (key === 'xlookup' || key === 'vlookup') {
            html += `
                <section class="interactive-section compare-section">
                    <h3>Formül Karşılaştırıcı: VLOOKUP vs. XLOOKUP</h3>
                    <table class="styled-table compare-table">
                        <thead><tr><th>Özellik</th><th>VLOOKUP (DÜŞEYARA)</th><th>XLOOKUP</th></tr></thead>
                        <tbody>
                            <tr>
                                <td>Arama Yönü</td>
                                <td>Sadece sağa doğru (ilk sütunda arar)</td>
                                <td><strong>Herhangi bir sütunda arar (sağa/sola)</strong></td>
                            </tr>
                            <tr>
                                <td>Varsayılan Eşleşme</td>
                                <td>En Yakın Eşleşme (Hata riski yüksek)</td>
                                <td><strong>Tam Eşleşme (Daha güvenli)</strong></td>
                            </tr>
                            <tr>
                                <td>Bulunamazsa</td>
                                <td>#N/A hatası verir (IFERROR gerekir)</td>
                                <td><strong>Formül içinde özel mesaj ayarlanabilir</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            `;
        }

        detailContent.innerHTML = html;

        if (data.task && data.task.steps) {
            attachEditorListener();
        }
    }

    /**
     * MODÜL 2: RegEx Tabanlı Simülasyon Fonksiyonu
     */
    function runFormulaSimulation() {
        const formulaEntry = document.querySelector('.formula-entry');
        if (!formulaEntry) return;

        const currentTaskKey = formulaEntry.getAttribute('data-current-task');
        if (!currentTaskKey || !formulaData[currentTaskKey] || !formulaData[currentTaskKey].task) return;

        const task = formulaData[currentTaskKey].task;
        const steps = task.steps;
        const finalFormula = task.finalFormula.toLowerCase().replace(/ /g, '').replace(';', ',');

        const formulaInput = document.getElementById('formula-input');
        const resultCell = document.getElementById('result-cell');
        const feedbackMsg = document.getElementById('formula-feedback');
        if (!formulaInput || !resultCell || !feedbackMsg) return;

        let userInput = formulaInput.value.trim();
        let cleanInput = userInput.toLowerCase().replace(/ /g, '').replace(';', ',');

        let lastMatchedStep = -1;
        for (let i = 0; i < steps.length; i++) {
            if (steps[i].regex.test(userInput)) {
                lastMatchedStep = i;
            } else {
                break;
            }
        }

        if (steps.length === 1 && steps[0].regex.test(userInput)) {
            if (cleanInput.includes(finalFormula)) {
                resultCell.textContent = task.result;
                feedbackMsg.textContent = 'Harika! Tamamen doğru.';
                feedbackMsg.className = 'feedback-message success';
                updateSyntaxHelper(currentTaskKey, -1);
            } else {
                feedbackMsg.textContent = `Hata: ${steps[0].error}`;
                feedbackMsg.className = 'feedback-message error';
                resultCell.textContent = '#HATA!';
            }
            return;
        }

        if (lastMatchedStep === steps.length - 1) {
            if (cleanInput.includes(finalFormula)) {
                resultCell.textContent = task.result;
                feedbackMsg.textContent = 'Harika! Tamamen doğru.';
                feedbackMsg.className = 'feedback-message success';
                updateSyntaxHelper(currentTaskKey, -1);
            } else {
                resultCell.textContent = '#DEĞER!';
                feedbackMsg.textContent = 'Yapı doğru, ancak tırnak içindeki değerleri kontrol edin. Tam olarak görevdeki gibi olmalı.';
                feedbackMsg.className = 'feedback-message error';
                updateSyntaxHelper(currentTaskKey, steps[lastMatchedStep].activeArg);
            }
            return;
        }

        let currentStepIndex = lastMatchedStep + 1;
        if (currentStepIndex >= steps.length) {
            currentStepIndex = steps.length - 1;
        }
        let currentStepData = steps[currentStepIndex];

        if (userInput.length > 0 && !currentStepData.regex.test(userInput)) {
            feedbackMsg.textContent = `Hata: ${currentStepData.error}`;
            feedbackMsg.className = 'feedback-message error';
            resultCell.textContent = '#HATA!';
        } else {
            feedbackMsg.textContent = `İpucu: ${currentStepData.hint}`;
            feedbackMsg.className = 'feedback-message neutral';
            resultCell.textContent = '...';
        }

        updateSyntaxHelper(currentTaskKey, currentStepData.activeArg);
    }


    /* --- OLAY DİNLEYİCİLERİ VE BAŞLANGIÇ (DOĞRU YER) --- */

    // Modül 2 Formül Kütüphanesi Menüsü
    const formulaLinks = document.querySelectorAll('.formula-nav li a');
    if (formulaLinks.length > 0) {
        formulaLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const formulaKey = this.getAttribute('data-formula');

                formulaLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                updateFormulaContent(formulaKey);
            });
        });
    }

    // Sayfa Yüklendiğinde, başlangıç ekranını göster.
    // Artık doğrudan bir formül yüklemiyoruz.
    updateFormulaContent(null);

});

