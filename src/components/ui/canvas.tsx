"use client"

interface WaveParams {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Wave {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;

  constructor(params: WaveParams = {}) {
    this.phase = params.phase || 0;
    this.offset = params.offset || 0;
    this.frequency = params.frequency || 0.001;
    this.amplitude = params.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }

  value(): number {
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

// Brand color conversion to HSL
const brandColors = [
  { h: 330, s: 75, l: 70 },    // #EE7BB3 (Pink)
  { h: 280, s: 45, l: 65 },    // Soft Purple (transition color)
  { h: 165, s: 45, l: 60 },    // #6DC4AD (Green)
  { h: 200, s: 50, l: 65 },    // Soft Blue (transition color)
];

class Node {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
  }
}

interface LineParams {
  spring: number;
}

class Line {
  spring: number;
  friction: number;
  nodes: Node[];

  constructor(params: LineParams) {
    this.spring = params.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];

    for (let n = 0; n < E.size; n++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update() {
    let spring = this.spring;
    let node = this.nodes[0];

    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;

    for (let i = 0, len = this.nodes.length; i < len; i++) {
      node = this.nodes[i];

      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * E.dampening;
        node.vy += prev.vy * E.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  }

  draw() {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
      const node = this.nodes[i];
      const next = this.nodes[i + 1];
      x = (node.x + next.x) * 0.5;
      y = (node.y + next.y) * 0.5;
      ctx.quadraticCurveTo(node.x, node.y, x, y);
    }

    const lastIndex = this.nodes.length - 2;
    const node = this.nodes[lastIndex];
    const next = this.nodes[lastIndex + 1];
    ctx.quadraticCurveTo(node.x, node.y, next.x, next.y);
    ctx.stroke();
    ctx.closePath();
  }
}

interface Position {
  x: number;
  y: number;
}

interface CanvasContext extends CanvasRenderingContext2D {
  running?: boolean;
  frame?: number;
}

const E = {
  debug: true,
  friction: 0.5,
  trails: 60,
  size: 50,
  dampening: 0.025,
  tension: 0.98,
};

let ctx: CanvasContext;
let wave: Wave;
let pos: Position = { x: 0, y: 0 };
let lines: Line[] = [];

function initLines() {
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }
}

function handleMouseMove(e: MouseEvent | TouchEvent) {
  if ('touches' in e) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  } else {
    pos.x = e.clientX;
    pos.y = e.clientY;
  }
  e.preventDefault();
}

function handleTouchStart(e: TouchEvent) {
  if (e.touches.length === 1) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  }
}

function onMousemove(e: MouseEvent | TouchEvent) {
  document.removeEventListener('mousemove', onMousemove);
  document.removeEventListener('touchstart', onMousemove);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleMouseMove);
  document.addEventListener('touchstart', handleTouchStart);

  handleMouseMove(e);
  initLines();
  render();
}

function render() {
  if (ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    
    const progress = (Math.sin(wave.phase) + 1) / 2;
    const colorIndex = Math.floor(progress * (brandColors.length - 1));
    const nextColorIndex = (colorIndex + 1) % brandColors.length;
    const colorProgress = (progress * (brandColors.length - 1)) % 1;

    const color1 = brandColors[colorIndex];
    const color2 = brandColors[nextColorIndex];
    
    const h = color1.h + (color2.h - color1.h) * colorProgress;
    const s = color1.s + (color2.s - color1.s) * colorProgress;
    const l = color1.l + (color2.l - color1.l) * colorProgress;
    
    ctx.strokeStyle = `hsla(${h},${s}%,${l}%,0.035)`;
    ctx.lineWidth = 8;

    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      line.update();
      line.draw();
    }

    ctx.frame!++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  const canvas = ctx.canvas;
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight;
}

export function renderCanvas() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d') as CanvasContext;
  ctx.running = true;
  ctx.frame = 1;

  wave = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 2,
    frequency: 0.001,
    offset: 0,
  });

  document.addEventListener('mousemove', onMousemove);
  document.addEventListener('touchstart', onMousemove);
  document.body.addEventListener('orientationchange', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
} 