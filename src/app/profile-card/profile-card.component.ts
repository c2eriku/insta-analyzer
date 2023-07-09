import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profile } from '../class/profile.model';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  @Input() profile !: Profile;

  @Output() toBottomClick: EventEmitter<any> = new EventEmitter();
  @Output() toDeleteClick: EventEmitter<any> = new EventEmitter();

  toBottom() {
    this.toBottomClick.emit('');
  }

  toDelete() {
    this.toDeleteClick.emit('');
  }
}

