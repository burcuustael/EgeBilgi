import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { Character, CharacterApiResponse } from '../model/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character/';
  private allCharacters: any[] = [];

  constructor(private http: HttpClient) {}

  getAllCharacters(): Observable<CharacterApiResponse> {
    return this.http.get<CharacterApiResponse>(this.apiUrl).pipe(
      map((data) => {
        this.allCharacters = data.results.map(
          (result) => new Character(result)
        );
        return data;
      })
    );
  }

  getRandomCharacterIds(count: number): number[] {
    if (this.allCharacters.length === 0) {
      throw new Error('Karakterler henüz yüklenmedi');
    }

    const shuffled = [...this.allCharacters].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map((character: any) => character.id);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
      switchMap((data) => {
        const character = new Character(data);

        const firstEpisodeUrl = data.episode[0];

        return this.http.get<any>(firstEpisodeUrl).pipe(
          map((episode) => {
            character.firstEpisodeName = episode.name;
            return character;
          })
        );
      })
    );
  }
}
