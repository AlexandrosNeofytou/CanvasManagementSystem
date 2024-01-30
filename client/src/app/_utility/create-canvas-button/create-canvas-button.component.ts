import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-canvas-button',
  templateUrl: './create-canvas-button.component.html',
  styleUrls: ['./create-canvas-button.component.css']
})
export class CreateCanvasButtonComponent {

  @Output() onClickEvent:EventEmitter<void>=new EventEmitter<void>();

  onClick()
  {
    this.onClickEvent?.emit();
  }
}
