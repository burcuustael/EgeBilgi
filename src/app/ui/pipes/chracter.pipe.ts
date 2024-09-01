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

    return value.filter(
      (p) =>
        p.name.toString().includes(search) ||
        p.firstEpisodeName
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase())
    );
  }
}
