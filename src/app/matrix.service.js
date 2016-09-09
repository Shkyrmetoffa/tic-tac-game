"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var MatrixService = (function () {
    function MatrixService() {
        this.matrix = [];
        this.count = 0;
        this.arrWin = [];
        this.winLine = 3;
        this.winSize = 3;
        this.deadHeat = false;
        this.startSquare = 0;
        this.gameWinner = false;
        this.canClick = true;
        this.steps = { '1': [], '0': [] };
        this.xWin = false;
        this.oWin = false;
    }
    MatrixService.prototype.generateMatrix = function (size) {
        this.matrix = [];
        this.count = 0;
        this.winLine = (this.winSize >= this.winLine) ? this.winLine : this.winSize;
        this.steps = { '1': [], '0': [] };
        this.startSquare = 0;
        this.gameWinner = false;
        this.canClick = true;
        this.deadHeat = false;
        this.xWin = false;
        this.oWin = false;
        var index = 0;
        for (var i = 0; i < size; i++) {
            var arr = [];
            for (var j = 0; j < size; j++) {
                arr.push(this.createElem(index));
            }
            this.matrix.push(arr);
        }
        return this.matrix;
    };
    MatrixService.prototype.createElem = function (j) {
        return ({ value: '', index: j });
    };
    MatrixService.prototype.nextStep = function (square) {
        if (this.count % 2 === 0 && square.value === '') {
            square.value = '1';
            this.count++;
        }
        else if (this.count % 2 !== 0 && square.value === '') {
            square.value = '0';
            this.count++;
        }
        this.startSquare += 1;
        this.steps[square.value].push(square.index);
        if (this.startSquare >= ((this.winLine * 2) - 1)) {
            if (!this.arrWin.length) {
                this.generateWin();
            }
            if (this.checkWinner(square.value)) {
                this.gameWinner = true;
                this.canClick = !this.canClick;
                if (this.count % 2 === 0 && this.gameWinner && this.xWin === false) {
                    this.oWin = true;
                }
                else if (this.count % 2 !== 0 && this.gameWinner && this.oWin === false) {
                    this.xWin = true;
                }
            }
        }
        if (this.startSquare === (this.winSize * this.winSize)) {
            this.deadHeat = true;
            this.canClick = !this.canClick;
        }
    };
    MatrixService.prototype.horizontalWin = function (start) {
        var lineTemp = [];
        while (lineTemp.length !== this.winLine) {
            lineTemp.push(start);
            start++;
        }
        return lineTemp;
    };
    MatrixService.prototype.verticalWin = function (start) {
        var lineTemp = [];
        while (lineTemp.length !== this.winLine) {
            lineTemp.push(start);
            start += this.winSize;
        }
        return lineTemp;
    };
    MatrixService.prototype.rightDiagonal = function (start) {
        var lineTemp = [];
        while (lineTemp.length !== this.winLine) {
            lineTemp.push(start);
            start += (this.winSize + 1);
        }
        return lineTemp;
    };
    MatrixService.prototype.leftDiagonal = function (start) {
        var lineTemp = [];
        while (lineTemp.length !== this.winLine) {
            lineTemp.push(start);
            start += (this.winSize - 1);
        }
        return lineTemp;
    };
    MatrixService.prototype.generateWin = function () {
        for (var j = 0; j < (this.winSize * this.winSize); j += this.winSize) {
            for (var i = 0; i <= (this.winSize - this.winLine); i++) {
                this.arrWin.push(this.horizontalWin(i + j));
            }
        }
        for (var j = 0; j < this.winSize * (this.winSize - this.winLine + 1); j++) {
            this.arrWin.push(this.verticalWin(j));
        }
        for (var j = 0; j < this.winSize * (this.winSize - this.winLine + 1); j += this.winSize) {
            for (var i = 0; i <= (this.winSize - this.winLine); i++) {
                this.arrWin.push(this.rightDiagonal(i + j));
            }
        }
        for (var j = 0; j < (this.winSize * (this.winSize - this.winLine + 1)); j += this.winSize) {
            for (var i = this.winLine - 1; i < this.winSize; i++) {
                this.arrWin.push(this.leftDiagonal(i + j));
            }
        }
    };
    MatrixService.prototype.checkWinner = function (value) {
        var _this = this;
        var winner = false;
        for (var i = 0; i < this.arrWin.length; i++) {
            if (this.arrWin[i].every(function (number) {
                return _this.steps[value].indexOf(number) !== -1;
            })) {
                winner = true;
                break;
            }
        }
        return winner;
    };
    MatrixService = __decorate([
        core_1.Injectable()
    ], MatrixService);
    return MatrixService;
}());
exports.MatrixService = MatrixService;
//# sourceMappingURL=matrix.service.js.map