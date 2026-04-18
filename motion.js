// Motion layer — GSAP timelines, cursor, magnetic, 3D tilt, scroll
(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;

    const hasGSAP = typeof gsap !== 'undefined';
    if (hasGSAP && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ---------- Loader ----------
    const loader = document.getElementById('loader');
    const loaderCount = document.getElementById('loaderCount');
    const loaderBar = document.getElementById('loaderBar');
    document.documentElement.style.overflow = 'hidden';

    const loaderPromise = new Promise(resolve => {
        if (reduce) { resolve(); return; }
        let n = 0;
        const step = () => {
            n += Math.max(1, Math.floor((100 - n) * 0.06) + (Math.random() * 3));
            if (n >= 100) n = 100;
            loaderCount.textContent = String(n).padStart(2, '0');
            loaderBar.style.width = n + '%';
            if (n < 100) requestAnimationFrame(step);
            else setTimeout(resolve, 250);
        };
        requestAnimationFrame(step);
    });

    // ---------- Cursor ----------
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

    if (fine && !isTouch) {
        addEventListener('pointermove', (e) => {
            mx = e.clientX; my = e.clientY;
            cursorDot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        });
        (function loop() {
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;
            cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();
    }

    function bindHovers() {
        if (!fine || isTouch) return;
        document.querySelectorAll('[data-hover], a, button, input, textarea, .product-card, .experiment-card, .exp-item, .bento-card')
            .forEach(el => {
                el.addEventListener('pointerenter', () => cursor.classList.add('is-hover'));
                el.addEventListener('pointerleave', () => cursor.classList.remove('is-hover'));
            });
    }

    // ---------- Magnetic ----------
    function bindMagnetic() {
        if (reduce || isTouch) return;
        document.querySelectorAll('[data-magnetic]').forEach(el => {
            const strength = 0.3;
            el.addEventListener('pointermove', (e) => {
                const r = el.getBoundingClientRect();
                const x = e.clientX - (r.left + r.width / 2);
                const y = e.clientY - (r.top + r.height / 2);
                gsap?.to(el, { x: x * strength, y: y * strength, duration: 0.4, ease: 'power3.out' })
                    || (el.style.transform = `translate(${x * strength}px, ${y * strength}px)`);
            });
            el.addEventListener('pointerleave', () => {
                gsap?.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
                    || (el.style.transform = '');
            });
        });
    }

    // ---------- Spotlight on cards ----------
    function bindSpotlight() {
        document.querySelectorAll('.product-card, .experiment-card').forEach(card => {
            card.addEventListener('pointermove', (e) => {
                const r = card.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                card.style.setProperty('--mx', x + '%');
                card.style.setProperty('--my', y + '%');
            });
        });
    }

    // ---------- 3D tilt on product cards ----------
    function bindTilt() {
        if (reduce || isTouch) return;
        document.querySelectorAll('.product-card').forEach(card => {
            const max = 6;
            card.addEventListener('pointermove', (e) => {
                const r = card.getBoundingClientRect();
                const px = (e.clientX - r.left) / r.width - 0.5;
                const py = (e.clientY - r.top) / r.height - 0.5;
                gsap?.to(card, {
                    rotateY: px * max,
                    rotateX: -py * max,
                    y: -6,
                    duration: 0.5,
                    ease: 'power2.out',
                    transformPerspective: 1000,
                });
            });
            card.addEventListener('pointerleave', () => {
                gsap?.to(card, {
                    rotateY: 0, rotateX: 0, y: 0,
                    duration: 0.8, ease: 'power3.out',
                });
            });
        });
    }

    // ---------- Nav ----------
    function bindNav() {
        const nav = document.getElementById('nav');
        addEventListener('scroll', () => {
            const y = scrollY;
            if (y > 80) nav.classList.add('is-visible', 'is-scrolled');
            else {
                nav.classList.remove('is-scrolled');
                if (y < 20) nav.classList.remove('is-visible');
            }
        }, { passive: true });
    }

    // ---------- Hero chars reveal ----------
    function revealHeroChars() {
        const chars = document.querySelectorAll('.hero__name .char');
        if (!chars.length) return;
        if (reduce) {
            chars.forEach(c => c.style.transform = 'translateY(0)');
            return;
        }
        if (hasGSAP) {
            gsap.fromTo(chars,
                { y: '110%' },
                { y: '0%', duration: 1.1, ease: 'expo.out', stagger: 0.03, delay: 0.1 }
            );
        } else {
            chars.forEach((c, i) => {
                c.animate(
                    [{ transform: 'translateY(110%)' }, { transform: 'translateY(0%)' }],
                    { duration: 900, delay: 100 + i * 35, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }
                );
            });
        }
    }

    // ---------- Stat counters ----------
    function countStats() {
        const stats = document.querySelectorAll('.stats__num');
        stats.forEach(el => {
            const target = parseInt(el.dataset.count || '0', 10);
            if (hasGSAP) {
                const obj = { v: 0 };
                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        gsap.to(obj, {
                            v: target,
                            duration: 1.6,
                            ease: 'power2.out',
                            onUpdate: () => { el.textContent = Math.round(obj.v); },
                        });
                    },
                });
            } else {
                el.textContent = target;
            }
        });
    }

    // ---------- Scroll-linked reveals ----------
    function bindScrollAnims() {
        if (!hasGSAP) {
            // fallback: IntersectionObserver
            const io = new IntersectionObserver(entries => {
                entries.forEach(en => {
                    if (en.isIntersecting) {
                        en.target.classList.add('is-in');
                        io.unobserve(en.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
            document.querySelectorAll('[data-reveal], .section').forEach(el => io.observe(el));
            return;
        }

        // Generic reveal
        document.querySelectorAll('[data-reveal]').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                }
            );
        });

        // Section heads
        document.querySelectorAll('.section__head').forEach(el => {
            gsap.fromTo(el,
                { opacity: 0, x: -30 },
                {
                    opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                }
            );
        });

        // Section titles — word-by-word
        document.querySelectorAll('.section__title, .contact__heading').forEach(title => {
            const words = title.textContent.trim().split(/\s+/);
            title.innerHTML = words.map(w =>
                `<span class="title-word"><span class="title-inner">${w}</span></span>`
            ).join(' ');
            const inners = title.querySelectorAll('.title-inner');
            gsap.fromTo(inners,
                { yPercent: 110 },
                {
                    yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.06,
                    scrollTrigger: { trigger: title, start: 'top 85%', once: true },
                }
            );
        });

        // Services list stagger
        const bentoCards = document.querySelectorAll('.bento-card');
        if (bentoCards.length) {
            gsap.fromTo(bentoCards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
                    scrollTrigger: { trigger: '.services__bento', start: 'top 82%', once: true },
                }
            );
        }

        // Product cards reveal
        const productCards = document.querySelectorAll('.product-card');
        if (productCards.length) {
            gsap.fromTo(productCards,
                { opacity: 0, y: 60, scale: 0.98 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out', stagger: 0.1,
                    scrollTrigger: { trigger: '.building__grid', start: 'top 82%', once: true },
                }
            );
        }

        // Skill items line draw
        document.querySelectorAll('.skill-category').forEach(cat => {
            const items = cat.querySelectorAll('li');
            gsap.fromTo(items,
                { opacity: 0, x: -20 },
                {
                    opacity: 1, x: 0, duration: 0.6, ease: 'power2.out', stagger: 0.05,
                    scrollTrigger: { trigger: cat, start: 'top 85%', once: true },
                }
            );
        });

        // Experience rows
        gsap.utils.toArray('.exp-item').forEach(item => {
            gsap.fromTo(item,
                { opacity: 0, y: 40 },
                {
                    opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: item, start: 'top 90%', once: true },
                }
            );
        });

        // Experiments
        const expGrid = document.querySelectorAll('.experiment-card');
        if (expGrid.length) {
            gsap.fromTo(expGrid,
                { opacity: 0, y: 40, scale: 0.97 },
                {
                    opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08,
                    scrollTrigger: { trigger: '.experiments__grid', start: 'top 85%', once: true },
                }
            );
        }

        // Marquee velocity skew
        const track = document.getElementById('marqueeTrack');
        if (track) {
            ScrollTrigger.create({
                onUpdate: (self) => {
                    const v = self.getVelocity();
                    gsap.to(track, {
                        skewX: Math.max(-10, Math.min(10, v * -0.006)),
                        duration: 0.5, ease: 'power2.out',
                    });
                },
            });
        }

        // Outro horizontal scroll
        const outroEl = document.getElementById('outroText');
        if (outroEl) {
            gsap.fromTo(outroEl,
                { xPercent: 8 },
                {
                    xPercent: -15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '.outro',
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                }
            );
        }

        // Nav progress ring (via accent dot scale on scroll)
        gsap.to('.nav__logo-dot', {
            scale: 1.6,
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.6,
            },
        });

        // Hero exit fade
        const hero = document.getElementById('hero');
        if (hero) {
            gsap.to(hero, {
                opacity: 0.25,
                scale: 0.98,
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }
    }

    // ---------- Writing carousel progress (native scroll) ----------
    function bindWritingProgress() {
        const rail = document.getElementById('writingRail');
        const fill = document.getElementById('writingProgressFill');
        if (!rail || !fill) return;
        const update = () => {
            const max = rail.scrollWidth - rail.clientWidth;
            const p = max > 0 ? (rail.scrollLeft / max) * 100 : 0;
            fill.style.width = p.toFixed(1) + '%';
        };
        rail.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        update();
    }

    // ---------- Boot ----------
    let booted = false;
    function onReady() {
        if (booted) return;
        booted = true;
        bindHovers();
        bindMagnetic();
        bindSpotlight();
        bindTilt();
        bindNav();
        bindScrollAnims();
        bindWritingProgress();
        countStats();

        loaderPromise.then(() => {
            loader.classList.add('is-done');
            document.documentElement.style.overflow = '';
            setTimeout(() => {
                revealHeroChars();
                document.getElementById('nav').classList.add('is-visible');
                // Refresh ScrollTrigger after loader removal
                if (hasGSAP && typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
            }, 350);
            setTimeout(() => loader.remove(), 1400);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            document.addEventListener('portfolio:ready', onReady, { once: true });
            setTimeout(onReady, 3000);
        });
    } else {
        document.addEventListener('portfolio:ready', onReady, { once: true });
        setTimeout(onReady, 3000);
    }
})();
