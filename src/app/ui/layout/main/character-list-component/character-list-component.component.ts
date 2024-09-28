import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/character.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CharacterPipe } from '../../../pipes/character.pipe';
import Fuse from 'fuse.js';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list-component',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, NgxPaginationModule,RouterModule],
  templateUrl: './character-list-component.component.html',
  styleUrl: './character-list-component.component.css',
  providers: [CharacterPipe],
})
export class CharacterListComponentComponent implements OnInit {
  search: string = '';
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  currentPage = 1;
  pageSize = 6;
  totalCharacters = 0;
  suggestionMessage: string = '';
  // fuseOptions: Fuse.IFuseOptions<Character> = {
  //   keys: ['name'],
  //   threshold: 0.3,
  // };
  fuse!: Fuse<Character>;

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getAllCharacters().subscribe((data) => {
      this.characters = data.results;
      this.totalCharacters = data.info.count;
      this.filteredCharacters = this.characters;
    });
  }

  pageChanged(event: number): void {
    this.currentPage = event;
  }

  filterCharacters(): void {
    if (this.search) {
      const result = this.fuse.search(this.search);
      this.filteredCharacters = result.map((res) => res.item);

      if (this.filteredCharacters.length === 0) {
        const closestMatch = this.findClosestMatch(
          this.characters,
          this.search
        );
        this.suggestionMessage = `Üzgünüm, aradığınız kelime "${closestMatch}" mi?`;
      } else {
        this.suggestionMessage = '';
      }
    } else {
      this.filteredCharacters = this.characters;
      this.suggestionMessage = '';
    }
  }

  onSearchChange(): void {
    this.filterCharacters();
  }

  findClosestMatch(characters: Character[], search: string): string {
    let closestMatch = '';
    let minDistance = Infinity;

    characters.forEach((character) => {
      const distance = this.levenshteinDistance(
        character.name.toLowerCase(),
        search.toLowerCase()
      );
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
