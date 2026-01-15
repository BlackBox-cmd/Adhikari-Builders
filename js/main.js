document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    const blocksGrid = document.getElementById('blocks-grid');
    const teamGrid = document.getElementById('team-grid');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('checkbox');
    const modal = document.getElementById('unit-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');

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

    // --- MODAL LOGIC ---
    const openModal = () => modal.classList.add('visible');
    const closeModal = () => modal.classList.remove('visible');

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- DYNAMIC CONTENT GENERATION ---

    // Function to generate property BLOCK cards
    const generateBlocks = () => {
        if (!blocksGrid || typeof propertyBlocks === 'undefined') return;

        const template = document.getElementById('property-block-template');
        if (!template) {
            console.error('Property block template not found!');
            return;
        }

        blocksGrid.innerHTML = ''; // Clear existing content
        propertyBlocks.forEach(block => {
            const card = template.content.cloneNode(true).querySelector('.card');
            
            card.querySelector('.card-img').src = block.image;
            card.querySelector('.card-img').alt = block.name;
            card.querySelector('.card-title').innerHTML = `<i class="fas fa-building"></i> ${block.name}`;
            card.querySelector('.card-location').textContent = block.location;
            
            const availableUnitsParagraph = document.createElement('p');
            availableUnitsParagraph.className = 'available-units';
            availableUnitsParagraph.innerHTML = `<i class="fas fa-th-large"></i> Units: ${block.availableUnits}`;
            
            card.querySelector('.card-content').insertBefore(availableUnitsParagraph, card.querySelector('.card-status'));
            
            const statusDiv = card.querySelector('.card-status');
            statusDiv.textContent = block.status;
            
            const banner = card.querySelector('.card-banner');
            let statusClass = block.status.toLowerCase().replace(' ', '-'); // e.g., 'sold-out'
            banner.classList.add(statusClass);

            // Add dataset for modal
            card.dataset.name = block.name;

            blocksGrid.appendChild(card);
        });
    };

    // Function to populate modal with UNIT details
    const populateAndShowUnits = (blockName) => {
        const block = propertyBlocks.find(b => b.name === blockName);
        if (!block) return;

        modalTitle.textContent = `Available Units in ${block.name}`;
        modalContent.innerHTML = ''; // Clear previous units

        if (block.units.length > 0) {
            block.units.forEach(unit => {
                const unitCard = document.createElement('div');
                unitCard.className = 'card unit-card';
                unitCard.innerHTML = `
                    <h4><i class="fas fa-door-open"></i> ${unit.type}</h4>
                    <p><i class="fas fa-box"></i> <strong>Storage:</strong> ${unit.storage} kg</p>
                    <p><i class="fas fa-users"></i> <strong>Max Occupancy:</strong> ${unit.max_capacity}</p>
                    <p><strong>Rent:</strong> ${unit.rent}</p>

                `;
                modalContent.appendChild(unitCard);
            });
        } else {
            modalContent.innerHTML = '<p>No units currently available in this block.</p>';
        }

        openModal();
    };

    // Function to generate TEAM member cards
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

    // Click listener for "View Units" button (using event delegation)
    blocksGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-units-btn')) {
            const card = e.target.closest('.card');
            if (card) {
                populateAndShowUnits(card.dataset.name);
            }
        }
    });

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // --- INITIALIZATION ---
    generateBlocks();
    generateTeam();
});