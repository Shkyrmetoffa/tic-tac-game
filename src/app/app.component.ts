import { Component } from '@angular/core';
import {SquareComponent} from "./square/square.component";
import {MatrixService} from './matrix.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [SquareComponent],
  providers: [MatrixService]
})

export class AppComponent {
  public matrix = [];
  public size = 3;

  constructor(private _matrixService: MatrixService){
    this.startGame(this.size);
  }

  startGame(size){
    this.matrix = this._matrixService.generateMatrix(size);
  }
}
