import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {isNumeric} from 'rxjs/util/isNumeric';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';
import {PointsService} from '../../services/points/points.service';
import {Point} from '../../model/point';
import {HistoryComponent} from '../history/history.component';
import {Graphic} from '../../model/graphic';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  providers: [HistoryComponent],
  selector: 'app-check-points',
  templateUrl: './check-points.component.html',
  styleUrls: ['./check-points.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CheckPointsComponent implements OnInit, OnChanges {
  @ViewChild('canvas')
  private canvas: ElementRef;
  private errorMessage: string;
  private graphic: Graphic;

  constructor(private service: PointsService, private authService: AuthService) {
    this.authService = authService;
    this.service = service;
  }

  public mainForm: FormGroup;

  ngOnInit() {
    this.createForm();
    this.graphic = new Graphic(this.canvas);
    const r = this.getRadius();
    this.graphic.drawGraphic(r);
    this.getPointsRecalculated(r);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.radius) {
      this.drawGraphic(changes.radius.currentValue);
    }

  }

  public getYValue() {
    return this.form.controls.yValue.value;
  }

  public getXValue() {
    return this.form.controls.xValue.value;
  }

  public get form() {
    return this.mainForm;
  }

  public getRadius(): number {
    return this.form.controls.radius.value;
  }

  public submitForm(): void {
    if (this.form.invalid) {
      return;
    }
  }

  private createForm(): void {
    this.mainForm = new FormGroup({
      xValue: new FormControl('0'),
      yValue: new FormControl(0),
      radius: new FormControl('1')
    });
  }

  private checkX(x) {
    if (!isNumeric(x) || !(-3 < x && x < 3)) {
      this.error('Wrong x value');
      return false;
    }
    return true;
  }

  private checkR(r) {
    if (!isNumeric(r) || r < 0 || r > 3) {
      this.error('Wrong r value');
      return false;
    }
    return true;
  }


  addPoint(point?: Point): boolean {
    if (!point) {
      point = new Point(this.getXValue(), this.getYValue(), this.getRadius());
    }

    if (!this.checkX(point.x) || !this.checkR(point.r)) {
      return false;
    }

    this.service.addPoint(point)
      .then(data => {
        this.drawPoint(<Point>data);
        this.service.getPoints();
      })
      .catch((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          this.authService.logOut();
        }
      });
    return true;
  }

  public getPointsRecalculated(r) {
    this.service.getPointsRecalculated(r).subscribe(data => (data as Point[]).forEach(p => this.drawPoint(p)), (err: HttpErrorResponse) => {
      if (err.status === 401 || err.status === 403) {
        this.authService.logOut();
      }
    });
  }

  addPointFromCanvas() {
    const br = this.canvas.nativeElement.getBoundingClientRect();
    const left = br.left;
    const top = br.top;

    const event: MouseEvent = <MouseEvent>window.event;
    const x = event.clientX - left;
    const y = event.clientY - top;

    const xCalculated = (x - 360 / 2) / 150 * 5;
    const yCalculated = (-y + 360 / 2) / 150 * 5;
    const point = new Point(xCalculated, yCalculated, this.getRadius());
    this.addPoint(point);
  }

  public drawPoint(point: Point) {
    this.graphic.drawPoint(point);
  }

  drawGraphic(r) {
    if (this.checkR(r)) {
      this.graphic.drawGraphic(r);
      this.getPointsRecalculated(r);
    } else {
      this.error('R is out of bound');
    }
  }

  isDesktopDisplay() {
    return document.body.clientWidth >= 1000;
  }

  private error(message: string) {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000);
  }
}
