import {Component, OnInit, Input} from '@angular/core';
import {MatrixService} from '../matrix.service';

@Component({
  moduleId: module.id,
  selector: 'app-square',
  templateUrl: 'square.component.html',
  styleUrls: ['square.component.css']
})

export class SquareComponent implements OnInit {

  @Input()
  square: Object;

  constructor(private _matrixService: MatrixService){}

  changeValue(square) {
    this._matrixService.nextStep(square);
  }

  ngOnInit() {}

}
