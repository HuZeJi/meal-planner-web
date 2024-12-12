import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent {

  @Output() public goTo = new EventEmitter<number>();
  public currentMenuIndex = 0;

  public onGoTo( menuIndex: number ): void { 
    this.currentMenuIndex = menuIndex;
    this.goTo.emit( menuIndex ); 
  }
}
