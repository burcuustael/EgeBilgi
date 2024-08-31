import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Character } from '../model/careacter.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';

  constructor(private http: HttpClient) {}

  getCharacter(id: number): Observable<Character> {
    return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
      map((data) => new Character(data)) // API'den gelen veriyi Character sınıfına dönüştür
    );
  }
}
