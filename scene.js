// Three.js minimal border decorations - smooth transformations
(function() {
    const canvas = document.getElementById('scene');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "low-power"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Camera position - orthographic-like view
    camera.position.set(0, 0, 20);

    // Create minimal border decorations - corners and sides
    const borderShapes = [];

    // Material for shapes - more visible
    const createMaterial = () => new THREE.LineBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.35,
        linewidth: 1
    });

    // Define corner positions based on viewport
    function getShapePositions() {
        const aspect = window.innerWidth / window.innerHeight;
        const vFOV = camera.fov * Math.PI / 180;
        const height = 2 * Math.tan(vFOV / 2) * camera.position.z;
        const width = height * aspect;

        return {
            topLeft: { x: -width * 0.45, y: height * 0.42 },
            topRight: { x: width * 0.45, y: height * 0.42 },
            bottomLeft: { x: -width * 0.45, y: -height * 0.42 },
            bottomRight: { x: width * 0.45, y: -height * 0.42 }
        };
    }

    // Create thematic shapes related to AI, ML, business, and innovation
    function createThematicShape(shapeType, position) {
        let geometry;
        const size = 2;

        switch(shapeType) {
            case 'neuralNode': // Neural network node
                const nodePoints = [];
                // Central circle
                for (let i = 0; i <= 32; i++) {
                    const angle = (i / 32) * Math.PI * 2;
                    nodePoints.push(new THREE.Vector3(
                        Math.cos(angle) * size * 0.5,
                        Math.sin(angle) * size * 0.5,
                        0
                    ));
                }
                // Add connections to outer nodes
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2;
                    nodePoints.push(new THREE.Vector3(0, 0, 0));
                    nodePoints.push(new THREE.Vector3(
                        Math.cos(angle) * size,
                        Math.sin(angle) * size,
                        0
                    ));
                }
                geometry = new THREE.BufferGeometry().setFromPoints(nodePoints);
                break;

            case 'brain': // Brain-like structure
                const brainPoints = [];
                // Left hemisphere
                for (let i = 0; i <= 16; i++) {
                    const angle = Math.PI + (i / 16) * Math.PI;
                    brainPoints.push(new THREE.Vector3(
                        Math.cos(angle) * size * 0.7 - size * 0.3,
                        Math.sin(angle) * size,
                        0
                    ));
                }
                // Right hemisphere
                for (let i = 0; i <= 16; i++) {
                    const angle = (i / 16) * Math.PI;
                    brainPoints.push(new THREE.Vector3(
                        Math.cos(angle) * size * 0.7 + size * 0.3,
                        Math.sin(angle) * size,
                        0
                    ));
                }
                geometry = new THREE.BufferGeometry().setFromPoints(brainPoints);
                break;

            case 'chart': // Market/growth chart
                const chartPoints = [
                    new THREE.Vector3(-size, -size, 0),
                    new THREE.Vector3(-size * 0.5, -size * 0.3, 0),
                    new THREE.Vector3(0, -size * 0.6, 0),
                    new THREE.Vector3(size * 0.5, size * 0.2, 0),
                    new THREE.Vector3(size, size, 0)
                ];
                geometry = new THREE.BufferGeometry().setFromPoints(chartPoints);
                break;

            case 'lightbulb': // Ideas/innovation/founders
                const bulbPoints = [];
                // Bulb top (circle)
                for (let i = 0; i <= 20; i++) {
                    const angle = Math.PI + (i / 20) * Math.PI;
                    bulbPoints.push(new THREE.Vector3(
                        Math.cos(angle) * size * 0.6,
                        Math.sin(angle) * size * 0.6 + size * 0.4,
                        0
                    ));
                }
                // Base
                bulbPoints.push(new THREE.Vector3(-size * 0.4, -size * 0.2, 0));
                bulbPoints.push(new THREE.Vector3(-size * 0.4, -size * 0.6, 0));
                bulbPoints.push(new THREE.Vector3(size * 0.4, -size * 0.6, 0));
                bulbPoints.push(new THREE.Vector3(size * 0.4, -size * 0.2, 0));
                geometry = new THREE.BufferGeometry().setFromPoints(bulbPoints);
                break;

            case 'network': // Network/connections
                const netPoints = [];
                const nodeCount = 5;
                for (let i = 0; i < nodeCount; i++) {
                    const angle = (i / nodeCount) * Math.PI * 2;
                    const x = Math.cos(angle) * size;
                    const y = Math.sin(angle) * size;
                    // Connect each node to center
                    netPoints.push(new THREE.Vector3(0, 0, 0));
                    netPoints.push(new THREE.Vector3(x, y, 0));
                }
                geometry = new THREE.BufferGeometry().setFromPoints(netPoints);
                break;

            case 'rocket': // GTM/launch/growth
                const rocketPoints = [
                    // Body
                    new THREE.Vector3(0, size, 0),
                    new THREE.Vector3(-size * 0.3, -size * 0.2, 0),
                    new THREE.Vector3(-size * 0.3, -size * 0.8, 0),
                    new THREE.Vector3(size * 0.3, -size * 0.8, 0),
                    new THREE.Vector3(size * 0.3, -size * 0.2, 0),
                    new THREE.Vector3(0, size, 0),
                    // Fins
                    new THREE.Vector3(-size * 0.3, -size * 0.8, 0),
                    new THREE.Vector3(-size * 0.8, -size, 0),
                    new THREE.Vector3(-size * 0.3, -size * 0.8, 0),
                    new THREE.Vector3(size * 0.3, -size * 0.8, 0),
                    new THREE.Vector3(size * 0.8, -size, 0)
                ];
                geometry = new THREE.BufferGeometry().setFromPoints(rocketPoints);
                break;

            case 'grid': // ML/data/structure
                const gridPoints = [];
                for (let i = 0; i <= 3; i++) {
                    const y = -size + (i / 3) * size * 2;
                    gridPoints.push(new THREE.Vector3(-size, y, 0));
                    gridPoints.push(new THREE.Vector3(size, y, 0));
                }
                for (let i = 0; i <= 3; i++) {
                    const x = -size + (i / 3) * size * 2;
                    gridPoints.push(new THREE.Vector3(x, -size, 0));
                    gridPoints.push(new THREE.Vector3(x, size, 0));
                }
                geometry = new THREE.BufferGeometry().setFromPoints(gridPoints);
                break;

            case 'scatter': // Data points/analytics
                const scatterPoints = [];
                const points = [
                    [-0.8, -0.6], [-0.5, 0.3], [0.2, -0.4],
                    [0.6, 0.7], [0.3, 0.1], [-0.2, 0.5],
                    [0.8, -0.2], [-0.6, 0.8]
                ];
                points.forEach(([x, y]) => {
                    // Small circle for each point
                    for (let i = 0; i <= 8; i++) {
                        const angle = (i / 8) * Math.PI * 2;
                        scatterPoints.push(new THREE.Vector3(
                            x * size + Math.cos(angle) * 0.1,
                            y * size + Math.sin(angle) * 0.1,
                            0
                        ));
                    }
                });
                geometry = new THREE.BufferGeometry().setFromPoints(scatterPoints);
                break;
        }

        const line = new THREE.Line(geometry, createMaterial());
        line.position.set(position.x, position.y, 0);
        return { line, geometry };
    }

    // Initialize corner shapes with thematic designs
    const positions = getShapePositions();

    // Different starting shapes for each corner
    const initialShapes = [
        'neuralNode',  // Top left - AI/ML
        'rocket',      // Top right - Growth/GTM
        'brain',       // Bottom left - Intelligence
        'chart'        // Bottom right - Market/Analytics
    ];

    // Create initial shapes (each corner starts with a different shape)
    const posArray = [
        positions.topLeft,
        positions.topRight,
        positions.bottomLeft,
        positions.bottomRight
    ];

    initialShapes.forEach((shapeType, index) => {
        borderShapes.push(createThematicShape(shapeType, posArray[index]));
    });

    borderShapes.forEach(shape => scene.add(shape.line));

    // Get all sections for section-based transformations
    const sections = [
        document.querySelector('#hero'),
        document.querySelector('#about'),
        document.querySelector('#services'),
        document.querySelector('#skills'),
        document.querySelector('#experience'),
        document.querySelector('#experiments'),
        document.querySelector('#contact')
    ].filter(s => s !== null);

    // Section-based transformations with smooth transitions
    let scrollY = 0;
    let currentSection = -1; // Start at -1 to trigger initial transition
    let targetSection = 0;
    let transitionProgress = new Array(borderShapes.length).fill(1); // 1 = fully transitioned
    let currentTheme = 'light';

    // Create dual meshes for smooth cross-fading
    const fadingShapes = [];

    borderShapes.forEach((shape, index) => {
        const fadeMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0
        });

        const fadeLine = new THREE.Line(shape.geometry.clone(), fadeMaterial);
        fadeLine.position.copy(shape.line.position);
        fadeLine.scale.copy(shape.line.scale);

        scene.add(fadeLine);

        fadingShapes.push({
            line: fadeLine,
            material: fadeMaterial,
            geometry: shape.geometry.clone(),
            originalY: shape.line.position.y
        });

        // Store original Y for border shape as well
        shape.originalY = shape.line.position.y;
    });

    // Transform shapes based on current section with smooth cross-fade
    function updateBorderShapes() {
        if (!sections.length) return;

        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(scrollY / scrollHeight, 0), 1);

        // Determine current section
        const windowHeight = window.innerHeight;
        let newSection = 0;
        let minDistance = Infinity;

        for (let i = 0; i < sections.length; i++) {
            const rect = sections[i].getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;
            const distance = Math.abs(sectionCenter - viewportCenter);

            if (distance < minDistance) {
                minDistance = distance;
                newSection = i;
            }
        }

        // Each section has unique shape configuration - thematic designs (4 corners only)
        const sectionShapes = [
            // Hero - AI/Innovation focus
            ['neuralNode', 'rocket', 'brain', 'lightbulb'],
            // About - Personal/Human focus
            ['brain', 'lightbulb', 'neuralNode', 'network'],
            // Services - Offerings/Capabilities
            ['rocket', 'chart', 'network', 'grid'],
            // Skills - Technical/diverse
            ['grid', 'neuralNode', 'scatter', 'network'],
            // Experience - Growth/Progress
            ['chart', 'rocket', 'grid', 'brain'],
            // Experiments - Innovation/Testing
            ['lightbulb', 'scatter', 'rocket', 'neuralNode'],
            // Contact - Connection/Network
            ['network', 'neuralNode', 'lightbulb', 'scatter']
        ];

        const targetShapes = sectionShapes[Math.min(newSection, sectionShapes.length - 1)];

        // Start transition when section changes
        if (newSection !== targetSection) {
            targetSection = newSection;

            // Prepare fading shapes with new geometries
            targetShapes.forEach((shapeType, index) => {
                // Dispose old fading geometry
                fadingShapes[index].geometry.dispose();

                // Create new geometry based on shape type
                const newGeometry = createThematicShape(shapeType, { x: 0, y: 0 }).geometry;
                fadingShapes[index].geometry = newGeometry;
                fadingShapes[index].line.geometry = newGeometry;

                // Reset transition progress
                transitionProgress[index] = 0;
            });
        }

        // Smooth cross-fade transition
        borderShapes.forEach((shape, index) => {
            if (transitionProgress[index] < 1) {
                transitionProgress[index] = Math.min(transitionProgress[index] + 0.025, 1); // Slower for smoother transition

                // Ease function for smooth transition
                const eased = transitionProgress[index] < 0.5
                    ? 4 * transitionProgress[index] * transitionProgress[index] * transitionProgress[index]
                    : 1 - Math.pow(-2 * transitionProgress[index] + 2, 3) / 2;

                // Cross-fade opacity
                const baseOpacity = currentTheme === 'light' ? 0.35 : 0.4;
                shape.line.material.opacity = baseOpacity * (1 - eased);
                fadingShapes[index].material.opacity = baseOpacity * eased;

                // When transition complete, swap geometries
                if (transitionProgress[index] >= 1) {
                    shape.geometry.dispose();
                    shape.geometry = fadingShapes[index].geometry.clone();
                    shape.line.geometry = shape.geometry;
                    shape.line.material.opacity = baseOpacity;
                    fadingShapes[index].material.opacity = 0;
                }
            }

            // Gentle rotation
            shape.line.rotation.z += 0.0015 * (index % 2 === 0 ? 1 : -1);
            fadingShapes[index].line.rotation.z = shape.line.rotation.z;
        });

        // Update color based on theme - abrupt switch at 50%
        const targetTheme = scrollProgress < 0.5 ? 'light' : 'dark';

        if (targetTheme !== currentTheme) {
            currentTheme = targetTheme;

            // Light theme = black shapes, Dark theme = white shapes
            const shapeColor = currentTheme === 'light' ? '#000000' : '#ffffff';
            const opacity = currentTheme === 'light' ? 0.35 : 0.4;

            borderShapes.forEach((shape, index) => {
                shape.line.material.color.setStyle(shapeColor);
                fadingShapes[index].material.color.setStyle(shapeColor);

                // Update opacity for active shapes only
                if (transitionProgress[index] >= 1) {
                    shape.line.material.opacity = opacity;
                }
            });
        }
    }

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    }, { passive: true });

    // Animation loop - minimal and smooth
    let time = 0;
    function animate() {
        requestAnimationFrame(animate);
        time += 0.01;

        // Update border shapes
        updateBorderShapes();

        // Subtle floating animation for shapes
        borderShapes.forEach((shape, index) => {
            const floatOffset = Math.sin(time * 0.5 + index * 0.5) * 0.15;

            // Apply floating to both primary and fading shapes using stored originalY
            if (shape.originalY !== undefined) {
                shape.line.position.y = shape.originalY + floatOffset;
            }
            if (fadingShapes[index].originalY !== undefined) {
                fadingShapes[index].line.position.y = fadingShapes[index].originalY + floatOffset;
            }
        });

        renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

        // Recalculate corner positions
        const positions = getShapePositions();
        const posArray = [
            positions.topLeft,
            positions.topRight,
            positions.bottomLeft,
            positions.bottomRight
        ];

        borderShapes.forEach((shape, index) => {
            shape.line.position.set(posArray[index].x, posArray[index].y, 0);
            shape.originalY = posArray[index].y; // Update original Y for floating animation

            // Update fading shape position and original Y as well
            fadingShapes[index].line.position.set(posArray[index].x, posArray[index].y, 0);
            fadingShapes[index].originalY = posArray[index].y;
        });
    }

    window.addEventListener('resize', handleResize);

    // Start animation
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        renderer.dispose();
        borderShapes.forEach(shape => {
            shape.geometry.dispose();
            shape.line.material.dispose();
        });
        fadingShapes.forEach(shape => {
            shape.geometry.dispose();
            shape.material.dispose();
        });
    });
})();
