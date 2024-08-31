import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CharacterService } from './services/character.service';
import { Character } from './model/careacter.model';
import { CharacterListComponentComponent } from './character-list-component/character-list-component.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [FormsModule, CommonModule, CharacterListComponentComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {}
