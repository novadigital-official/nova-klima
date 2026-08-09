/* ═══════════════════════════════════════════════════════════
   NOVA KLİMA SERVİSİ - INTERACTIVE LOGIC (ANTALYA)
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    const serviceType = document.getElementById('serviceType');
    const klimaBtu = document.getElementById('klimaBtu');
    const districtSelect = document.getElementById('districtSelect');
    const totalKlimaPrice = document.getElementById('totalKlimaPrice');
    const btnCallKlimaMaster = document.getElementById('btnCallKlimaMaster');

    const updateKlimaPrice = () => {
        if (!serviceType || !totalKlimaPrice) return;

        const baseOption = serviceType.options[serviceType.selectedIndex];
        let basePrice = parseInt(baseOption.getAttribute('data-price')) || 1200;

        let btuFee = 0;
        const btuVal = klimaBtu?.value || '9000-12000';
        if (btuVal === '18000') btuFee = 300;
        else if (btuVal === '24000') btuFee = 500;
        else if (btuVal === 'ticari') btuFee = 1000;

        let distFee = 0;
        const distVal = districtSelect?.value || 'muratpasa';
        if (distVal === 'dosemealti') distFee = 300;
        else if (distVal === 'diğer') distFee = 500;

        const totalPrice = basePrice + btuFee + distFee;
        totalKlimaPrice.textContent = `${totalPrice.toLocaleString('tr-TR')} TL`;
    };

    if (serviceType) serviceType.addEventListener('change', updateKlimaPrice);
    if (klimaBtu) klimaBtu.addEventListener('change', updateKlimaPrice);
    if (districtSelect) districtSelect.addEventListener('change', updateKlimaPrice);

    updateKlimaPrice();

    if (btnCallKlimaMaster) {
        btnCallKlimaMaster.addEventListener('click', () => {
            const servText = serviceType.options[serviceType.selectedIndex].text;
            const btuText = klimaBtu.options[klimaBtu.selectedIndex].text;
            const distText = districtSelect.options[districtSelect.selectedIndex].text;
            const finalPrice = totalKlimaPrice.textContent;

            const message = `Merhaba Nova Klima, web siteniz üzerinden ulaştım. Antalya Klima Servis talebim var:\n\n🔧 Servis Türü: ${servText}\n❄️ Kapasite: ${btuText}\n📍 Konum: ${distText}\n💰 Şeffaf Ücret: ${finalPrice}\n\nAcil usta yönlendirmenizi rica ederim.`;
            const waUrl = `https://wa.me/905300000000?text=${encodeURIComponent(message)}`;

            window.open(waUrl, '_blank');
        });
    }

});
