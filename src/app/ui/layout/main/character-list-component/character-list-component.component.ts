import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/careacter.model';
import { forkJoin } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list-component',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './character-list-component.component.html',
  styleUrl: './character-list-component.component.css',
})
export class CharacterListComponentComponent implements OnInit {
  characters: Character[] = [];

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    const characterIds = [168, 256, 314, 644, 684, 787]; // İlk 6 karakterin ID'lerini buraya yazın
    const requests = characterIds.map((id) =>
      this.characterService.getCharacter(id)
    );

    forkJoin(requests).subscribe(
      (results: Character[]) => {
        this.characters = results;
      },
      (error) => {
        console.error('Hata oluştu:', error);
      }
    );
    debugger;
  }
}
