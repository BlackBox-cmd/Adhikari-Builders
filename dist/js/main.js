document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT SELECTORS ---
    const blocksGrid = document.getElementById('blocks-grid');
    const teamGrid = document.getElementById('team-grid');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.getElementById('checkbox');
    const navbar = document.querySelector('.navbar');
    const goldParticlesContainer = document.getElementById('gold-particles');

    // --- GOLD PARTICLE EFFECT ---
    const createGoldParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'gold-particle';

        const size = Math.random() * 4 + 2; // 2-6px
        const duration = Math.random() * 4 + 6; // 6-10s
        const delay = Math.random() * 2; // 0-2s
        const left = Math.random() * 100;

        particle.style.cssText = `
            left: ${left}%;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;

        goldParticlesContainer.appendChild(particle);

        setTimeout(() => particle.remove(), (duration + delay) * 1000);
    };

    // Create particles periodically
    if (goldParticlesContainer) {
        setInterval(createGoldParticle, 800);
        // Create initial batch
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createGoldParticle(), i * 200);
        }
    }

    // --- NAVBAR SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

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
            card.style.cursor = 'pointer';
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
                        <p class="card-storage" style="margin-top: 10px; font-size: 0.9em; color: var(--text-secondary);"><i class="fas fa-box"></i> Total Storage: ${block.storage ? block.storage.toLocaleString() : 0} su</p>
                    </div>

                </div>
            `;
            card.addEventListener('click', () => openPropertyModal(block));
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

    // --- MODAL LOGIC ---
    const modalOverlay = document.getElementById('property-modal');
    const modalTitle = document.getElementById('modal-title');
    const propertiesTbody = document.getElementById('properties-tbody');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const propertiesTableContainer = document.getElementById('properties-table-container');
    const bookingFormContainer = document.getElementById('booking-form-container');
    const bookingForm = document.getElementById('booking-form');
    const bookingAddressInput = document.getElementById('booking-address');
    const backToPropertiesBtn = document.getElementById('back-to-properties-btn');
    const bookingCancelBtn = document.getElementById('booking-cancel-btn');
    const bookingSubmitBtn = document.getElementById('booking-submit-btn');
    const bookingMessageDiv = document.getElementById('booking-message');
    const websiteHoneypotField = document.getElementById('website');

    // Set minimum date to today for booking date picker
    const setMinDate = () => {
        const dateInput = document.getElementById('booking-date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    };

    const openPropertyModal = (block) => {
        modalTitle.textContent = `${block.name} - Available Properties`;
        propertiesTbody.innerHTML = '';

        // Reset form visibility
        propertiesTableContainer.style.display = '';
        bookingFormContainer.style.display = 'none';
        bookingForm.reset();
        bookingMessageDiv.textContent = '';
        bookingMessageDiv.className = 'booking-message';

        const availableProps = block.properties ? block.properties.filter(prop => prop.status === 'Empty') : [];

        if (availableProps.length > 0) {
            availableProps.forEach(prop => {
                const tr = document.createElement('tr');

                // Create cells using textContent for security
                const addressCell = document.createElement('td');
                addressCell.textContent = prop.address;

                const statusCell = document.createElement('td');
                const statusBadge = document.createElement('span');
                statusBadge.className = 'card-status-badge';
                statusBadge.style.backgroundColor = 'var(--available-color)';
                statusBadge.style.color = '#000';
                statusBadge.textContent = 'Available';
                statusCell.appendChild(statusBadge);

                const bookingCell = document.createElement('td');
                const bookBtn = document.createElement('button');
                bookBtn.type = 'button';
                bookBtn.className = 'book-btn';
                bookBtn.textContent = 'Book';
                bookBtn.addEventListener('click', () => openBookingForm(prop.address));
                bookingCell.appendChild(bookBtn);

                const interiorCell = document.createElement('td');
                interiorCell.textContent = prop.interior;

                const storageCell = document.createElement('td');
                storageCell.className = 'financial-value';
                storageCell.textContent = prop.storage ? prop.storage.toLocaleString() + ' su' : '0 su';

                tr.appendChild(addressCell);
                tr.appendChild(statusCell);
                tr.appendChild(bookingCell);
                tr.appendChild(interiorCell);
                tr.appendChild(storageCell);

                propertiesTbody.appendChild(tr);
            });
        } else {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.setAttribute('colspan', '5');
            td.style.textAlign = 'center';
            td.style.padding = '20px';
            td.textContent = 'No available properties found, all are Sold Out';
            tr.appendChild(td);
            propertiesTbody.appendChild(tr);
        }

        setMinDate();
        modalOverlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    };

    const openBookingForm = (address) => {
        propertiesTableContainer.style.display = 'none';
        bookingFormContainer.style.display = 'block';
        bookingAddressInput.value = address;
        bookingMessageDiv.textContent = '';
        bookingMessageDiv.className = 'booking-message';

        // Move focus to first form field
        const nameInput = document.getElementById('booking-name');
        nameInput.focus();
    };

    const showPropertiesTable = () => {
        propertiesTableContainer.style.display = '';
        bookingFormContainer.style.display = 'none';
        bookingForm.reset();
        bookingMessageDiv.textContent = '';
        bookingMessageDiv.className = 'booking-message';
    };

    const closePropertyModal = () => {
        modalOverlay.classList.remove('visible');
        document.body.style.overflow = 'auto';
        showPropertiesTable(); // Reset to properties view
    };

    // Booking form validation and submission
    const validateBookingForm = () => {
        const name = document.getElementById('booking-name').value.trim();
        const cid = document.getElementById('booking-cid').value.trim();
        const phone = document.getElementById('booking-phone').value.trim();
        const address = bookingAddressInput.value.trim();
        const date = document.getElementById('booking-date').value;
        const website = websiteHoneypotField.value;

        // Honeypot check
        if (website) {
            console.warn('Honeypot field filled - possible spam');
            return false;
        }

        // Required fields
        if (!name || !cid || !phone || !address || !date) {
            showBookingError('Please fill in all required fields.');
            return false;
        }

        // Name validation (letters, spaces, hyphens only, max 50)
        if (!/^[a-zA-Z\s\-]{2,50}$/.test(name)) {
            showBookingError('Name must be 2-50 characters (letters, spaces, and hyphens only).');
            return false;
        }

        // CID validation (1-5 digits only, max 10000)
        if (!/^\d{1,5}$/.test(cid)) {
            showBookingError('CID must be 1-5 digits.');
            return false;
        }
        const cidNum = parseInt(cid, 10);
        if (cidNum < 1 || cidNum > 10000) {
            showBookingError('CID must be between 1 and 10000.');
            return false;
        }

        // Phone validation (123-4567 format)
        if (!/^\d{3}-\d{4}$/.test(phone)) {
            showBookingError('Phone must be in format: 123-4567');
            return false;
        }

        // Date validation (not in past)
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            showBookingError('Please select a future date.');
            return false;
        }

        return true;
    };

    const showBookingError = (message) => {
        bookingMessageDiv.textContent = message;
        bookingMessageDiv.className = 'booking-message booking-message--error';
        bookingMessageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    const showBookingSuccess = (message) => {
        bookingMessageDiv.textContent = message;
        bookingMessageDiv.className = 'booking-message booking-message--success';
    };

    const submitBooking = async (event) => {
        event.preventDefault();

        if (!validateBookingForm()) {
            return;
        }

        // Disable submit button while sending
        bookingSubmitBtn.disabled = true;
        bookingSubmitBtn.textContent = 'Sending...';

        try {
            const formData = {
                name: document.getElementById('booking-name').value.trim(),
                cid: document.getElementById('booking-cid').value.trim(),
                phone: document.getElementById('booking-phone').value.trim(),
                address: bookingAddressInput.value.trim(),
                date: document.getElementById('booking-date').value
            };

            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showBookingSuccess('✓ Booking request sent! Our team will review your request soon.');
                bookingForm.reset();

                // Close modal after 2 seconds
                setTimeout(() => {
                    closePropertyModal();
                }, 2000);
            } else if (response.status === 429) {
                showBookingError('Too many requests. Please try again in a few minutes.');
            } else if (response.status === 400) {
                const errorData = await response.json();
                showBookingError(errorData.error || 'Please check your information and try again.');
            } else {
                showBookingError('An error occurred. Please try again or contact support.');
            }
        } catch (error) {
            console.error('Booking submission error:', error);
            showBookingError('Connection error. Please check your internet and try again.');
        } finally {
            bookingSubmitBtn.disabled = false;
            bookingSubmitBtn.textContent = 'Order';
        }
    };

    // Event listeners
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closePropertyModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closePropertyModal();
        });
    }

    // Booking form event listeners
    if (bookingForm) {
        bookingForm.addEventListener('submit', submitBooking);
    }
    if (backToPropertiesBtn) {
        backToPropertiesBtn.addEventListener('click', showPropertiesTable);
    }
    if (bookingCancelBtn) {
        bookingCancelBtn.addEventListener('click', showPropertiesTable);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('visible')) {
            if (bookingFormContainer.style.display === 'block') {
                showPropertiesTable();
            } else {
                closePropertyModal();
            }
        }
    });

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