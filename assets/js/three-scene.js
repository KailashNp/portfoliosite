/* three-scene.js - Three.js Hero Network Visualization */

function initThreeScene() {
  const container = document.getElementById('three-canvas-container');
  if (!container) return;

  // Gracefully degrade if THREE is missing
  if (typeof THREE === 'undefined') {
    initCanvasFallback(container);
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Nodes
  const nodesCount = 100;
  const nodesGeometry = new THREE.SphereGeometry(0.1, 8, 8);
  const specialGeometry = new THREE.SphereGeometry(0.15, 8, 8); // 1.5x size
  const crimsonMaterial = new THREE.MeshBasicMaterial({ color: 0xA50044 });
  const royalMaterial = new THREE.MeshBasicMaterial({ color: 0x004D98 });
  const specialMaterial = new THREE.MeshBasicMaterial({ color: 0xA50044 }); // full crimson

  const nodes = [];
  for (let i = 0; i < nodesCount; i++) {
    // 10 special nodes
    const isSpecial = i < 10;
    const geometry = isSpecial ? specialGeometry : nodesGeometry;
    const material = isSpecial ? specialMaterial : (Math.random() > 0.5 ? crimsonMaterial : royalMaterial);
    
    const node = new THREE.Mesh(geometry, material);
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
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xA50044, transparent: true, opacity: 0.15 });
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

function initCanvasFallback(container) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  container.appendChild(canvas);
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const nodes = [];
  for(let i=0; i<60; i++) {
    const isSpecial = i < 10;
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      r: isSpecial ? 3 : 2,
      color: isSpecial ? '#A50044' : (Math.random() > 0.5 ? '#A50044' : '#004D98')
    });
  }

  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      
      // Drift to mouse slightly
      n.x += (mouseX - n.x) * 0.001;
      n.y += (mouseY - n.y) * 0.001;

      if(n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if(n.y < 0 || n.y > canvas.height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fillStyle = n.color;
      ctx.fill();
    });

    for(let i=0; i<nodes.length; i++) {
      for(let j=i+1; j<nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if(dist < 150) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(165,0,68,${0.15 * (1 - dist/150)})`;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

document.addEventListener('DOMContentLoaded', initThreeScene);
