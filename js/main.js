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
        
        blocksGrid.innerHTML = ''; // Clear existing content
        propertyBlocks.forEach(block => {
            const card = document.createElement('div');
            card.className = 'card block-card';
            card.dataset.name = block.name; // Add data-name for identification

            card.innerHTML = `
                <div class="card-image" style="background-image: url('${block.image}');"></div>
                <div class="card-content">
                    <h3>${block.name}</h3>
                    <p class="location">${block.location}</p>
                    <p class="available-units">Units: ${block.availableUnits}</p>
                    <p class="view-units-prompt">Click to view units</p>
                </div>
            `;
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
                    <h4>${unit.type}</h4>
                    <p><strong>Rent:</strong> ${unit.rent}</p>
                    <p><strong>Storage:</strong> ${unit.storage} kg</p>
                    <p><strong>Max Occupancy:</strong> ${unit.max_capacity}</p>
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
                <div class="card-image" style="background-image: url('${member.image}');"></div>
                <div class="card-content">
                    <h3>${member.name}</h3>
                    <p class="role">${member.role}</p>
                    <p class="phone">Phone: ${member.phone}</p>
                </div>
            `;
            teamGrid.appendChild(card);
        });
    };

    // --- EVENT LISTENERS ---

    // Click listener for block cards (using event delegation)
    blocksGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.block-card');
        if (card) {
            populateAndShowUnits(card.dataset.name);
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