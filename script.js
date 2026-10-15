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
                navbar.classList.add('py-2');
                navbar.classList.remove('py-3', 'sm:py-4');
            } else {
                navbar.classList.remove('py-2');
                navbar.classList.add('py-3', 'sm:py-4');
            }
        });
    }

    // 3. Industry Accelerators Tab Switcher
    window.switchTab = function(tabName) {
        const tabs = ['healthcare', 'manufacturing', 'fmcg'];

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

    // 5. Contact Form Submission
    const assessmentForm = document.getElementById('assessmentForm');
    const formSuccess = document.getElementById('formSuccess');

    if (assessmentForm) {
        assessmentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = assessmentForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin mr-2"></i> Submitting...`;
            }

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
});
