// Main script for loading and rendering portfolio content
(async function() {
    try {
        // Fetch portfolio data
        const response = await fetch('info.json');
        const data = await response.json();
        const portfolio = data.portfolio;

        // Update document meta
        updateMeta(portfolio);

        // Populate sections
        populateHero(portfolio);
        populateAbout(portfolio);
        populateServices(portfolio);
        populateSkills(portfolio);
        populateExperience(portfolio);
        populateExperiments(portfolio);
        populateContact(portfolio);
        populateFooter(portfolio);

        // Initialize scroll animations
        initScrollAnimations();

        // Initialize scroll-based color transitions
        initColorTransitions();

    } catch (error) {
        console.error('Failed to load portfolio data:', error);
    }
})();

// Update page meta information
function updateMeta(portfolio) {
    document.title = portfolio.title || 'Portfolio';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = portfolio.about?.summary?.[0] || 'Portfolio';
    }
}

// Populate Hero Section
function populateHero(portfolio) {
    const heroName = document.querySelector('.hero__name');
    const heroTagline = document.querySelector('.hero__tagline');
    const heroHighlight = document.querySelector('.hero__highlight');
    const heroCta = document.querySelector('.hero__cta');

    // Name
    if (heroName) {
        heroName.textContent = portfolio.name || '';
    }

    // Tagline - use identity or first alias
    if (heroTagline) {
        const tagline = portfolio.about?.identity ||
                       (portfolio.aliases?.[0] ? `Also known as ${portfolio.aliases[0]}` : '');
        heroTagline.textContent = tagline;
    }

    // Highlight section for DocIQ or featured project
    if (heroHighlight && portfolio.intro?.highlight) {
        const highlight = portfolio.intro.highlight;
        heroHighlight.innerHTML = `
            <h3>${highlight.product || ''}</h3>
            <p>${highlight.description || ''}</p>
            ${highlight.url ? `<a href="${highlight.url}" target="_blank" rel="noopener">${highlight.url}</a>` : ''}
        `;
    }

    // CTA buttons
    if (heroCta && portfolio.cta) {
        heroCta.innerHTML = `
            <a href="#contact" class="cta-primary">${portfolio.cta.primary || 'Get in touch'}</a>
            ${portfolio.cta.secondary ? `<p class="cta-secondary">${portfolio.cta.secondary}</p>` : ''}
        `;
    }
}

// Populate About Section
function populateAbout(portfolio) {
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutContent = document.querySelector('.about__content');
    const aboutIdentity = document.querySelector('.about__identity');

    if (aboutTitle && portfolio.about?.section_title) {
        aboutTitle.textContent = portfolio.about.section_title;
    }

    if (aboutContent && portfolio.about?.summary) {
        aboutContent.innerHTML = portfolio.about.summary
            .map(text => `<p>${text}</p>`)
            .join('');
    }

    if (aboutIdentity && portfolio.about?.identity) {
        aboutIdentity.textContent = portfolio.about.identity;
    }

    // Add skill set if available
    if (portfolio.skill_set && portfolio.skill_set.length > 0) {
        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'about__skills';
        skillsContainer.innerHTML = portfolio.skill_set
            .map(skill => `<span class="skill-tag">${skill}</span>`)
            .join('');
        aboutContent.after(skillsContainer);
    }
}

// Populate Services Section
function populateServices(portfolio) {
    const servicesTitle = document.querySelector('#services .section-title');
    const servicesGrid = document.querySelector('.services__grid');

    if (servicesTitle && portfolio.services?.section_title) {
        servicesTitle.textContent = portfolio.services.section_title;
    }

    if (servicesGrid && portfolio.services?.offerings) {
        servicesGrid.innerHTML = portfolio.services.offerings
            .map(service => `
                <div class="service-card">
                    <h3>${service.title}</h3>
                    <p>${service.description}</p>
                </div>
            `)
            .join('');
    }
}

// Populate Skills Section
function populateSkills(portfolio) {
    const skillsGrid = document.querySelector('.skills__grid');

    if (skillsGrid && portfolio.skills) {
        const skillCategories = [
            { key: 'automation', title: 'Automation & AI' },
            { key: 'technical_skills', title: 'Technical Skills' },
            { key: 'entrepreneurship', title: 'Entrepreneurship' },
            { key: 'social_skills', title: 'Leadership & Communication' }
        ];

        skillsGrid.innerHTML = skillCategories
            .filter(cat => portfolio.skills[cat.key] && portfolio.skills[cat.key].length > 0)
            .map(cat => `
                <div class="skill-category">
                    <h3>${cat.title}</h3>
                    <ul>
                        ${portfolio.skills[cat.key].map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            `)
            .join('');
    }
}

// Populate Experience Section
function populateExperience(portfolio) {
    const experienceTimeline = document.querySelector('.experience__timeline');

    if (experienceTimeline && portfolio.experience) {
        experienceTimeline.innerHTML = portfolio.experience
            .map(exp => {
                const startDate = formatDate(exp.start_date);
                const endDate = exp.end_date ? formatDate(exp.end_date) : 'Present';
                const duration = `${startDate} — ${endDate}`;

                return `
                    <div class="experience-item">
                        <h3>${exp.company}</h3>
                        <p class="role">${exp.role}</p>
                        <p class="meta">${exp.employment_type} · ${duration}</p>
                    </div>
                `;
            })
            .join('');
    }
}

// Populate Experiments Section
function populateExperiments(portfolio) {
    const experimentsTitle = document.querySelector('#experiments .section-title');
    const experimentsGrid = document.querySelector('.experiments__grid');

    if (experimentsTitle && portfolio.experiments?.section_title) {
        experimentsTitle.textContent = portfolio.experiments.section_title;
    }

    if (experimentsGrid && portfolio.experiments?.projects) {
        experimentsGrid.innerHTML = portfolio.experiments.projects
            .map(project => `
                <div class="experiment-card">
                    <h3>${project.name}</h3>
                    ${project.lesson ? `<p>${project.lesson}</p>` : ''}
                    ${project.description && !project.lesson ? `<p>${project.description}</p>` : ''}
                </div>
            `)
            .join('');
    }
}

// Populate Contact Section
function populateContact(portfolio) {
    const contactHeading = document.querySelector('.contact__heading');
    const contactEmail = document.querySelector('.contact__email');
    const contactLinks = document.querySelector('.contact__links');

    // For now, use a default heading since it's not in the JSON
    if (contactHeading) {
        contactHeading.textContent = "Let's Connect";
    }

    // Email - extract from cta link or use a placeholder
    if (contactEmail) {
        // We'll use the CTA primary text for now
        const emailText = portfolio.cta?.link_text || 'Get in touch';
        contactEmail.textContent = emailText;
        contactEmail.href = '#contact';
    }

    // Social links - we don't have these in the current JSON structure
    // So we'll leave this empty for now or add placeholders
    if (contactLinks) {
        contactLinks.innerHTML = `
            <a href="https://linkedin.com/in/lakshaykumar-tech" target="_blank" rel="noopener">LinkedIn</a>
        `;
    }
}

// Populate Footer
function populateFooter(portfolio) {
    const footerText = document.querySelector('.footer__text');

    if (footerText) {
        const year = new Date().getFullYear();
        footerText.textContent = `© ${year} ${portfolio.name}`;
    }
}

// Format date helper
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${month} ${year}`;
}

// Initialize scroll animations
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        }
    );

    // Observe all sections except hero
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach(section => observer.observe(section));
}

// Initialize color transitions based on scroll - INSTANT switches, no grey
function initColorTransitions() {
    const root = document.documentElement;
    let currentTheme = 'dark';
    let ticking = false;

    // Define threshold points where colors instantly switch
    const thresholds = [
        { scrollPercent: 0.15, theme: 'light' },     // Switch to white at 15%
        { scrollPercent: 0.40, theme: 'dark' },      // Switch to black at 40%
        { scrollPercent: 0.65, theme: 'light' },     // Switch to white at 65%
        { scrollPercent: 0.90, theme: 'dark' }       // Switch to black at 90%
    ];

    function updateColors() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

        // Determine which theme we should be in
        let targetTheme = 'dark'; // Start with dark

        for (const threshold of thresholds) {
            if (scrollProgress >= threshold.scrollPercent) {
                targetTheme = threshold.theme;
            }
        }

        // Only update if theme changed (instant switch, no interpolation)
        if (targetTheme !== currentTheme) {
            currentTheme = targetTheme;

            if (currentTheme === 'dark') {
                root.style.setProperty('--color-bg', '#000000');
                root.style.setProperty('--color-fg', '#ffffff');
            } else {
                root.style.setProperty('--color-bg', '#ffffff');
                root.style.setProperty('--color-fg', '#000000');
            }
        }

        ticking = false;
    }

    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateColors);
            ticking = true;
        }
    }, { passive: true });

    // Initial color update
    updateColors();
}
