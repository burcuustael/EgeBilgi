import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../layout/main/model/character.model';

@Pipe({
  name: 'character',
  standalone: true,
})
export class CharacterPipe implements PipeTransform {
  transform(characters: Character[], search: string): Character[] {
    if (!search) {
      return characters;
    }
    return characters.filter(character =>
      character.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  findClosestMatch(characters: Character[], search: string): string {
    let closestMatch = '';
    let minDistance = Infinity;

    characters.forEach(character => {
      const distance = this.levenshteinDistance(character.name.toLowerCase(), search.toLowerCase());
      if (distance < minDistance) {
        minDistance = distance;
        closestMatch = character.name;
      }
    });

    return closestMatch;
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
}