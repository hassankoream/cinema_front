import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-arrowtop',
  standalone: true,
  imports: [NgIf],
  templateUrl: './arrowtop.component.html',
  styleUrl: './arrowtop.component.css'
})
export class ArrowtopComponent {
  isButtonVisible = false;
  goToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // For a smooth scrolling effect
    });
  }
  // Listen to the window scroll event
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  
    // Check if the user has scrolled past 100vh (100% of the viewport height)
    if (scrollPosition > window.innerHeight) {
      this.isButtonVisible = true;
    } else {
      this.isButtonVisible = false;
    }
  }

}
