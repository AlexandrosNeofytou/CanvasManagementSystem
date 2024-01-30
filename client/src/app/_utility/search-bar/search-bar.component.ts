import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { SearchOutput } from 'src/app/Models/Search/search-output';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})

export class SearchBarComponent implements OnInit {

  @Input() searchFilters:string[]=[]

  @Input() defualtFilterIndex:number | undefined;

  @Output() onSearchPressed=new EventEmitter<SearchOutput>();

  searchFiltersValue:string []=[];

  currentSearchFilterIndex:number=0;


  ngOnInit(): void {


      if(this.searchFilters.length>0 && this.defualtFilterIndex!=null)
      {
        
        this.currentSearchFilterIndex=this.defualtFilterIndex;

        this.initializeFilterValues();
      }

  }

  private initializeFilterValues()
  {
    for(let i=0; i<this.searchFilters.length; i++)
    {
      this.searchFiltersValue.push("");

    }
  }

  onFilterChanged(event:any)
  {
      const selectedFilterName:string=event.target.value;

      const selectedFilterIndex:number=this.searchFilters.findIndex(x=>x==selectedFilterName);

      this.currentSearchFilterIndex=selectedFilterIndex;

  }

  seach()
  {
    const searchOutput:SearchOutput={
      propertyNames: this.searchFilters,
      searchValues: this.searchFiltersValue
    } 


    this.onSearchPressed.emit(searchOutput);
  }





  

}
