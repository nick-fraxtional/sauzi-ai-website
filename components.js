class GlobalNav extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav id="navbar" class="fixed top-0 left-0 w-screen z-[60] h-20 transition-all duration-300 backdrop-blur-sm bg-background/95 border-b border-border">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-20">
                    <!-- Logo -->
                    <div class="flex-shrink-0 flex items-center">
                        <a href="index.html" class="text-2xl font-serif font-semibold tracking-tighter group">
                            <span class="text-ink group-hover:text-primary transition-colors">Sauzi</span><span
                                class="text-primary">.ai</span>
                        </a>
                    </div>

                    <!-- Desktop Menu -->
                    <div class="hidden md:flex items-center space-x-8">
                        <a href="how-it-works.html" class="nav-link text-ink-2 hover:text-ink transition-colors text-sm font-medium">How It Works</a>
                        <a href="playbooks.html" class="nav-link text-ink-2 hover:text-ink transition-colors text-sm font-medium">Playbooks</a>
                        <a href="why-sauzi.html" class="nav-link text-ink-2 hover:text-ink transition-colors text-sm font-medium">Why Sauzi</a>
                        <a href="blog.html" class="nav-link text-ink-2 hover:text-ink transition-colors text-sm font-medium">Blog</a>
                        <a href="index.html#book-call" class="bg-ink hover:bg-ink/90 text-background px-5 py-2.5 rounded-lg text-sm font-bold transition-all border-0">Get Started</a>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden flex items-center">
                        <button id="mobile-menu-button" type="button" class="text-ink-2 hover:text-ink p-2 transition-colors">
                            <svg id="menu-icon" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg id="close-icon" class="h-6 w-6 hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="md:hidden absolute top-20 right-0 w-full h-[calc(100vh-5rem)] overflow-y-auto bg-background border-l border-b border-border shadow-warm-lg transform translate-x-full opacity-0 invisible pointer-events-none">
                <div class="px-4 py-8 space-y-6 flex flex-col items-center text-center">
                    <a href="how-it-works.html" class="mobile-link text-xl font-medium text-ink-2 py-2">How It Works</a>
                    <a href="playbooks.html" class="mobile-link text-xl font-medium text-ink-2 py-2">Playbooks</a>
                    <a href="why-sauzi.html" class="mobile-link text-xl font-medium text-ink-2 py-2">Why Sauzi</a>
                    <a href="blog.html" class="mobile-link text-xl font-medium text-ink-2 py-2">Blog</a>
                    <div class="pt-4 w-full px-4">
                        <a href="index.html#book-call" class="mobile-link block w-full bg-ink text-background hover:bg-ink/90 py-4 rounded-xl text-lg font-bold transition-all">Get Started</a>
                    </div>
                </div>
            </div>
        </nav>
        `;

        // Mobile Menu Logic Initialization
        const mobileMenuButton = this.querySelector('#mobile-menu-button');
        const mobileMenu = this.querySelector('#mobile-menu');
        const menuIcon = this.querySelector('#menu-icon');
        const closeIcon = this.querySelector('#close-icon');
        const mobileLinks = this.querySelectorAll('.mobile-link');

        const closedClasses = ['translate-x-full', 'opacity-0', 'invisible', 'pointer-events-none'];
        const openClasses = ['translate-x-0', 'opacity-100', 'visible', 'pointer-events-auto'];

        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                // Add transitions dynamically to prevent FOUC animation on page load
                if (!mobileMenu.classList.contains('transition-all')) {
                    mobileMenu.classList.add('transition-all', 'duration-300', 'ease-in-out');
                    // Force a reflow so the transition is applied before changing state
                    void mobileMenu.offsetWidth;
                }

                const isOpen = mobileMenu.classList.contains('translate-x-0');
                if (isOpen) {
                    mobileMenu.classList.remove(...openClasses);
                    mobileMenu.classList.add(...closedClasses);
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                } else {
                    mobileMenu.classList.remove(...closedClasses);
                    mobileMenu.classList.add(...openClasses);
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                }
            });
        }

        mobileLinks.forEach(link => link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Start the closing animation
            mobileMenu.classList.remove(...openClasses);
            mobileMenu.classList.add(...closedClasses);
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');

            // If it's just an anchor to the same page, don't interrupt default scroll behavior
            if (href.startsWith('#') || (href.includes('.html#') && window.location.pathname.includes(href.split('#')[0]))) {
                return;
            }

            // Prevent immediate navigation to let animation finish smoothly
            e.preventDefault();
            setTimeout(() => {
                window.location.href = href;
            }, 300); // 300ms matches the transition-all duration
        }));

        // Highlight active link based on current path
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        this.querySelectorAll('.nav-link, .mobile-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.remove('text-ink-2');
                if (link.classList.contains('nav-link')) {
                    link.classList.add('text-primary');
                    link.classList.add('border-b', 'border-primary', 'pb-0.5');
                } else {
                    link.classList.add('text-primary');
                }
            }
        });

        // Initialize scroll listener for navbar
        const navbar = this.querySelector('#navbar');
        if (navbar) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 20) {
                    navbar.classList.add('bg-background/98', 'h-16');
                    navbar.classList.remove('bg-background/95', 'h-20');
                } else {
                    navbar.classList.remove('bg-background/98', 'h-16');
                    navbar.classList.add('bg-background/95', 'h-20');
                }
            });
            // trigger once on load
            window.dispatchEvent(new Event('scroll'));
        }
    }
}

class GlobalFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="bg-surface border-t border-border py-20 relative z-10">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                    <div class="max-w-xs">
                        <a href="index.html" class="block text-2xl font-serif font-semibold tracking-tighter text-ink mb-6">Sauzi<span
                                class="text-primary">.ai</span></a>
                        <p class="text-ink-3 text-sm leading-relaxed">Implementing the data infrastructure that makes AI agents work — so your team gets answers in seconds, not requests in a ticket queue.</p>
                    </div>
                    <div class="flex gap-12">
                        <div>
                            <h4 class="text-ink font-bold mb-4">Links</h4>
                            <ul class="space-y-2 text-sm text-ink-3">
                                <li><a href="index.html" class="hover:text-primary transition-colors">Home</a></li>
                                <li><a href="how-it-works.html" class="hover:text-primary transition-colors">How It Works</a></li>
                                <li><a href="playbooks.html" class="hover:text-primary transition-colors">Playbooks</a></li>
                                <li><a href="why-sauzi.html" class="hover:text-primary transition-colors">Why Sauzi</a></li>
                                <li><a href="blog.html" class="hover:text-primary transition-colors">Blog</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-6">
                    <p class="text-ink-3 text-xs tracking-wide">
                        &copy; 2026 Sauzi.ai
                    </p>
                    <div class="flex gap-6 grayscale opacity-50">
                        <!-- Placeholder Socials -->
                        <div class="w-5 h-5 bg-border rounded-sm"></div>
                        <div class="w-5 h-5 bg-border rounded-sm"></div>
                        <div class="w-5 h-5 bg-border rounded-sm"></div>
                    </div>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('app-header', GlobalNav);
customElements.define('app-footer', GlobalFooter);
