import {Component, ElementRef, ViewChild} from '@angular/core';
import {ContextHolderService} from '../../context-holder.service';
import confetti from "canvas-confetti";

@Component({
  selector: 'app-wheel-component',
  standalone: false,

  templateUrl: './wheel-component.component.html',
  styleUrl: './wheel-component.component.css'
})
export class WheelComponentComponent {

  selectedMember: Set<string> = new Set<string>();

  // @ts-ignore
  @ViewChild("wheel") wheel: ElementRef<HTMLCanvasElement>;
  // @ts-ignore
  @ViewChild("spin") spin: ElementRef;

  colors = [
    "#ffb6de", "#bf0", "#dbdcff", "#f0b",
    "#f82", "#0bf", "#fb0", "#0fb",
    "#b0f", "#ffdfba", "#bae1ff", "#ffb3ba",
    "#4b2e83", "#afeff9", "#f9a7a7", "#c0f4b8",
    "#2c3539", "#b491ff"
  ];
  sectors: any[] = [];

  // @ts-ignore
  rand = (m, M) => Math.random() * (M - m) + m;
  // @ts-ignore
  tot;
  // @ts-ignore
  ctx;
  // @ts-ignore
  dia;
  // @ts-ignore
  rad;
  // @ts-ignore
  PI;
  // @ts-ignore
  TAU;
  // @ts-ignore
  arc0;

  friction = 0.995; // 0.995=soft, 0.99=mid, 0.98=hard
  angVel = 0; // Angular velocity
  ang = 0; // Angle in radians
  // @ts-ignore
  lastSelection;

  private audio1: HTMLAudioElement;
  private audio2: HTMLAudioElement;

  confettiFlag: number = 0;

  constructor(private contextHolderService: ContextHolderService) {
    this.audio1 = new Audio();
    this.audio1.src = 'assets/audio/magic-shime-3.mp3'; // Path to your audio file
    this.audio1.load();

    this.audio2 = new Audio();
    this.audio2.src = 'assets/audio/siren.mp3'; // Path to your audio file
    this.audio2.load();

    this.contextHolderService.getContextHolder.subscribe(context => {
      this.selectedMember = context.selectedMember;

      if (this.selectedMember == null || this.selectedMember.size === 0)
        this.sectors = [{label: '', color: '#ededed'}];
      else {
        this.sectors = Array.from(this.selectedMember).map((opts, i) => {
          return {
            color: this.colors[(i >= this.colors.length ? i + 1 : i) % this.colors.length],
            label: opts
          };
        });
      }

      if (this.wheel)
        this.createWheel();

    });
  }

  ngDoCheck(): void {
    this.engine();
  }

  createWheel() {
    this.ctx = this.wheel.nativeElement.getContext("2d");
    this.dia = this.ctx.canvas.width;
    this.tot = this.sectors.length;
    this.rad = this.dia / 2;
    this.PI = Math.PI;
    this.TAU = 2 * this.PI;
    this.arc0 = this.TAU / this.sectors.length;

    this.sectors.forEach((sector, i) => this.drawSector(sector, i));
    this.rotate(true);
  }

  spinner() {
    if (this.sectors.length >= 1 && this.sectors[0].label !== '') {
      if (!this.angVel) {
        this.angVel = this.rand(0.25, 0.35);
      }
    }
  }

  getIndex = () =>
    Math.floor(this.tot - (this.ang / this.TAU) * this.tot) % this.tot;

  drawSector(sector: any, i: any) {
    const ang = this.arc0 * i;
    this.ctx.save();
    // COLOR
    this.ctx.beginPath();
    this.ctx.fillStyle = sector.color;
    this.ctx.moveTo(this.rad, this.rad);

    this.ctx.arc(this.rad, this.rad, this.rad, ang, ang + this.arc0);
    this.ctx.lineTo(this.rad, this.rad);
    this.ctx.fill();
    // TEXT
    this.ctx.translate(this.rad, this.rad);
    this.ctx.rotate(ang + this.arc0 / 2);
    this.ctx.textAlign = "right";
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillText(sector.label, this.rad - 10, 10);
    //
    this.ctx.restore();
  }

  rotate(first = false) {
    const sector = this.sectors[this.getIndex()];
    this.ctx.canvas.style.transform = `rotate(${this.ang - this.PI / 2}rad)`;

    this.spin.nativeElement.textContent = !this.angVel ? "spin" : sector?.label;
    if (!first) {
      this.lastSelection = !this.angVel ? this.lastSelection : this.getIndex();
      this.deleteOption();
    }

    this.spin.nativeElement.style.background = sector?.color;
  }

  frame() {
    if (!this.angVel) return;

    this.angVel *= this.friction; // Decrement velocity by friction
    if (this.angVel < 0.002) this.angVel = 0; // Bring to stop
    this.ang += this.angVel; // Update angle
    this.ang %= this.TAU; // Normalize angle
    this.rotate();
  }

  engine() {
    requestAnimationFrame(this.frame.bind(this));
  }

  basicConfetti() {
    const duration = 3000;

    confetti({
      particleCount: 1000,
      spread: 180,
      origin: { y: 0.6 },
      colors: ["#ffb6de", "#bf0", "#dbdcff"]
    });

    setTimeout(() => confetti.reset(), duration);
  }

  fireworksConfetti() {
    var duration = 3000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 250;
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ["#f0b", "#f82", "#0bf"]});
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ["#f0b", "#f82", "#0bf"]});
    }, 250);
  }

  starsConfetti() {
    var defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#0bf", "#fb0", "#0fb"]
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 250,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        ...defaults,
        particleCount: 250,
        scalar: 0.75,
        shapes: ['circle']
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }

  deleteOption() {
    if (!this.angVel && this.sectors[this.lastSelection]) {

      this.audio1.play().catch(error => console.error('Error playing audio:', error));
      this.audio2.play().catch(error => console.error('Error playing audio:', error));

      if (this.confettiFlag % 3 === 0)
        this.basicConfetti();
      else if (this.confettiFlag % 3 === 1)
        this.fireworksConfetti();
      else
        this.starsConfetti();
      this.confettiFlag += 1;

      this.spin.nativeElement.textContent = this.sectors[this.lastSelection].label;
      this.contextHolderService.setLastSelectedMember(this.sectors[this.lastSelection].label);
      if (this.sectors.length === 0)
        this.sectors = [{label: '', color: '#ededed'}];

      setTimeout(() => {
        this.createWheel();
      }, 1200);
    }
  }

}
