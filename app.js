/**
 * CampusEvents - Main Application Script
 * Navigation, Universal Event Details Modal, Lucide Icons, Countdown & Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initLucideIcons();
    initUniversalModal();
    initLiveCountdown();
});

// ==========================================================================
// 1. NAVIGATION & ACTIVE STATE
// ==========================================================================
function initNavigation() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const siteNav = document.querySelector('.site-nav');

    if (toggleBtn && siteNav) {
        toggleBtn.addEventListener('click', () => {
            siteNav.classList.toggle('open');
            const isOpen = siteNav.classList.contains('open');
            toggleBtn.setAttribute('aria-expanded', isOpen);
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!siteNav.contains(e.target) && !toggleBtn.contains(e.target) && siteNav.classList.contains('open')) {
                siteNav.classList.remove('open');
            }
        });
    }

    // Set active link based on current path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.site-nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==========================================================================
// 2. LUCIDE ICONS INITIALIZER
// ==========================================================================
function initLucideIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
}

// Re-run icons when DOM changes
function refreshIcons() {
    setTimeout(() => {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    }, 50);
}

// ==========================================================================
// 3. UNIVERSAL EVENT DETAILS MODAL
// ==========================================================================
function initUniversalModal() {
    let modalOverlay = document.getElementById('eventDetailsModal');
    if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'eventDetailsModal';
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-dialog">
                <button class="modal-close-btn" onclick="closeEventModal()" aria-label="Close">
                    <i data-lucide="x" style="width: 20px; height: 20px;"></i>
                </button>
                <div id="modalEventContent"></div>
            </div>
        `;
        document.body.appendChild(modalOverlay);

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeEventModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeEventModal();
        });
    }
}

function openEventModal(eventId) {
    const event = getEventById(eventId);
    if (!event) return;

    const theme = getEventTheme(event.category, event.title);
    const coverImage = event.customImage || theme.image;
    const formattedDate = formatDisplayDate(event.date);

    const contentContainer = document.getElementById('modalEventContent');
    if (!contentContainer) return;

    const rulesList = Array.isArray(event.rules) && event.rules.length > 0 
        ? `<div style="margin-top: 18px;">
            <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                <i data-lucide="file-text" style="width: 16px; height: 16px; color: var(--purple);"></i> Rules & Guidelines
            </h4>
            <ul style="padding-left: 20px; font-size: 13.5px; color: var(--text-muted); line-height: 1.6;">
                ${event.rules.map(r => `<li style="margin-bottom: 6px;">${r}</li>`).join('')}
            </ul>
           </div>`
        : '';

    contentContainer.innerHTML = `
        <div style="position: relative; height: 260px; overflow: hidden; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
            <img src="${coverImage}" alt="${event.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(19, 13, 36, 0.2) 0%, rgba(19, 13, 36, 0.9) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;">
                <span class="badge ${theme.badgeClass}" style="align-self: flex-start; margin-bottom: 8px;">
                    <i data-lucide="${theme.icon}" style="width: 13px; height: 13px;"></i> ${event.category}
                </span>
                <h2 style="color: #ffffff; font-size: 26px; font-weight: 800; line-height: 1.25;">${event.title}</h2>
                <p style="color: var(--accent); font-size: 13.5px; font-weight: 600; margin-top: 4px;">${event.tagline || theme.tag}</p>
            </div>
        </div>

        <div style="padding: 26px;">
            <!-- Metadata Cards Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 20px; background: var(--bg); padding: 16px; border-radius: var(--radius-md); border: 1px solid var(--border-light);">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(124, 58, 237, 0.1); color: var(--purple); display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="calendar" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Event Date</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary);">${formattedDate.full}</div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(0, 229, 255, 0.1); color: #0284c7; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="clock" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Event Time</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary);">${event.time}</div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: var(--success); display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="map-pin" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Venue Location</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary);">${event.venue}</div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(245, 158, 11, 0.1); color: var(--warning); display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="users" style="width: 18px; height: 18px;"></i>
                    </div>
                    <div>
                        <div style="font-size: 11px; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">Team Format</div>
                        <div style="font-size: 13.5px; font-weight: 700; color: var(--primary);">${event.teamSize || 'Open'}</div>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div style="margin-bottom: 20px;">
                <h4 style="font-size: 15px; font-weight: 700; color: var(--primary); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
                    <i data-lucide="info" style="width: 16px; height: 16px; color: var(--purple);"></i> About This Event
                </h4>
                <p style="font-size: 14.5px; color: var(--text); line-height: 1.6;">${event.description}</p>
            </div>

            <!-- Organizer & Eligibility -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px; font-size: 13px;">
                <div style="background: var(--bg); padding: 12px; border-radius: var(--radius-sm);">
                    <div style="color: var(--text-muted); font-size: 11px; font-weight: 700; text-transform: uppercase;">Organized By</div>
                    <div style="font-weight: 700; color: var(--primary); margin-top: 2px;">${event.organizer}</div>
                </div>
                <div style="background: var(--bg); padding: 12px; border-radius: var(--radius-sm);">
                    <div style="color: var(--text-muted); font-size: 11px; font-weight: 700; text-transform: uppercase;">Eligibility</div>
                    <div style="font-weight: 700; color: var(--primary); margin-top: 2px;">${event.eligibility || 'All Students'}</div>
                </div>
            </div>

            ${rulesList}

            <!-- Deadline Callout -->
            <div style="margin-top: 20px; padding: 12px 16px; background: rgba(239, 68, 68, 0.08); border-left: 3px solid var(--danger); border-radius: 6px; font-size: 13.5px; color: #991b1b; display: flex; align-items: center; justify-content: space-between;">
                <span><strong>Registration Deadline:</strong> ${event.registrationDeadline || 'Closing soon'}</span>
                <span class="badge badge-status-open">Registrations Open</span>
            </div>

            <!-- Action Buttons -->
            <div style="display: flex; gap: 12px; margin-top: 24px; padding-top: 20px; border-top: 1px solid var(--border-light);">
                <button type="button" class="btn btn-outline" style="flex: 1;" onclick="closeEventModal()">
                    Close
                </button>
                <a href="registration.html?event=${encodeURIComponent(event.title)}" class="btn btn-primary" style="flex: 2;">
                    <i data-lucide="check-circle" style="width: 18px; height: 18px;"></i> Register for this Event
                </a>
            </div>
        </div>
    `;

    const modal = document.getElementById('eventDetailsModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    refreshIcons();
}

function closeEventModal() {
    const modal = document.getElementById('eventDetailsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// 4. REUSABLE EVENT CARD HTML GENERATOR
// ==========================================================================
function createEventCardHTML(event) {
    const theme = getEventTheme(event.category, event.title);
    const coverImage = event.customImage || theme.image;
    const formattedDate = formatDisplayDate(event.date);

    return `
        <article class="event-card" data-category="${event.category}" data-id="${event.id}">
            <div class="event-card-media">
                <img src="${coverImage}" alt="${event.title}" class="event-card-img" loading="lazy">
                <div class="event-card-overlay">
                    <div class="event-card-top">
                        <span class="badge ${theme.badgeClass} event-card-badge">
                            <i data-lucide="${theme.icon}" style="width: 12px; height: 12px;"></i>
                            ${event.category}
                        </span>
                        <div class="event-date-chip">
                            <div class="day">${formattedDate.day}</div>
                            <div class="month">${formattedDate.month}</div>
                        </div>
                    </div>
                    <div class="event-card-theme-tag">
                        <i data-lucide="activity" style="width: 12px; height: 12px; color: var(--accent);"></i>
                        ${event.tagline ? event.tagline.slice(0, 45) + '...' : theme.tag}
                    </div>
                </div>
            </div>
            <div class="event-card-body">
                <h3 class="event-card-title">${event.title}</h3>
                <p class="event-card-desc">${event.description}</p>
                
                <div class="event-card-meta">
                    <div class="meta-item">
                        <i data-lucide="calendar" style="width: 15px; height: 15px;"></i>
                        <span>${formattedDate.full}</span>
                    </div>
                    <div class="meta-item">
                        <i data-lucide="clock" style="width: 15px; height: 15px;"></i>
                        <span>${event.time}</span>
                    </div>
                    <div class="meta-item">
                        <i data-lucide="map-pin" style="width: 15px; height: 15px;"></i>
                        <span>${event.venue}</span>
                    </div>
                </div>

                <div class="event-card-footer">
                    <button class="btn btn-outline btn-sm" onclick="openEventModal('${event.id}')">
                        <i data-lucide="info" style="width: 14px; height: 14px;"></i> Details
                    </button>
                    <a href="registration.html?event=${encodeURIComponent(event.title)}" class="btn btn-primary btn-sm">
                        <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i> Register
                    </a>
                </div>
            </div>
        </article>
    `;
}

// ==========================================================================
// 5. REAL-TIME COUNTDOWN
// ==========================================================================
function initLiveCountdown() {
    const targetDate = new Date("2026-09-20T09:00:00").getTime();

    function update() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const daysEl = document.getElementById('countdownDays');
        const hoursEl = document.getElementById('countdownHours');
        const minsEl = document.getElementById('countdownMins');
        const secsEl = document.getElementById('countdownSecs');
        const legacyEl = document.getElementById('countdown');

        if (diff <= 0) {
            if (legacyEl) legacyEl.textContent = "Tech Hackathon 2026 is LIVE now!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');

        if (legacyEl) {
            legacyEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until Tech Hackathon`;
        }
    }

    update();
    setInterval(update, 1000);
}

// ==========================================================================
// 6. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconName = 'bell';
    if (type === 'success') iconName = 'check-circle';
    if (type === 'error') iconName = 'alert-circle';

    toast.innerHTML = `
        <i data-lucide="${iconName}" style="width: 18px; height: 18px; color: var(--accent); flex-shrink: 0;"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);
    refreshIcons();

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3800);
}
