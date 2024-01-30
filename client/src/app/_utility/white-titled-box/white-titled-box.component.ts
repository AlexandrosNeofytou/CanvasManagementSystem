
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-white-titled-box',
  templateUrl: './white-titled-box.component.html',
  styleUrls: ['./white-titled-box.component.css'],
})
export class WhiteTitledBoxComponent implements OnInit {

  @Input() title: string | undefined;

  @Input() widthLg: number | undefined = 450;
  @Input() heightLg: number | undefined = 450;

  @Input() widthSm: number | undefined = 320;
  @Input() heightSm: number | undefined = 384;

  whiteBoxCss: any;


  constructor() {
    this.setWhiteBoxStyle();
  }

  ngOnInit(): void {

    this.setWhiteBoxStyle();

  }

  setWhiteBoxStyle() {
    this.whiteBoxCss = {
      "--lgBox-width": this.widthLg+"px",
      "--lgBox-height": this.heightLg+"px",
    }
  }

}
