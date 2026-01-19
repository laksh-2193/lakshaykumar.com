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

        // Initialize contact form
        initContactForm();

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
    const contactLinks = document.querySelector('.contact__links');

    // Use the CTA link text as heading
    if (contactHeading) {
        contactHeading.textContent = portfolio.cta?.link_text || "Let's talk";
    }

    // Add email and social links from contact data
    if (contactLinks && portfolio.contact) {
        const emailLinks = portfolio.contact.email?.map(email =>
            `<a href="mailto:${email}">${email}</a>`
        ).join('') || '';

        const socialLinks = portfolio.contact.socials?.linkedin ?
            `<a href="${portfolio.contact.socials.linkedin}" target="_blank" rel="noopener">LinkedIn</a>` : '';

        contactLinks.innerHTML = emailLinks + socialLinks;
    }
}

// Initialize Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');
    const submitButton = form?.querySelector('.form-submit');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        // Clear previous status
        if (statusDiv) {
            statusDiv.classList.remove('visible', 'success', 'error');
            statusDiv.textContent = '';
        }

        // Get form data
        const formData = new FormData(form);

        try {
            // Submit to FormSubmit
            const response = await fetch('https://formsubmit.co/connect@lakshaykumar.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                if (statusDiv) {
                    statusDiv.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    statusDiv.classList.add('visible', 'success');
                }
                form.reset();
            } else {
                // Error
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            if (statusDiv) {
                statusDiv.textContent = 'Failed to send message. Please try again or email me directly.';
                statusDiv.classList.add('visible', 'error');
            }
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
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

// Initialize color transitions based on scroll - abrupt switch at midpoint to avoid greying
function initColorTransitions() {
    const root = document.documentElement;
    let ticking = false;
    let currentTheme = 'light';

    // Start with white theme
    root.style.setProperty('--color-bg', '#ffffff');
    root.style.setProperty('--color-fg', '#000000');

    function updateColors() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(window.scrollY / scrollHeight, 0), 1);

        // Abrupt switch at 50% to avoid uncomfortable greying
        // This ensures text is always readable
        const targetTheme = scrollProgress < 0.5 ? 'light' : 'dark';

        if (targetTheme !== currentTheme) {
            currentTheme = targetTheme;

            if (currentTheme === 'light') {
                root.style.setProperty('--color-bg', '#ffffff');
                root.style.setProperty('--color-fg', '#000000');
            } else {
                root.style.setProperty('--color-bg', '#000000');
                root.style.setProperty('--color-fg', '#ffffff');
            }
        }

        ticking = false;
    }

    // Throttle scroll events for better performance
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateColors);
            ticking = true;
        }
    }, { passive: true });

    // Initial color update
    updateColors();
}
