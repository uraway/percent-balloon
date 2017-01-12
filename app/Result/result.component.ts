import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-result',
  templateUrl: 'result.component.html'
})
export class ResultComponent {
  score = localStorage.getItem('score');
}
