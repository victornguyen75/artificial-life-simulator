m = document.getElementById('canvas').getContext('2d');

draw = (x, y, c, s) => {
  m.fillStyle = c;
  m.fillRect(x, y, s, s);
};

random = () => Math.random() * 400 + 50;

// Atoms
// Each atom is defined by position (x, y), velocity (vx, vy), and color (c)
atoms = [];
atom = (x, y, c) => ({ x: x, y: y, vx: 0, vy: 0, color: c });
create = (howMany, color) => {
  group = [];
  for (let i = 0; i < howMany; i++) {
    group.push(atom(random(), random(), color));
    atoms.push(group[i]);
  }
  return group;
};

// Laws of Physics | Rules of Nature
// G = universal gravitational constant
rule = (atoms0, atoms1, G) => {
  for (let i = 0; i < atoms0.length; i++) {
    Fx = 0;
    Fy = 0;

    for (let j = 0; j < atoms1.length; j++) {
      // Pythagorean Theorem
      //   finds the shortest distance between two particles
      a = atoms0[i];
      b = atoms1[j];
      dx = a.x - b.x;
      dy = a.y - b.y;
      d = Math.sqrt(dx * dx + dy * dy);

      if (d > 0 && d < 80) {
        // Newton's Law of Universal Gravitation
        //   all matter in the universe attracts to each other based
        //   on mass and distance
        // F = (G * m1 * m2) / d^2
        // assuming mass of all atoms to be of 1 unit and
        // ignores square root of the distance, we can simplify to
        F = (G * 1) / d;

        Fx += F * dx;
        Fy += F * dy;
      }
    }

    // Newton's 2nd Law: F = ma
    //   applying a force causes acceleration
    // a = F/1
    // a = F
    // v2 - v1 = F
    // v2 = F + v1
    a.vx = (a.vx + Fx) * 0.5;
    a.vy = (a.vy + Fy) * 0.5;
    a.x += a.vx;
    a.y += a.vy;

    // Keeps atoms in the screen by reversing their direction
    if (a.x <= 0 || a.x >= 500) {
      a.vx *= -1;
    }
    if (a.y <= 0 || a.y >= 500) {
      a.vy *= -1;
    }
  }
};

// Initialization of atoms
yellow = create(200, 'yellow');
red = create(200, 'red');
green = create(200, 'green');

runSimulation = () => {
  // Ruleset
  rule(green, green, -0.32);
  rule(green, red, -0.17);
  rule(green, yellow, 0.34);
  rule(red, red, -0.1);
  rule(red, green, -0.34);
  rule(yellow, yellow, 0.15);
  rule(yellow, green, -0.2);

  // Draw the universe
  m.clearRect(0, 0, 500, 500);
  draw(0, 0, 'black', 500);
  for (let atom of atoms) {
    draw(atom.x, atom.y, atom.color, 5);
  }
  requestAnimationFrame(runSimulation);
};

runSimulation();
