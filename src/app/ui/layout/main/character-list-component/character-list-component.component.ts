import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/character.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import Fuse from 'fuse.js';
import { RouterModule } from '@angular/router';
import { IFuseOptions } from 'fuse.js';

@Component({
  selector: 'app-character-list-component',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
  ],
  templateUrl: './character-list-component.component.html',
  styleUrl: './character-list-component.component.css',
  providers: [],
})
export class CharacterListComponentComponent implements OnInit {
  search: string = '';
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  currentPage = 1;
  pageSize = 6;
  totalCharacters = 0;
  suggestionMessage: string = '';
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
      this.fuse = new Fuse(this.characters, this.fuseOptions);
    });
  }
  fuseOptions: IFuseOptions<Character> = {
    keys: ['name'],
    threshold: 0.3,
  };

  pageChanged(event: number): void {
    this.currentPage = event;
  }

  filterCharacters(): void {
    if (this.search) {
      const result = this.fuse.search(this.search);

      if (result.length > 0) {
        const firstResult = result[0].item;
        if (
          firstResult.name.toLowerCase().includes(this.search.toLowerCase())
        ) {
          this.filteredCharacters = result.map((res) => res.item);
          this.suggestionMessage = '';
        } else {
          const closestMatch = firstResult.name;
          this.suggestionMessage = `Üzgünüm, aradığınız kelimeyi bulamadık. "${closestMatch}" mi demek istediniz?`;
          console.log(this.suggestionMessage);
        }
      } else {
        this.suggestionMessage = 'Üzgünüm, aradığınız kelimeyi bulamadık.';
        console.log(this.suggestionMessage);
      }
    } else {
      this.suggestionMessage = '';
    }
  }

  onSearchChange(): void {
    this.filterCharacters();
  }
}
