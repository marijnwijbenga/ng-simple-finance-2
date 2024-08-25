import { Component } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
}
