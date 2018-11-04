let particles = [];
const initialValue = 450;

for (let index = 0; index < initialValue; index++) {
	particles.push({
		x: Math.random() * window.innerWidth,
		y: Math.random() * window.innerHeight,
		vx: Math.random() * 2 - 1,
		vy: Math.random() * 2 - 1,
		history: [],
		dotSize: Math.random() * 1,
		color: '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6)
	});
}

let mouse = { x: 0, y: 0 };
const canvasElement = document.querySelector('#canvas');
let context = canvasElement.getContext('2d');
Initialize();

function Initialize() {
	canvasElement.addEventListener('mousemove', MouseMove);
	window.addEventListener('resize', ResizeCanvas);

	setInterval(updateCanvas, 25);

	context.beginPath();

	ResizeCanvas();
}

function updateCanvas(e) {
	context.clearRect(0, 0, window.innerWidth, window.innerHeight);

	for (let index = 0; index < particles.length; index++) {
		particles[index].x += particles[index].vx;
		particles[index].y += particles[index].vy;

		if (particles[index].x > window.innerWidth) {
			particles[index].vx = -1 - Math.random();
		} else if (particles[index].x < 0) {
			particles[index].vx = 1 + Math.random();
		}

		if (particles[index].y > window.innerHeight) {
			particles[index].vy = -1 - Math.random();
		} else if (particles[index].y < 0) {
			particles[index].vy = 1 + Math.random();
		}

		particles[index].history.push({
			x: particles[index].x,
			y: particles[index].y
		});
		if (particles[index].history.length > 10) {
			particles[index].history.shift();
		}
		// distance from the mouse
		let distantFactor = calculateDistance(mouse, particles[index]);
		distantFactor = Math.max(Math.min(10 - distantFactor / 5, 5), 1);

		context.fillStyle = particles[index].color;
		context.beginPath();
		context.arc(particles[index].x, particles[index].y, particles[index].dotSize * distantFactor, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
	}
}

function MouseMove(e) {
	mouse.x = e.layerX;
	mouse.y = e.layerY;
}
function ResizeCanvas(e) {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
function calculateDistance(p1, p2) {
	let dx = p2.x - p1.x;
	let dy = p2.y - p1.y;

	return Math.sqrt(dx * dx + dy * dy);
}
