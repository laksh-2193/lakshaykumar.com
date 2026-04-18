// Soft spotlight that follows cursor — CSS variable driven, no WebGL
(function () {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduce || !fine) return;

    const root = document.documentElement;
    const spot = document.querySelector('.spotlight');
    let tx = innerWidth / 2, ty = innerHeight / 2;
    let cx = tx, cy = ty;
    let activated = false;

    window.addEventListener('pointermove', (e) => {
        tx = e.clientX;
        ty = e.clientY;
        if (!activated) {
            activated = true;
            cx = tx; cy = ty;
            spot?.classList.add('is-active');
        }
    });

    function tick() {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        root.style.setProperty('--spot-x', cx + 'px');
        root.style.setProperty('--spot-y', cy + 'px');
        requestAnimationFrame(tick);
    }
    tick();
})();
