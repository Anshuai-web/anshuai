// Interactive Logic for AnshuAI (anshuai.in)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // 2. Navbar Scroll Dynamic Shrink Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('py-1.5', 'sm:py-2');
                navbar.classList.remove('py-2.5', 'py-3', 'sm:py-4');
            } else {
                navbar.classList.remove('py-1.5', 'sm:py-2');
                navbar.classList.add('py-2.5', 'sm:py-4');
            }
        });
    }

    // 3. Industry Accelerators Tab Switcher
    window.switchTab = function(tabName) {
        const tabs = ['healthcare', 'manufacturing', 'automotive', 'fmcg'];

        tabs.forEach(t => {
            const content = document.getElementById(`tab-${t}`);
            const btn = document.getElementById(`tabBtn-${t}`);

            if (t === tabName) {
                if (content) content.classList.remove('hidden');
                if (btn) {
                    btn.classList.add('active');
                    btn.classList.remove('text-slate-400');
                }
            } else {
                if (content) content.classList.add('hidden');
                if (btn) {
                    btn.classList.remove('active');
                    btn.classList.add('text-slate-400');
                }
            }
        });
    };

    // 4. Interactive ROI Calculator Logic
    const calcIndustry = document.getElementById('calcIndustry');
    const calcEmployees = document.getElementById('calcEmployees');
    const calcEmployeesVal = document.getElementById('calcEmployeesVal');
    const calcTickets = document.getElementById('calcTickets');
    const calcTicketsVal = document.getElementById('calcTicketsVal');
    const resHours = document.getElementById('resHours');
    const resSavings = document.getElementById('resSavings');

    function updateCalculator() {
        if (!calcEmployees || !calcTickets || !resHours || !resSavings) return;

        const employees = parseInt(calcEmployees.value, 10);
        const tickets = parseInt(calcTickets.value, 10);
        const industry = calcIndustry ? calcIndustry.value : 'healthcare';

        // Update labels
        calcEmployeesVal.innerText = `${employees.toLocaleString()} Staff`;
        calcTicketsVal.innerText = `${tickets.toLocaleString()} Cases`;

        // Multipliers based on industry workflow complexity
        let industryMultiplier = 1.0;
        let blendedRate = 28; // $ per hour

        if (industry === 'healthcare') {
            industryMultiplier = 1.25; // Higher compliance and clinician overhead
            blendedRate = 32;
        } else if (industry === 'manufacturing') {
            industryMultiplier = 1.15; // Downtime & Field Service impact
            blendedRate = 30;
        } else if (industry === 'automotive') {
            industryMultiplier = 1.22; // Telematics, supplier warranty & SDV complexity
            blendedRate = 32;
        } else if (industry === 'fmcg') {
            industryMultiplier = 1.1;  // Stockout & PO velocity
            blendedRate = 26;
        }

        // Calculation:
        // Average knowledge worker spends ~15% of time on manual triage/admin = ~300 hrs/yr
        // AnshuAI automates ~25% to 35% of that = ~90 hrs/worker/yr
        // In addition, each manual ticket consumes ~30 mins. AI triage saves ~15 mins per ticket = 0.25 hrs * tickets * 12
        const workerHoursSaved = employees * 45 * industryMultiplier;
        const ticketHoursSaved = (tickets * 12) * 0.22 * industryMultiplier;
        const totalHours = Math.round(workerHoursSaved + ticketHoursSaved);

        const totalSavings = Math.round(totalHours * blendedRate);

        // Render formatted numbers
        resHours.innerText = `${totalHours.toLocaleString()} Hours`;
        resSavings.innerText = `$${totalSavings.toLocaleString()} / Year`;
    }

    if (calcEmployees && calcTickets && calcIndustry) {
        calcEmployees.addEventListener('input', updateCalculator);
        calcTickets.addEventListener('input', updateCalculator);
        calcIndustry.addEventListener('change', updateCalculator);
        updateCalculator();
    }

    // 5. Contact Form Submission with Anti-Spam & Input Sanitization
    const assessmentForm = document.getElementById('assessmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (assessmentForm) {
        assessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check anti-spam honeypot
            const botCheck = document.getElementById('botCheck');
            if (botCheck && botCheck.value.trim() !== '') {
                console.warn('Spam submission detected and blocked.');
                return;
            }

            // Check privacy consent
            const consentCheck = document.getElementById('consentCheck');
            if (consentCheck && !consentCheck.checked) {
                alert('Please consent to the processing of your contact details in accordance with our Privacy Policy to proceed.');
                consentCheck.focus();
                return;
            }

            const submitBtn = assessmentForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Submitting...`;
            }

            // Sanitize input values against script injection
            const sanitize = (str) => str ? String(str).replace(/[<>]/g, '') : '';
            const formData = {
                firstName: sanitize(document.getElementById('formFirstName')?.value),
                lastName: sanitize(document.getElementById('formLastName')?.value),
                email: sanitize(document.getElementById('formEmail')?.value),
                phone: sanitize(document.getElementById('formPhone')?.value),
                company: sanitize(document.getElementById('formCompany')?.value),
                title: sanitize(document.getElementById('formTitle')?.value),
                vertical: sanitize(document.getElementById('formVertical')?.value),
                serviceNowStatus: sanitize(document.getElementById('formServiceNowStatus')?.value),
                notes: sanitize(document.getElementById('formNotes')?.value)
            };

            // Simulate enterprise API intake
            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.add('hidden');
                }
                if (formSuccess) {
                    formSuccess.classList.remove('hidden');
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 800);
        });
    }

    // 6. Careers Application Form Submission
    const careerForm = document.getElementById('careerForm');
    const careerSuccess = document.getElementById('careerSuccess');

    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Check honeypot
            const careerBotCheck = document.getElementById('careerBotCheck');
            if (careerBotCheck && careerBotCheck.value.trim() !== '') {
                console.warn('Bot application blocked.');
                return;
            }

            // Check candidate privacy consent
            const careerConsentCheck = document.getElementById('careerConsentCheck');
            if (careerConsentCheck && !careerConsentCheck.checked) {
                alert('Please agree to the processing and retention of your candidacy application in accordance with our Privacy Policy.');
                careerConsentCheck.focus();
                return;
            }

            const submitBtn = careerForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Transmitting Application...`;
            }

            const sanitize = (str) => str ? String(str).replace(/[<>]/g, '') : '';
            const applicantData = {
                name: sanitize(document.getElementById('careerName')?.value),
                email: sanitize(document.getElementById('careerEmail')?.value),
                phone: sanitize(document.getElementById('careerPhone')?.value),
                experience: sanitize(document.getElementById('careerExperience')?.value),
                role: sanitize(document.getElementById('careerRole')?.value),
                link: sanitize(document.getElementById('careerLink')?.value),
                message: sanitize(document.getElementById('careerMessage')?.value)
            };

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.classList.add('hidden');
                }
                if (careerSuccess) {
                    careerSuccess.classList.remove('hidden');
                    careerSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 800);
        });
    }

    // 7. Cookie Consent & Preference Management (ePrivacy & DPDP Act Compliance)
    window.openCookieSettings = function() {
        showCookieBanner(true);
    };

    function showCookieBanner(force = false) {
        if (!force && localStorage.getItem('anshuai_cookie_consent')) return;
        if (document.getElementById('cookieConsentBanner')) return;

        const banner = document.createElement('div');
        banner.id = 'cookieConsentBanner';
        banner.className = 'fixed bottom-4 inset-x-4 sm:left-auto sm:right-6 sm:max-w-md z-50 p-5 rounded-2xl backdrop-blur-2xl bg-[#041619]/95 border border-gold/40 shadow-2xl shadow-black/80 space-y-3 transition-all transform duration-300';
        banner.innerHTML = `
            <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-heading">
                    <i class="fa-solid fa-cookie-bite text-gold"></i>
                    <span>Privacy & Cookie Preferences</span>
                </div>
                <button onclick="document.getElementById('cookieConsentBanner')?.remove()" class="text-slate-400 hover:text-white p-1 text-xs" aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
                We use strictly necessary cookies to secure your session and store ROI calculator state. We respect your sovereignty and do not track you across external sites. Learn more in our <a href="./cookies.html" class="text-gold underline hover:text-goldLight">Cookie Policy</a> and <a href="./privacy.html" class="text-gold underline hover:text-goldLight">Privacy Policy</a>.
            </p>
            <div class="pt-1 flex items-center gap-2">
                <button id="btnAcceptAllCookies" class="btn-gold-solid flex-1 py-2 text-xs uppercase font-bold tracking-wider text-center">
                    Accept All
                </button>
                <button id="btnEssentialOnlyCookies" class="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold/40 text-xs font-semibold text-slate-200 text-center transition">
                    Essential Only
                </button>
            </div>
        `;
        document.body.appendChild(banner);

        document.getElementById('btnAcceptAllCookies')?.addEventListener('click', () => {
            localStorage.setItem('anshuai_cookie_consent', 'all');
            banner.remove();
        });

        document.getElementById('btnEssentialOnlyCookies')?.addEventListener('click', () => {
            localStorage.setItem('anshuai_cookie_consent', 'essential');
            banner.remove();
        });
    }

    // Initialize banner check
    showCookieBanner();
});

