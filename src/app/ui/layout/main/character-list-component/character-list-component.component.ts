import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/character.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CharacterPipe } from '../../../pipes/chracter.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-character-list-component',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    CharacterPipe,
    FormsModule,
    NgxPaginationModule,
  ],
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
      this.characters = data.results;
      this.totalCharacters = data.info.count;
      this.filteredCharacters = this.characters;
    });
  }

  pageChanged(event: number): void {
    this.currentPage = event;
  }
}
