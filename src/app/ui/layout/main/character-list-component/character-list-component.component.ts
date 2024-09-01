import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/character.model';
import { forkJoin } from 'rxjs';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CharacterPipe } from '../../../pipes/chracter.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-character-list-component',
  standalone: true,
  imports: [HttpClientModule, CommonModule, CharacterPipe, FormsModule],
  templateUrl: './character-list-component.component.html',
  styleUrl: './character-list-component.component.css',
})
export class CharacterListComponentComponent implements OnInit {
  search: string = '';
  filteredCharacters: Character[] = [];
  characters: Character[] = [];
  currentPage = 1;
  pageSize = 6;
  totalCharacters = 0;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getAllCharacters().subscribe((data) => {
      this.totalCharacters = data.info.count;
      this.fetchPage(this.currentPage);
      this.filteredCharacters = this.characters;
    });
  }

  fetchPage(page: number): void {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalCharacters);

    const randomIds = this.characterService.getRandomCharacterIds(
      this.pageSize
    );

    const requests = randomIds.map((id) =>
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
  }
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalCharacters) {
      this.currentPage++;
      this.fetchPage(this.currentPage);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchPage(this.currentPage);
    }
  }
  onSearchChange() {
    this.filteredCharacters = this.characters.filter((character) =>
      character.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
