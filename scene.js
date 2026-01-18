// Three.js geometric shapes - optimized for performance
(function() {
    const canvas = document.getElementById('scene');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false, // Disable for better performance
        powerPreference: "low-power"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Limit for performance

    // Camera position
    camera.position.z = 15;

    // Create geometric shapes
    const shapes = [];
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });

    // Torus (donut shape) - Hero section
    const torusGeometry = new THREE.TorusGeometry(3, 1, 16, 50);
    const torus = new THREE.Mesh(torusGeometry, material);
    torus.position.set(8, 0, -5);
    scene.add(torus);
    shapes.push({ mesh: torus, rotSpeed: { x: 0.001, y: 0.002, z: 0 } });

    // Icosahedron (20-sided) - About section
    const icoGeometry = new THREE.IcosahedronGeometry(2.5, 0);
    const icosahedron = new THREE.Mesh(icoGeometry, material);
    icosahedron.position.set(-7, -8, -3);
    scene.add(icosahedron);
    shapes.push({ mesh: icosahedron, rotSpeed: { x: 0.002, y: 0.001, z: 0.001 } });

    // Octahedron - Services section
    const octaGeometry = new THREE.OctahedronGeometry(2, 0);
    const octahedron = new THREE.Mesh(octaGeometry, material);
    octahedron.position.set(6, -18, -4);
    scene.add(octahedron);
    shapes.push({ mesh: octahedron, rotSpeed: { x: 0.003, y: 0.001, z: 0.002 } });

    // Box (cube) - Skills section
    const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    const box = new THREE.Mesh(boxGeometry, material);
    box.position.set(-8, -30, -3);
    scene.add(box);
    shapes.push({ mesh: box, rotSpeed: { x: 0.001, y: 0.003, z: 0.001 } });

    // Tetrahedron - Experience section
    const tetraGeometry = new THREE.TetrahedronGeometry(2.5, 0);
    const tetrahedron = new THREE.Mesh(tetraGeometry, material);
    tetrahedron.position.set(7, -42, -4);
    scene.add(tetrahedron);
    shapes.push({ mesh: tetrahedron, rotSpeed: { x: 0.002, y: 0.002, z: 0.001 } });

    // Torus Knot - Contact section
    const torusKnotGeometry = new THREE.TorusKnotGeometry(2, 0.6, 50, 10);
    const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
    torusKnot.position.set(-6, -55, -5);
    scene.add(torusKnot);
    shapes.push({ mesh: torusKnot, rotSpeed: { x: 0.001, y: 0.001, z: 0.002 } });

    // Scroll control and color management
    let scrollY = 0;
    let currentTheme = 'dark';

    function updateShapeColors() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);

        // Match the color thresholds from main.js
        let targetTheme = 'dark';
        if (scrollProgress >= 0.15 && scrollProgress < 0.40) targetTheme = 'light';
        else if (scrollProgress >= 0.40 && scrollProgress < 0.65) targetTheme = 'dark';
        else if (scrollProgress >= 0.65 && scrollProgress < 0.90) targetTheme = 'light';
        else if (scrollProgress >= 0.90) targetTheme = 'dark';

        // Update material color to contrast with background
        if (targetTheme !== currentTheme) {
            currentTheme = targetTheme;
            material.color.setHex(currentTheme === 'dark' ? 0xffffff : 0x000000);
        }
    }

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
        updateShapeColors();
    }, { passive: true });

    // Mouse parallax - simplified
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 0.5;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 0.5;
    }, { passive: true });

    // Animation loop - optimized
    function animate() {
        requestAnimationFrame(animate);

        // Rotate all shapes at their individual speeds
        shapes.forEach(shape => {
            shape.mesh.rotation.x += shape.rotSpeed.x;
            shape.mesh.rotation.y += shape.rotSpeed.y;
            shape.mesh.rotation.z += shape.rotSpeed.z;
        });

        // Apply scroll parallax to camera
        camera.position.y = scrollY * 0.008;

        // Apply subtle mouse parallax to camera
        camera.position.x = mouseX * 0.5;
        camera.rotation.y = mouseX * 0.05;

        renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        renderer.dispose();
        shapes.forEach(shape => {
            shape.mesh.geometry.dispose();
        });
        material.dispose();
    });
})();
