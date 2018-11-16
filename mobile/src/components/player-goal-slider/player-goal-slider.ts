import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'player-goal-slider',
  templateUrl: 'player-goal-slider.html'
})
export class PlayerGoalSliderComponent {
  @Input('player') player: object;
  @Input('direction') direction: string;
  @Output() scored = new EventEmitter<{player: string, own: boolean}>();
  @ViewChild(Slides) slides: Slides;


  constructor() {}

  slideChanged() {
    if (this.slides.getActiveIndex() == 1) return;
    this.goal(this.player, this.isGoal());
    setTimeout(() => {
      this.slides.slideTo(1, 500);
    }, 1000);
  }

  goal(player, own = false) {
    this.scored.emit({player: player, own: own});
  }

  isGoal() {
    let currentIndex = this.slides.getActiveIndex();
    return (this.direction == 'right' && currentIndex == 2) || (this.direction == 'left' && currentIndex == 0)
  }

  leftText() {
    if(this.direction == 'left'){
      return 'Own Goal :('
    }
    if(this.direction == 'right'){
      return 'Goal!'
    }
  }

  rightText() {
    if(this.direction == 'right'){
      return 'Own Goal :('
    }
    if(this.direction == 'left'){
      return 'Goal!'
    }
  }

  goalTouched(direction) {
    if(direction == 'left'){
      this.slides.slideTo(2, 500);
    }
    if(direction == 'right'){
      this.slides.slideTo(0, 500);
    }
  }

}
