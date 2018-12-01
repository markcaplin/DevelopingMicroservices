import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarConfig } from '@angular/material';
import { MatSnackBarHorizontalPosition } from '@angular/material';
import { MatSnackBarVerticalPosition } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private duration = 5000;
  private action = '';

  public progressBarUIEvent: EventEmitter<any>;

  constructor(public snackBar: MatSnackBar) {
    this.progressBarUIEvent = new EventEmitter();
  }

  public startProgressBar() {
    this.progressBarUIEvent.emit(true);
  }

  public stopProgressBar() {
    this.progressBarUIEvent.emit(false);
  }

  public ShowSuccessMessage(message: string) {

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.duration;
    config.panelClass = ['successMessage'];

    this.snackBar.open(message, this.action, config);

    this.stopProgressBar();

  }

  public ShowErrorMessage(message: string) {

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.duration;
    config.panelClass = ['errorMessage'];

    this.snackBar.open(message, this.action, config);

    this.stopProgressBar();

  }

  public ShowWarningMessage(message: string) {

    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.duration;
    config.panelClass = ['warningMessage'];

    this.snackBar.open(message, this.action, config);

    this.stopProgressBar();

  }

}


