import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../layout/main/model/character.model';

@Pipe({
  name: 'character',
  standalone: true,
})
export class CharacterPipe implements PipeTransform {
  transform(value: Character[], search: string): Character[] {
    if (!search) {
      return value;
    }

    const lowerCaseSearch = search.toLocaleLowerCase();

    return value.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerCaseSearch) ||
        p.firstEpisodeName.toLocaleLowerCase().includes(lowerCaseSearch)
    );
  }
}
