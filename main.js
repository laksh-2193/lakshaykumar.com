// Data hydration
(async function () {
    try {
        const res = await fetch('info.json');
        const { portfolio } = await res.json();
        window.__portfolio = portfolio;

        hydrateMeta(portfolio);
        hydrateHero(portfolio);
        hydrateMarquee(portfolio);
        hydrateBuilding(portfolio);
        hydrateAbout(portfolio);
        hydrateServices(portfolio);
        hydrateSkills(portfolio);
        hydrateExperience(portfolio);
        hydrateExperiments(portfolio);
        hydrateWriting(portfolio);
        hydrateFaqs(portfolio);
        hydrateContact(portfolio);
        hydrateOutro(portfolio);
        hydrateFooter(portfolio);
        initForm();

        document.dispatchEvent(new CustomEvent('portfolio:ready'));
    } catch (e) {
        console.error('[portfolio] load failed', e);
    }
})();

function hydrateMeta(p) {
    document.title = p.title || 'Portfolio';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = p.about?.identity || 'Portfolio';
}

function hydrateHero(p) {
    const alias = document.getElementById('heroAlias');
    if (alias && p.aliases?.[0]) alias.textContent = p.aliases[0];

    const bio = document.querySelector('.hero__bio');
    if (bio) {
        const line = p.about?.identity || 'Building thoughtful AI systems and products that matter.';
        bio.innerHTML = boldKeywords(line);
    }

    const sub = document.querySelector('.hero__sub');
    if (sub && p.cta?.secondary) sub.textContent = p.cta.secondary;
}

function boldKeywords(text) {
    // Bold the first strong noun phrase of the sentence
    return text.replace(/\b(Generative AI engineer|AI engineer|founder|products|systems|thoughtful|creative)\b/gi,
        '<strong>$1</strong>');
}

function hydrateMarquee(p) {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;
    const items = [
        'Generative AI',
        'Product Thinking',
        'Full-stack Engineering',
        'LLM Integration',
        'Automation',
        'Startup Execution',
        'Prototyping',
    ];
    const set = items.concat(items);
    track.innerHTML = set.map((t, i) =>
        `<span class="marquee__item ${i % 2 === 1 ? 'is-ghost' : ''}">${t}</span>`
    ).join('');
}

function hydrateBuilding(p) {
    const grid = document.getElementById('buildingGrid');
    if (!grid) return;
    const highlights = Array.isArray(p.intro?.highlight)
        ? p.intro.highlight
        : (p.intro?.highlight ? [p.intro.highlight] : []);

    if (!highlights.length) {
        grid.parentElement?.style.setProperty('display', 'none');
        return;
    }

    grid.innerHTML = highlights.map((h, i) => {
        const title = h.title || h.product || '';
        const desc = h.description || '';
        const url = h.url || '';
        const cleanUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');
        const letter = (title[0] || '•').toUpperCase();
        const tag = h.tag || (i === 0 ? 'Currently shipping' : 'Live');
        return `
            <a class="product-card" href="${url}" target="_blank" rel="noopener" data-hover data-tilt>
                <div class="product-card__head">
                    <span class="product-card__badge">${tag}</span>
                    <span class="product-card__arrow">
                        <svg viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    </span>
                </div>
                <div class="product-card__visual" data-letter="${letter}"></div>
                <div class="product-card__body">
                    <h3 class="product-card__title">${title}</h3>
                    <p class="product-card__desc">${desc}</p>
                    ${cleanUrl ? `<span class="product-card__url">${cleanUrl}</span>` : ''}
                </div>
            </a>
        `;
    }).join('');
}

function hydrateAbout(p) {
    const title = document.querySelector('.about__title');
    if (title) title.textContent = (p.about?.section_title || 'Who am I?').replace(/\s+\?$/, '?');

    const content = document.querySelector('.about__content');
    if (content && p.about?.summary) {
        content.innerHTML = p.about.summary.map((t, i) =>
            `<p data-reveal>${i === 0 ? boldFirstSentence(t) : t}</p>`
        ).join('');
    }

    const identity = document.querySelector('.about__identity');
    if (identity) identity.textContent = p.about?.identity || '';

    const skillsWrap = document.querySelector('.about__skills');
    if (skillsWrap && p.skill_set) {
        skillsWrap.innerHTML = p.skill_set.map(s =>
            `<span class="skill-tag">${s}</span>`
        ).join('');
    }
}

function boldFirstSentence(text) {
    const m = text.match(/^(.+?[.!?])\s+(.*)$/);
    if (m) return `<strong>${m[1]}</strong> ${m[2]}`;
    return `<strong>${text}</strong>`;
}

function hydrateServices(p) {
    const title = document.querySelector('.services__title');
    if (title) title.textContent = p.services?.section_title || 'How can I help?';

    const list = document.getElementById('servicesBento');
    if (!list || !p.services?.offerings) return;
    list.innerHTML = p.services.offerings.map((s, i) => {
        const n = String(i + 1).padStart(2, '0');
        const tag = i === 0 ? 'Flagship' : (i === p.services.offerings.length - 1 ? 'Startup' : 'Core');
        return `
            <article class="bento-card ${i === 0 ? 'is-feature' : ''}" data-reveal>
                <span class="bento-card__num">${n}</span>
                <div class="bento-card__body">
                    <h3 class="bento-card__title">${s.title}</h3>
                    <p class="bento-card__desc">${s.description}</p>
                </div>
                <span class="bento-card__tag">${tag}</span>
            </article>
        `;
    }).join('');
}

function hydrateSkills(p) {
    const grid = document.getElementById('skillsGrid');
    if (!grid || !p.skills) return;
    const cats = [
        { key: 'automation', title: 'Automation & AI' },
        { key: 'technical_skills', title: 'Technical' },
        { key: 'entrepreneurship', title: 'Entrepreneurship' },
        { key: 'social_skills', title: 'Leadership' },
    ];
    grid.innerHTML = cats
        .filter(c => p.skills[c.key]?.length)
        .map(c => `
            <div class="skill-category" data-reveal>
                <h3>${c.title}</h3>
                <ul>${p.skills[c.key].map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
        `).join('');
}

function hydrateExperience(p) {
    const list = document.getElementById('experienceList');
    if (!list || !p.experience) return;
    list.innerHTML = p.experience.map(e => {
        const start = fmtDate(e.start_date);
        const end = e.end_date ? fmtDate(e.end_date) : 'Present';
        return `
            <article class="exp-item" data-reveal>
                <h3 class="exp-item__company">${e.company}</h3>
                <p class="exp-item__role">${e.role}</p>
                <span class="exp-item__meta">${e.employment_type}</span>
                <span class="exp-item__date">${start} — ${end}</span>
            </article>
        `;
    }).join('');
}

function hydrateExperiments(p) {
    const title = document.querySelector('.experiments__title');
    if (title) title.textContent = p.experiments?.section_title || 'Experiments';

    const grid = document.getElementById('experimentsGrid');
    if (!grid || !p.experiments?.projects) return;
    grid.innerHTML = p.experiments.projects.map((proj, i) => `
        <article class="experiment-card" data-reveal>
            <div class="experiment-card__top">
                <span>${String(i + 1).padStart(2, '0')} · Project</span>
                <span class="experiment-card__dot"></span>
            </div>
            <h3>${proj.name}</h3>
            <p>${proj.lesson || proj.description || ''}</p>
        </article>
    `).join('');
}

function hydrateWriting(p) {
    const grid = document.getElementById('writingGrid');
    if (!grid) return;
    const urls = p['linkedin-embeds'] || p.linkedin_embeds || [];
    if (!urls.length) {
        grid.closest('section')?.remove();
        return;
    }
    grid.innerHTML = urls.map((url, i) => {
        const idMatch = url.match(/urn:li:ugcPost:(\d+)/i);
        const postId = idMatch ? idMatch[1] : '';
        const viewUrl = postId
            ? `https://www.linkedin.com/feed/update/urn:li:ugcPost:${postId}/`
            : 'https://www.linkedin.com/in/lakshaykumar-tech/';
        const num = String(i + 1).padStart(2, '0');
        // Use URL as-is — LinkedIn's collapsed=1 is actually the rich preview (media + reactions).
        const embedUrl = url;
        return `
        <article class="writing-card" style="--i:${i}">
            <header class="writing-card__head">
                <span class="writing-card__brand">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.22 0z"/></svg>
                    <span>LinkedIn</span>
                </span>
                <span class="writing-card__num">Post ${num}</span>
                <a class="writing-card__open" href="${viewUrl}" target="_blank" rel="noopener" data-hover aria-label="Open post ${num} on LinkedIn">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H5M12 4V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </a>
            </header>
            <div class="writing-card__embed">
                <iframe
                    src="${embedUrl}"
                    loading="lazy"
                    title="LinkedIn post ${num} by Lakshay Kumar"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen></iframe>
            </div>
            <a class="writing-card__foot" href="${viewUrl}" target="_blank" rel="noopener" data-hover>
                <span>Read full post</span>
                <span class="writing-card__foot-arrow">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </span>
            </a>
        </article>
    `;
    }).join('');
}

function hydrateFaqs(p) {
    const list = document.getElementById('faqList');
    if (!list || !p.faqs?.length) {
        list?.closest('section')?.remove();
        return;
    }
    list.innerHTML = p.faqs.map((f, i) => `
        <details class="faq-item" data-reveal ${i === 0 ? 'open' : ''}>
            <summary class="faq-item__q">
                <span class="faq-item__num">${String(i + 1).padStart(2, '0')}</span>
                <span class="faq-item__text">${f.q}</span>
                <span class="faq-item__toggle" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                </span>
            </summary>
            <p class="faq-item__a">${f.a}</p>
        </details>
    `).join('');

    // Inject FAQPage JSON-LD dynamically (good for AI citations even if restricted for rich results)
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': p.faqs.map(f => ({
            '@type': 'Question',
            'name': f.q,
            'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
        })),
    });
    document.head.appendChild(ld);
}

function hydrateContact(p) {
    const heading = document.querySelector('.contact__heading');
    if (heading) heading.textContent = p.cta?.link_text || "Let's build something.";

    const emails = document.getElementById('contactEmails');
    if (emails && p.contact?.email) {
        emails.innerHTML = p.contact.email
            .map(e => `<a href="mailto:${e}" data-hover>${e}</a>`)
            .join('');
    }

    const socials = document.getElementById('contactSocials');
    if (socials && p.contact?.socials) {
        const s = p.contact.socials;
        const items = [];
        if (s.linkedin) items.push(`<a href="${s.linkedin}" target="_blank" rel="noopener" data-hover>LinkedIn ↗</a>`);
        socials.innerHTML = items.join('');
    }
}

function hydrateOutro(p) {
    const el = document.getElementById('outroText');
    if (el) el.textContent = (p.name || 'Lakshay Kumar').toUpperCase();
    const year = document.getElementById('outroYear');
    if (year) year.textContent = String(new Date().getFullYear());
}

function hydrateFooter(p) {
    const year = new Date().getFullYear();
    const text = document.querySelector('.footer__text');
    if (text) text.textContent = `© ${year} ${p.name} · Built in Bangalore`;

    const socials = document.getElementById('footerSocials');
    if (socials && p.contact) {
        const items = [];
        if (p.contact.email?.[0]) items.push(`<a href="mailto:${p.contact.email[0]}" data-hover>Email</a>`);
        if (p.contact.socials?.linkedin) items.push(`<a href="${p.contact.socials.linkedin}" target="_blank" rel="noopener" data-hover>LinkedIn</a>`);
        if (p.aliases?.[0]) items.push(`<span class="footer__alias">${p.aliases[0]}</span>`);
        socials.innerHTML = items.join('');
    }

    const bigcta = document.querySelector('.footer__bigcta');
    if (bigcta && p.contact?.email?.[0]) {
        bigcta.textContent = p.contact.email[0];
        bigcta.href = 'mailto:' + p.contact.email[0];
    }
}

function fmtDate(s) {
    if (!s) return '';
    const d = new Date(s);
    const m = d.toLocaleDateString('en-US', { month: 'short' });
    return `${m} ${d.getFullYear()}`;
}

function initForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const btn = form?.querySelector('.form-submit');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (btn) {
            btn.disabled = true;
            const textEl = btn.querySelector('.btn__text');
            if (textEl) textEl.innerHTML = '<span>Sending…</span><span>Sending…</span>';
        }
        if (status) {
            status.classList.remove('visible', 'success', 'error');
            status.textContent = '';
        }

        const data = new FormData(form);
        try {
            const r = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' },
            });
            const json = await r.json().catch(() => ({}));
            if (r.ok && json.success !== false) {
                status.textContent = 'Sent ✓  Response within 24 hours.';
                status.classList.add('visible', 'success');
                form.reset();
                if (window.hcaptcha?.reset) try { window.hcaptcha.reset(); } catch (_) {}
            } else {
                throw new Error(json.message || 'submission_failed');
            }
        } catch (err) {
            const msg = (err && err.message) || '';
            status.textContent = /captcha/i.test(msg)
                ? 'Please complete the captcha and try again.'
                : 'Failed — email me directly instead.';
            status.classList.add('visible', 'error');
        } finally {
            if (btn) {
                btn.disabled = false;
                const textEl = btn.querySelector('.btn__text');
                if (textEl) textEl.innerHTML = '<span>Send message</span><span>Send message</span>';
            }
        }
    });
}
