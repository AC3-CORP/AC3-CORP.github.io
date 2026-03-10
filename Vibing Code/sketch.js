// Vibe Coding - Enhanced Edition
// March 10, 2026

// Vibe Coding - Enhanced Edition
// March 10, 2026

let player, xeno;
let walls = [], bullets = [], particles = [];
let currentLevel = 1;
let gameState = "PLAY";
let trauma = 0;
let muzzleFlash = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initLevel(currentLevel);
}

function initLevel(lvl) {
  if (lvl > 3) {
    gameState = "WIN";
    return;
  }
  
  player = {
    pos: createVector(100, 100),
    angle: 0,
    speed: 4.5,
    health: 100
  };

  xeno = {
    pos: createVector(width - 200, height - 200),
    angle: 0,
    speed: 2.8 + (lvl * 0.4),
    alive: true,
    size: 55 
  };

  // Border walls
  walls = [
    [0, 0, width, 25], [0, height-25, width, 25],
    [0, 0, 25, height], [width-25, 0, 25, height]
  ];
  
  // Level-specific layouts
  if (lvl === 1) {
    walls.push([width/2-20, 0, 40, height/2 - 60], [width/2-20, height/2 + 60, 40, height/2]);
  } else if (lvl === 2) {
    walls.push([300, 200, 400, 40], [100, 450, 400, 40]);
  } else {
    walls.push([200, 150, 40, 400], [width-240, 150, 40, 400], [width/2-100, height/2-20, 200, 40]);
  }
  
  bullets = [];
  particles = [];
}

function draw() {
  // --- 1. AMBIENT FLOOR TEXTURE ---
  background(10, 12, 20); // Deep cold blue/black
  drawDeckPlating();

  if (gameState === "PLAY") {
    runGame();
  } else {
    drawEndScreen();
  }
  
  drawVignette();
  drawCRTOverlay();
}

function drawDeckPlating() {
  stroke(20, 25, 40);
  strokeWeight(1);
  // Grid lines for floor panels
  for (let i = 0; i < width; i += 60) line(i, 0, i, height);
  for (let i = 0; i < height; i += 60) line(0, i, width, i);
  
  // Random "grime" spots
  noStroke();
  fill(0, 0, 0, 40);
  rect(width/4, height/3, 200, 150, 20);
  rect(width/1.5, height/1.5, 300, 100, 20);
}

function runGame() {
  push();
  handleTrauma();

  // --- 2. LIGHTING PASS ---
  drawFlashlight();
  
  // --- 3. OBJECTS & ACTORS ---
  drawLevel();
  updatePlayer();
  if (xeno.alive) updateXeno();
  updateBullets();
  updateParticles();
  
  pop();
  
  drawHUD();
  drawMotionTracker();
}

function drawFlashlight() {
  // Flashlight beam calculation
  noStroke();
  let segments = 12;
  for (let i = segments; i > 0; i--) {
    let r = i * 40;
    // Layered semi-transparent arcs for a soft glow effect
    fill(200, 220, 255, map(i, 0, segments, 25, 2));
    arc(player.pos.x, player.pos.y, r * 2.5, r * 2.5, player.angle - 0.7, player.angle + 0.7);
  }

  // Muzzle Flash Effect
  if (muzzleFlash > 0) {
    fill(255, 200, 100, muzzleFlash * 20);
    rect(0, 0, width, height);
    muzzleFlash--;
  }
}

function updatePlayer() {
  player.angle = atan2(mouseY - player.pos.y, mouseX - player.pos.x);
  
  let move = createVector(0, 0);
  if (keyIsDown(87)) move.y -= 1;
  if (keyIsDown(83)) move.y += 1;
  if (keyIsDown(65)) move.x -= 1;
  if (keyIsDown(68)) move.x += 1;
  
  if (move.mag() > 0) {
    move.normalize().mult(player.speed);
    if (!checkWall(player.pos.x + move.x, player.pos.y)) player.pos.x += move.x;
    if (!checkWall(player.pos.x, player.pos.y + move.y)) player.pos.y += move.y;
  }

  // Render High-Detail Marine
  push();
  translate(player.pos.x, player.pos.y);
  rotate(player.angle);
  
  // Armor Shadow
  fill(0, 40);
  rect(-10, -13, 26, 32, 4);
  
  // Armor Plate (Olive Drab)
  fill(45, 55, 45);
  stroke(20);
  rect(-12, -15, 24, 30, 3);
  
  // Helmet
  fill(210, 180, 140);
  noStroke();
  ellipse(0, 0, 16, 16);
  
  // Pulse Rifle with highlight
  fill(20);
  rect(10, 6, 26, 7, 1);
  fill(0, 255, 100, 200); // Pulse counter glow
  rect(15, 7, 3, 2);
  pop();
}

function updateXeno() {
  let d = dist(player.pos.x, player.pos.y, xeno.pos.x, xeno.pos.y);
  
  xeno.angle = atan2(player.pos.y - xeno.pos.y, player.pos.x - xeno.pos.x);
  xeno.pos.add(p5.Vector.fromAngle(xeno.angle).mult(xeno.speed));

  if (d < 45) {
    player.health -= 1.2;
    trauma = 10;
    if (player.health <= 0) gameState = "GAMEOVER";
  }

  // Draw High-Spec Xenomorph (Only if near light)
  if (d < 450) { 
    push();
    translate(xeno.pos.x, xeno.pos.y);
    rotate(xeno.angle);
    scale(1.9);
    
    // Obsidian gloss body
    fill(10, 10, 18);
    stroke(0, 255, 0, 40); // Slimy highlight
    strokeWeight(1.5);
    
    // Elongated skull
    ellipse(10, 0, 48, 16);
    // Torso
    rect(-15, -9, 22, 18, 5);
    // Tail with bezier curve
    noFill();
    stroke(15);
    bezier(-15, 0, -35, 20, -35, -20, -50, 0);
    pop();
  }
}

function drawLevel() {
  walls.forEach(w => {
    // Wall Base
    fill(35, 40, 55);
    noStroke();
    rect(w[0], w[1], w[2], w[3], 2);
    
    // Industrial "Rib" texture
    stroke(15, 18, 25);
    strokeWeight(2);
    if (w[2] > w[3]) { // Horizontal wall
      for(let i=10; i<w[2]; i+=30) line(w[0]+i, w[1], w[0]+i, w[1]+w[3]);
    } else { // Vertical wall
      for(let i=10; i<w[3]; i+=30) line(w[0], w[1]+i, w[0]+w[2], w[1]+i);
    }
  });
}

function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let b = bullets[i];
    b.pos.add(b.vel);
    
    // Tracer effect
    stroke(255, 255, 180);
    strokeWeight(3);
    line(b.pos.x, b.pos.y, b.pos.x - b.vel.x*0.3, b.pos.y - b.vel.y*0.3);

    if (xeno.alive && dist(b.pos.x, b.pos.y, xeno.pos.x, xeno.pos.y) < xeno.size) {
      xeno.alive = false;
      spawnAcid(xeno.pos.x, xeno.pos.y);
      bullets.splice(i, 1);
      trauma = 20;
      setTimeout(() => { currentLevel++; initLevel(currentLevel); }, 1500);
    } else if (checkWall(b.pos.x, b.pos.y)) {
      bullets.splice(i, 1);
    }
  }
}

function checkWall(x, y) {
  return walls.some(w => x > w[0]-5 && x < w[0]+w[2]+5 && y > w[1]-5 && y < w[1]+w[3]+5);
}

function handleTrauma() {
  if (trauma > 0) {
    translate(random(-trauma, trauma), random(-trauma, trauma));
    trauma *= 0.9;
  }
}

function drawVignette() {
  // Edge darkening for atmosphere
  noFill();
  for(let i=0; i<150; i+=15) {
    stroke(0, i * 0.7);
    strokeWeight(30);
    rect(0, 0, width, height);
  }
}

function drawHUD() {
  // Medical Status
  fill(0, 40, 0, 150);
  stroke(0, 255, 0);
  rect(30, height - 50, 204, 18, 2);
  fill(0, 255, 100);
  noStroke();
  rect(32, height - 48, max(0, player.health * 2), 14);
  
  textSize(14);
  textAlign(LEFT);
  fill(0, 255, 0);
  text("VITAL SIGNS: " + ceil(player.health) + "%", 30, height - 60);
  text("SECTOR: LV-426", 30, 40);
}

function drawMotionTracker() {
  let trackerX = width - 150;
  let trackerY = height - 150;
  
  push();
  translate(trackerX, trackerY);
  // Screen
  fill(0, 30, 0, 200);
  stroke(0, 255, 0);
  rect(0, 0, 120, 120, 10);
  
  // Scanning pulse line
  let scanY = (frameCount * 2.5) % 120;
  stroke(0, 255, 0, 60);
  line(0, scanY, 120, scanY);

  // Target ping
  if (xeno.alive) {
    let dx = (xeno.pos.x - player.pos.x) / 10;
    let dy = (xeno.pos.y - player.pos.y) / 10;
    if (frameCount % 60 < 25) {
      noStroke();
      fill(0, 255, 0);
      ellipse(60 + dx, 60 + dy, 8, 8);
      // Fading ring around ping
      noFill();
      stroke(0, 255, 0, 100);
      ellipse(60 + dx, 60 + dy, 15, 15);
    }
  }
  pop();
}

function spawnAcid(x, y) {
  for(let i=0; i<25; i++) {
    particles.push({
      pos: createVector(x,y), 
      vel: p5.Vector.random2D().mult(random(3,7)), 
      life: 255
    });
  }
}

function updateParticles() {
  particles.forEach((p, i) => {
    p.pos.add(p.vel);
    p.life -= 6;
    fill(180, 255, 0, p.life);
    noStroke();
    rect(p.pos.x, p.pos.y, 4, 4);
    if (p.life < 0) particles.splice(i, 1);
  });
}

function mousePressed() {
  if (gameState === "PLAY") {
    trauma = 6;
    muzzleFlash = 8;
    bullets.push({pos: player.pos.copy(), vel: p5.Vector.fromAngle(player.angle).mult(15)});
  }
}

function drawCRTOverlay() {
  stroke(0, 40);
  strokeWeight(1);
  for (let i = 0; i < height; i += 4) line(0, i, width, i);
}

function drawEndScreen() {
  background(0);
  textAlign(CENTER);
  fill(255);
  textSize(40);
  if (gameState === "GAMEOVER") {
    fill(255, 50, 50);
    text("SIGNAL LOST", width/2, height/2);
  } else {
    fill(50, 255, 150);
    text("COLONY SECURED", width/2, height/2);
  }
  textSize(18);
  fill(200);
  text("PRESS F5 TO RE-DEPLOY", width/2, height/2 + 60);
}