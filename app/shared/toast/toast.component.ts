import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent {
  @Input() message = { body: '', type: '' };

  setMessage(body: any, type: any, time = 3000) {
    this.message.body = body;
    this.message.type = type;
    setTimeout(() => { this.message.body = ''; }, time);
  }
}
