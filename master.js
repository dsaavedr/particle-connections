let n = 20,
    particles = [],
    cutoff = 100,
    WIDTH, HEIGHT;

var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

var requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = '#fefefe';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    ctx.strokeStyle = "grey";

    for (let i = 0; i < n; i++) {
        const x = random(WIDTH),
            y = random(HEIGHT);

        const pos = new Vector(x, y);
        const vel = Vector.random();

        particles.push(new Particle(pos, vel, "black"))
    }

    ani();
}

function ani() {
    ctx.beginPath();
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    for (let i = 0; i < particles.length; i++) {
        let p = particles[i];

        p.borders(1);
        p.update();

        for (let j = 0; j < particles.length; j++) {
            let p2 = particles[j];

            if (Vector.dist(p.pos, p2.pos) < cutoff) {
                ctx.moveTo(p.pos.x, p.pos.y);
                ctx.lineTo(p2.pos.x, p2.pos.y);
                ctx.stroke();
            }
        }

        p.show();
    }

    requestAnimationFrame(ani);
}

init();