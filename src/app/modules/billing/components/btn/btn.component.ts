import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html'
})
export class BtnComponent {
  @Input() typeBtn: 'button'|'reset'|'submit' = 'button';
  @Input() color = 'primary';

  /*ngOnInit(): void {
  }*/

  get colors(){
    return{
      'bg-success-700' : this.color === 'success',
      'hover:bg-success-800' : this.color === 'success',
      'focus:ring-success-300' : this.color === 'success',
      'bg-primary-700' : this.color === 'primary',
      'hover:bg-primary-800' : this.color === 'primary',
      'focus:ring-primary-300' : this.color === 'primary',
      'bg-danger-700' : this.color === 'danger',
      'hover:bg-danger-800' : this.color === 'danger',
      'focus:ring-danger-300' : this.color === 'danger',
    }
  }
}
