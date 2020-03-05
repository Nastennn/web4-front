import {Point} from './point';
import {ElementRef} from '@angular/core';

export class Graphic {

  constructor(private canvas: ElementRef) {
  }

  drawPoint(point: Point) {
    const x = point.x;
    const y = point.y;
    const hit = point.result;

    console.log('Marking point ' + x + ', ' + y + ', ' + hit);

    const context = this.canvas.nativeElement.getContext('2d');

    context.beginPath();
    context.rect(Math.round(180 + ((x / 5) * 150)) - 3, Math.round(180 - ((y / 5) * 150)) - 3, 6, 6);
    context.closePath();
    context.fill();
    context.strokeStyle = 'black';

    let color = 'red';

    if (hit) {
      color = 'lime';
    }

    context.fillStyle = color;
    context.fill();
    context.stroke();
  }

  drawGraphic(r) {
    const context = this.canvas.nativeElement.getContext('2d');
    context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    const size = 360;

    // Single segment
    const i = (size / 2 - 30) / 5;
    r = r * i;
    const startX = size / 2;
    const startY = size / 2;
    context.fillStyle = '#2f9aff';
    context.beginPath();

    // Triangle
    context.moveTo(startX, startY);
    context.lineTo(startX - r / 2, startY);
    context.lineTo(startX, startY + r);
    context.fill();

    // Arc
    context.moveTo(startX, startY);
    context.arc(startX, startY, r / 2, 2 * Math.PI, 3 * Math.PI / 2, true);
    context.fill();

    // Rectangle
    context.moveTo(startX, startY);
    context.lineTo(startX, startY - r);
    context.lineTo(startX - r / 2, startY - r);
    context.lineTo(startX - r / 2, startY);
    context.lineTo(startX, startY);
    context.fill();

    // Lines
    context.strokeStyle = '#000000'; // colour of the lines
    context.strokeRect(startX, 0, 0, size); // y axis
    context.strokeRect(0, startY, size, 0); // x axis

    // Axes' arrows
    context.moveTo(startX, 0);
    context.lineTo(startX - 4, 10);
    context.moveTo(startX, 0);
    context.lineTo(startX + 4, 10);
    context.moveTo(size, startY);
    context.lineTo(size - 10, startY - 4);
    context.moveTo(size, startY);
    context.lineTo(size - 10, startY + 4);

    // X axe strokes
    context.moveTo(startX - i * 5, startY - 5);
    context.lineTo(startX - i * 5, startY + 5);
    context.moveTo(startX - i * 4, startY - 5);
    context.lineTo(startX - i * 4, startY + 5);
    context.moveTo(startX - i * 3, startY - 5);
    context.lineTo(startX - i * 3, startY + 5);
    context.moveTo(startX - i * 2, startY - 5);
    context.lineTo(startX - i * 2, startY + 5);
    context.moveTo(startX - i, startY - 5);
    context.lineTo(startX - i, startY + 5);
    context.moveTo(startX + i, startY - 5);
    context.lineTo(startX + i, startY + 5);
    context.moveTo(startX + i * 2, startY - 5);
    context.lineTo(startX + i * 2, startY + 5);
    context.moveTo(startX + i * 3, startY - 5);
    context.lineTo(startX + i * 3, startY + 5);
    context.moveTo(startX + i * 4, startY - 5);
    context.lineTo(startX + i * 4, startY + 5);
    context.moveTo(startX + i * 5, startY - 5);
    context.lineTo(startX + i * 5, startY + 5);


    // Y axe strokes
    context.moveTo(startX - 5, startY - i * 5);
    context.lineTo(startX + 5, startY - i * 5);
    context.moveTo(startX - 5, startY - i * 4);
    context.lineTo(startX + 5, startY - i * 4);
    context.moveTo(startX - 5, startY - i * 3);
    context.lineTo(startX + 5, startY - i * 3);
    context.moveTo(startX - 5, startY - i * 2);
    context.lineTo(startX + 5, startY - i * 2);
    context.moveTo(startX - 5, startY - i);
    context.lineTo(startX + 5, startY - i);
    context.moveTo(startX - 5, startY + i);
    context.lineTo(startX + 5, startY + i);
    context.moveTo(startX - 5, startY + i * 2);
    context.lineTo(startX + 5, startY + i * 2);
    context.moveTo(startX - 5, startY + i * 3);
    context.lineTo(startX + 5, startY + i * 3);
    context.moveTo(startX - 5, startY + i * 4);
    context.lineTo(startX + 5, startY + i * 4);
    context.moveTo(startX - 5, startY + i * 5);
    context.lineTo(startX + 5, startY + i * 5);

    context.stroke();

    // Signatures
    context.strokeText('-5', startX - i * 5, startY - 10, 20);
    context.strokeText('-4', startX - i * 4, startY - 10, 20);
    context.strokeText('-3', startX - i * 3, startY - 10, 20);
    context.strokeText('-2', startX - i * 2, startY - 10, 20);
    context.strokeText('-1', startX - i, startY - 10, 20);
    context.strokeText('1', startX + i, startY - 10, 20);
    context.strokeText('2', startX + i * 2, startY - 10, 20);
    context.strokeText('3', startX + i * 3, startY - 10, 20);
    context.strokeText('4', startX + i * 4, startY - 10, 20);
    context.strokeText('5', startX + i * 5, startY - 10, 20);
    context.strokeText('-5', startX + 10, startY + i * 5, 20);
    context.strokeText('-4', startX + 10, startY + i * 4, 20);
    context.strokeText('-3', startX + 10, startY + i * 3, 20);
    context.strokeText('-2', startX + 10, startY + i * 2, 20);
    context.strokeText('-1', startX + 10, startY + i, 20);
    context.strokeText('1', startX + 10, startY - i, 20);
    context.strokeText('2', startX + 10, startY - i * 2, 20);
    context.strokeText('3', startX + 10, startY - i * 3, 20);
    context.strokeText('4', startX + 10, startY - i * 4, 20);
    context.strokeText('5', startX + 10, startY - i * 5, 20);
    context.strokeText('x', size - 10, startY - 10, 20);
    context.strokeText('y', startX + 10, 10, 20);

    context.closePath();
  }
}
