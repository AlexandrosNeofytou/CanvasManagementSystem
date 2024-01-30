import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
 
  @Output() onPageChanged=new EventEmitter<number>();

  @Output() onSumbit=new EventEmitter();

  @Input() currentPage?:number=1;

  @Input() numberOfPages?:number=1;

  @Input() itemsPerPage?:number=1;

  @Input() totalItems?:number=1;

  @Input() maxNumberOfPagesToDisplay:number=3;

  @Input() hasSubmitButton:boolean=false; 

  private currentPageSetIndex=0;


  selectedPageIndex:number=1;

  maxPageSetIndex:number=0;

  startingPageSetIndex:number=1;

  endingPageSetIndex:number=1;


  constructor(){

  
  }

  ngOnInit(): void {


    this.setMaxNumberOfPageSets();

    this.setFirstAndLastPageIndex();

   
  }

  private setMaxNumberOfPageSets()
  {
    if(this.numberOfPages)
    {
      this.maxPageSetIndex=this.numberOfPages/this.maxNumberOfPagesToDisplay
      
      this.maxPageSetIndex=Math.ceil(this.maxPageSetIndex)-1;


    }
  }

  private setFirstAndLastPageIndex()
  {
    if(this.numberOfPages)
    {
      if(this.maxNumberOfPagesToDisplay<=0)
      {
        this.maxNumberOfPagesToDisplay=1;
      }

      let startingPageIndex = (this.currentPageSetIndex*this.maxNumberOfPagesToDisplay);

      let endingPageIndex=startingPageIndex+this.maxNumberOfPagesToDisplay;

      
      if(endingPageIndex>this.numberOfPages)
      {
          endingPageIndex=this.numberOfPages;
      }
     
      this.startingPageSetIndex=startingPageIndex+1;

      this.endingPageSetIndex=endingPageIndex;

    }

  }

  showNextPaginationOptions()
  {



    if(this.currentPageSetIndex<this.maxPageSetIndex)
    {
        this.currentPageSetIndex++;

        this.setFirstAndLastPageIndex();

    }
   
    
  }

  showPreviousPaginationOptions()
  {

    if(this.currentPageSetIndex>0)
    {
      this.currentPageSetIndex--;
      this.setFirstAndLastPageIndex();

    }



  }

  changePage(targetPageNumnber:number)
  { 
    if(targetPageNumnber!=this.selectedPageIndex)
    {
      this.onPageChanged.emit(targetPageNumnber);

      this.selectedPageIndex=targetPageNumnber;

    }
  }

  Submit()
  {
    this.onSumbit.emit();
  }
  


}
