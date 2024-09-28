import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../services/character.service';
import { Character } from '../model/character.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  characterId: number | undefined;
  character!: Character;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.characterId = +params.get('id')!;
      this.loadCharacterDetails();
    });
  }

  loadCharacterDetails(): void {
    if (this.characterId) {
      this.characterService.getCharacter(this.characterId).subscribe((data) => {
        this.character = data;
      });
    }
  }
}
