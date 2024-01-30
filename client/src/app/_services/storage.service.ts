import { Injectable } from '@angular/core';
import { StorageNames } from '../Enums/storage-names.enum';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  addToStorage<T>(storageName:string,data:T)
  {
     const jsonData=JSON.stringify(data)

     if(jsonData)
     {
       localStorage.setItem(storageName,jsonData)
     }
  }

  getFromStorage<T>(storageName:string):T | null
  {
    const storageItemString:string | null=localStorage.getItem(storageName);

    if(storageItemString)
    {
        const data:T=JSON.parse(storageItemString)

        return data;
    }

    return null;
  }
}
