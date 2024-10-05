import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { SafeUrlPipe } from '../../core/pipes/safe-url.pipe';
import { IShow } from '../../core/interfaces/ishow';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-show-modal',
  standalone: true,
  imports: [SafeUrlPipe, NgIf],
  templateUrl: './show-modal.component.html',
  styleUrl: './show-modal.component.css'
})
export class ShowModalComponent {
  @Input() youtubeUrl!: string;
  @Input() movie!: IShow;
  
  @Output() close = new EventEmitter<void>();

  

  private clickOutsideListener!: (event: KeyboardEvent) => void;

  ngOnInit(): void {
    // Add event listener for Escape key
    this.addEscapeKeyListener();
  }

  ngOnDestroy(): void {
    // Clean up event listener
    this.removeEscapeKeyListener();
  }

  closeModal() {
    this.close.emit();
  }

  private addEscapeKeyListener() {
    this.clickOutsideListener = (event: KeyboardEvent) => {
      if (event?.key === 'Escape') {
        this.closeModal();
      }
    };
    document.addEventListener('keydown', this.clickOutsideListener);
  }

  private removeEscapeKeyListener() {
    document.removeEventListener('keydown', this.clickOutsideListener);
  }

  // // Close modal when clicking outside
  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   if (target.closest('.modal-container') === null) {
  //     this.closeModal();
  //   }
  // }
}
