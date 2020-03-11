const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    color = document.getElementById('color'),
    number = document.getElementById('width'),
    button = document.getElementById('clear'),
    olympic = document.getElementById('olympic'),
    createOlym = olympic.getContext('2d');
number.value = 1;

const angle = (degrees = 360) => Math.PI / 180 * degrees;
// const gradient = ctx.createRadialGradient(70, 70, 0, 70, 70, 70);
// gradient.addColorStop(0, 'hsl(250, 70%, 70%)');
// gradient.addColorStop(1, 'hsl(0, 70%, 70%)');

// ctx.fillStyle = gradient;
// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = 'hsl(200,70%, 80%)';
// ctx.strokeRect(140, 20, 100, 100);

// ctx.clearRect(45, 45, 50, 50);
// ctx.beginPath();
// ctx.moveTo(150, 0);
// ctx.lineTo(175, 125);
// ctx.lineWidth = '2';
// ctx.strokeStyle = '#008800';
// ctx.moveTo(175, 150);
// ctx.arc(150, 150, 25, 0, Math.PI * 2, false);

// ctx.moveTo(125, 125);
// ctx.arcTo(150, 100, 175, 125, 30);
// ctx.lineTo(175, 125);

// ctx.moveTo(100, 100);
// ctx.bezierCurveTo(100, 0, 200, 200, 300, 100);
// ctx.stroke();
// ctx.font = '30px Sans-serif';
// ctx.fillStyle = 'green';
// ctx.save();
// ctx.shadowOffsetX = 5;
// ctx.shadowOffsetY = 5;
// ctx.shadowBlur = 3;
// ctx.shadowColor = 'red';
// ctx.fillText('JavaScript', 50, 50, 200);

// ctx.fillStyle = 'blue';
// ctx.rotate(angle(10));
// ctx.shadowColor = 'orange';
// ctx.fillText('GloAcademy', 200, 50, 200);
// ctx.restore();
// ctx.fillText('Freelance', 125, 150, 200);

// let tick = 0;
// const animation = () => {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//     tick++;
//     ctx.fillStyle = 'green';
//     ctx.fillRect(tick, tick, 50, 50);

//     if (tick < 250) {
//         requestAnimationFrame(animation);
//     } else {
//         reverse();
//     }
// };

// const reverse = () => {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
//     tick--;
//     ctx.fillStyle = 'green';
//     ctx.fillRect(tick, tick, 50, 50);

//     if (tick > 0) {
//         requestAnimationFrame(reverse);
//     } else {
//         animation();
//     }
// }
// animation();

color.addEventListener('input', () => {
    ctx.strokeStyle = color.value;
});

number.addEventListener('input', () => {
    ctx.lineWidth = number.value;
});

button.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
})

canvas.addEventListener('mousemove', (event) => {
    const x = event.offsetX,
        y = event.offsetY,
        mx = event.movementX,
        my = event.movementY;
    if (event.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - mx, y - my);
        ctx.stroke();
        ctx.closePath();
    }

});

const drawOlympic = () => {
    createOlym.beginPath();
    createOlym.lineWidth = 10;
    createOlym.strokeStyle = 'blue';
    createOlym.arc(100, 100, 50, 0, angle(360), true);
    createOlym.stroke();
    createOlym.beginPath();
    createOlym.strokeStyle = 'black';
    createOlym.arc(225, 100, 50, 0, angle(360), true);
    createOlym.stroke();
    createOlym.beginPath();
    createOlym.strokeStyle = 'red';
    createOlym.arc(350, 100, 50, 0, angle(360), true);
    createOlym.stroke();
    createOlym.beginPath();
    createOlym.strokeStyle = 'yellow';
    createOlym.arc(160, 150, 50, 0, angle(360), true);
    createOlym.stroke();
    createOlym.beginPath();
    createOlym.strokeStyle = 'green';
    createOlym.arc(285, 150, 50, 0, angle(360), true);
    createOlym.stroke();
};
drawOlympic();