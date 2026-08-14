/* ══════════════════════════════════════════════════════════════
   NOVA KLİMA SERVİSİ - INTERACTIVE LOGIC & ADS CONVERSION TRACKING (ANTALYA)
   ══════════════════════════════════════════════════════════════ */

window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }

document.addEventListener('DOMContentLoaded', () => {

    const serviceType = document.getElementById('serviceType');
    const klimaBtu = document.getElementById('klimaBtu');
    const districtSelect = document.getElementById('districtSelect');
    const totalKlimaPrice = document.getElementById('totalKlimaPrice');
    const btnCallKlimaMaster = document.getElementById('btnCallKlimaMaster');

    const updateKlimaPrice = () => {
        if (!serviceType || !totalKlimaPrice) return;

        const baseOption = serviceType.options[serviceType.selectedIndex];
        let basePrice = parseInt(baseOption.getAttribute('data-price')) || 1850;

        let btuFee = 0;
        const btuVal = klimaBtu?.value || '9000-12000';
        if (btuVal === '18000') btuFee = 250;
        else if (btuVal === '24000') btuFee = 400;
        else if (btuVal === 'ticari') btuFee = 800;

        let distFee = 0;
        const distVal = districtSelect?.value || 'muratpasa';
        if (distVal === 'dosemealti') distFee = 200;
        else if (distVal === 'diğer') distFee = 400;

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

            // Ads Conversion Trigger
            window.dataLayer.push({
                event: 'generate_lead',
                conversion_type: 'whatsapp_klima_calc',
                service_type: servText,
                estimated_value: finalPrice,
                currency: 'TRY'
            });
            if (typeof fbq === 'function') {
                fbq('track', 'Lead', { content_name: 'Klima Servis Teklifi', value: 1850, currency: 'TRY' });
            }

            const message = `Merhaba, AntalyadaKlimaServisi.com.tr üzerinden ulaştım. Antalya klima servis talebim var:\n\n• Servis Türü: ${servText}\n• Kapasite: ${btuText}\n• Konum: ${distText}\n• Tahmini Ücret: ${finalPrice}\n\nEn kısa sürede usta yönlendirmenizi rica ederim.`;
            const waUrl = `https://wa.me/905070871789?text=${encodeURIComponent(message)}`;

            window.open(waUrl, '_blank');
        });
    }

    // Phone Click Conversion Tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            window.dataLayer.push({
                event: 'contact_phone_click',
                phone_number: '05070871789',
                lead_category: 'Klima Telefon'
            });
            if (typeof fbq === 'function') {
                fbq('track', 'Contact', { content_name: 'Phone Call' });
            }
        });
    });

});
