import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeat]'
})
export class RepeatDirective {

  
  @Input() set appRepeat (range:[number,number]){
    const [start,end]=range;

    this.viewContainerReference.clear();

    for(let i=start; i<=end; i++){
      this.viewContainerReference.createEmbeddedView(this.templateRef,{
        index:i
      });
    }
  }
  constructor(private viewContainerReference:ViewContainerRef,private templateRef:TemplateRef<any>) { 

  }


}
