import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin, of } from 'rxjs';
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
      switchMap((data) => {
        const characterObservables = data.results.map((result) => {
          const character = new Character(result);

          const firstEpisodeUrl = result.episode?.[0];

          if (firstEpisodeUrl) {
            return this.http.get<any>(firstEpisodeUrl).pipe(
              map((episode) => {
                character.episode = episode.name;
                return character;
              })
            );
          } else {
            character.episode = 'Unknown';
            return of(character);
          }
        });

        return forkJoin(characterObservables).pipe(
          map((characters: Character[]) => {
            this.allCharacters = characters;
            return {
              info: data.info,
              results: characters,
            };
          })
        );
      })
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<any>(`${this.apiUrl}${id}`).pipe(
      switchMap((data) => {
        const character = new Character(data);

        const firstEpisodeUrl = data.episode[0];

        return this.http.get<any>(firstEpisodeUrl).pipe(
          map((episode) => {
            character.episode = episode.name;
            return character;
          })
        );
      })
    );
  }
}
