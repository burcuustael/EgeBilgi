import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchTerm: string = '';
  constructor(private router: Router) {}

  onSearch(): void {
    if (this.searchTerm.trim(){
      this.router.navigate(['/search-results'], { queryParams: { q: this.searchTerm } });
    } 
  
  }
}
