let n = 100,
    particles = [],
    cutoff,
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

    cutoff = scale(WIDTH, 600, 3000, 100, 200);
    log(cutoff);

    canvas.setAttribute('width', WIDTH);
    canvas.setAttribute('height', HEIGHT);

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.beginPath();
    ctx.fillStyle = '#fefefe';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.closePath();

    ctx.strokeStyle = "grey";
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6;

    for (let i = 0; i < n; i++) {
        const x = random(WIDTH),
            y = random(HEIGHT);

        const pos = new Vector(x, y);
        const vel = Vector.random();
        vel.setMag(random(0.3, 1.3));

        particles.push(new Particle(pos, vel, "#999", Math.floor(random(3, 6))))
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
            let dist = Vector.dist(p.pos, p2.pos);

            if (dist <= cutoff) {
                ctx.save();
                ctx.globalAlpha = 0.8 - scale(dist, cutoff / 2, cutoff, 0, 0.8);
                ctx.lineWidth = 2 - scale(dist, 0, cutoff, 0.2, 2);
                ctx.beginPath();
                ctx.moveTo(p.pos.x, p.pos.y);
                ctx.lineTo(p2.pos.x, p2.pos.y);
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            }
        }

        p.show();
    }

    requestAnimationFrame(ani);
}

init();