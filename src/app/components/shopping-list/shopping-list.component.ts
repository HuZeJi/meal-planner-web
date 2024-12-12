import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit {
  @Input() shoppingListMain: any;
  @Output() onClose = new EventEmitter<void>();

  public shoppingList!: any;

  constructor() { /** empty constructor */ }

  ngOnInit(): void {
    this.shoppingList = this.shoppingListMain.shoppingList;
  }

  public onCloseModal(): void {
    this.onClose.emit();
  }
}
