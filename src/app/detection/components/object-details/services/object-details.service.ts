import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { DictionaryResp } from '../../../interfaces/index';

@Injectable({
  providedIn: 'root'
})
export class ObjectDetailsService {

  public isOpen: boolean;

  statusChange: Subject<boolean> = new Subject<boolean>();
  constructor(private http: HttpClient) {
    this.isOpen = false;
  }

  change(status: boolean) {
    this.isOpen = status;
    this.statusChange.next(this.isOpen);
  }

  getObjectMeaning(word: string) {
    return this.http.get<DictionaryResp[]>(`${environment.DICTIONARY_API}/api/v2/entries/en/${word}`)
  }
}
