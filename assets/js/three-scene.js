/* three-scene.js - Three.js Hero Network Visualization */

function initThreeScene() {
  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Nodes
  const nodesCount = 100;
  const nodesGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const crimsonMaterial = new THREE.MeshBasicMaterial({ color: 0xA50044 });
  const royalMaterial = new THREE.MeshBasicMaterial({ color: 0x004D98 });

  const nodes = [];
  for (let i = 0; i < nodesCount; i++) {
    const material = Math.random() > 0.5 ? crimsonMaterial : royalMaterial;
    const node = new THREE.Mesh(nodesGeometry, material);
    node.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 20
    );
    scene.add(node);
    nodes.push({
      mesh: node,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      )
    });
  }

  // Lines
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.2 });
  const linesGeometry = new THREE.BufferGeometry();
  const linePositions = new Float32Array(nodesCount * nodesCount * 6);
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
  const lineMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
  scene.add(lineMesh);

  camera.position.z = 10;

  function animate() {
    requestAnimationFrame(animate);

    // Update nodes
    nodes.forEach(n => {
      n.mesh.position.add(n.velocity);
      
      // Bounce off invisible boundaries
      if (Math.abs(n.mesh.position.x) > 10) n.velocity.x *= -1;
      if (Math.abs(n.mesh.position.y) > 10) n.velocity.y *= -1;
      if (Math.abs(n.mesh.position.z) > 10) n.velocity.z *= -1;
    });

    // Update lines
    let lineIdx = 0;
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const dist = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
        if (dist < 4) {
          linePositions[lineIdx++] = nodes[i].mesh.position.x;
          linePositions[lineIdx++] = nodes[i].mesh.position.y;
          linePositions[lineIdx++] = nodes[i].mesh.position.z;
          linePositions[lineIdx++] = nodes[j].mesh.position.x;
          linePositions[lineIdx++] = nodes[j].mesh.position.y;
          linePositions[lineIdx++] = nodes[j].mesh.position.z;
        }
      }
    }
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.setDrawRange(0, lineIdx / 3);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

document.addEventListener('DOMContentLoaded', initThreeScene);
