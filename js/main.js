document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    const blocksGrid = document.getElementById('blocks-grid');
    const teamGrid = document.getElementById('team-grid');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('checkbox');

    // --- THEME SWITCHER ---
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'light-mode') {
            themeToggle.checked = true;
        }
    }
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        } else {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // --- HELPERS ---
    const formatCurrency = (v) => `$${v.toLocaleString()}`;

    // --- DYNAMIC CONTENT GENERATION ---

    const generateBlocks = () => {
        if (!blocksGrid || typeof propertyBlocks === 'undefined') return;

        blocksGrid.innerHTML = '';
        propertyBlocks.forEach(block => {
            const [occupied, total] = block.occupiedProperties.split('/').map(Number);
            const available = total - occupied;
            const occupancyPct = total > 0 ? (occupied / total) * 100 : 0;
            const profit = block.income - block.cost;

            let status, statusClass;
            if (available === 0) { status = 'Sold Out'; statusClass = 'sold-out'; }
            else if (available <= 2) { status = 'Limited'; statusClass = 'limited'; }
            else { status = 'Available'; statusClass = 'available'; }

            let barClass;
            if (occupancyPct >= 90) barClass = 'high';
            else if (occupancyPct >= 50) barClass = 'medium';
            else barClass = 'low';

            const card = document.createElement('div');
            card.className = 'card block-card';
            card.innerHTML = `
                <img src="${block.image}" alt="${block.name}" class="card-img">
                <div class="card-banner ${statusClass}"></div>
                <div class="card-content">
                    <div class="card-header">
                        <span class="block-id">Block #${block.id}</span>
                        <span class="card-status-badge ${statusClass}">${status}</span>
                    </div>
                    <h3 class="card-title"><i class="fas fa-building"></i> ${block.name}</h3>
                    <div class="occupancy-section">
                        <p class="card-occupancy"><i class="fas fa-th-large"></i> Occupancy: ${occupied}/${total} <span class="available-tag">(${available} available)</span></p>
                        <div class="occupancy-bar">
                            <div class="occupancy-fill ${barClass}" style="width: ${occupancyPct}%"></div>
                        </div>
                    </div>

                </div>
            `;
            blocksGrid.appendChild(card);
        });
    };

    const generateTeam = () => {
        if (!teamGrid || typeof teamMembers === 'undefined') return;

        teamGrid.innerHTML = '';
        teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'card team-card';
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name}" class="card-img">
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p class="role">${member.role}</p>
                    <p class="phone"><i class="fas fa-phone-alt"></i> ${member.phone}</p>
                </div>
            `;
            teamGrid.appendChild(card);
        });
    };

    // --- EVENT LISTENERS ---

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            }
        });
    });

    // --- INITIALIZATION ---
    generateBlocks();
    generateTeam();
});