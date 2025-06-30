document.addEventListener('DOMContentLoaded', () => {
    // Tabs functionality
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = document.getElementById(tab.dataset.target);
            panels.forEach(panel => {
                panel.classList.add('hidden');
            });
            
            target.classList.remove('hidden');
        });
    });

    // Intersection Observer for fade-in animations
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Chart.js functionality
    const ctx = document.getElementById('costoChart');
    if(ctx) {
        const data = {
            labels: ['Costo de Encarcelamiento para el Estado', 'Costo del Programa + Aporte a la Sociedad'],
            datasets: [{
                label: 'Análisis de Costo-Beneficio',
                data: [100, 35],
                backgroundColor: ['#dc2626', '#0891b2'],
                hoverOffset: 4,
                borderColor: '#fafaf9',
                borderWidth: 4,
            }]
        };

        const config = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#44403c', font: { size: 14, family: "'Inter', sans-serif" } }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed !== null) { label += context.parsed + '% (Estimado)'; }
                                return label;
                            }
                        }
                    }
                },
                cutout: '60%',
            }
        };
        new Chart(ctx, config);
    }

    // --- NUEVA LÓGICA PARA EL REPRODUCTOR DE AUDIO ---
    const audioPlayer = document.getElementById('audio-player');
    const audioButton = document.getElementById('audio-toggle-button');
    const audioIcon = document.getElementById('audio-icon');

    if(audioPlayer && audioButton && audioIcon) {
        const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
        const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>`;
        
        audioIcon.innerHTML = playIcon;

        audioButton.addEventListener('click', function() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                audioIcon.innerHTML = pauseIcon;
            } else {
                audioPlayer.pause();
                audioIcon.innerHTML = playIcon;
            }
        });

        audioPlayer.addEventListener('ended', function() {
            audioIcon.innerHTML = playIcon;
        });
    }
});
