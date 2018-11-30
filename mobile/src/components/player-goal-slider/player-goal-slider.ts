import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { IUserPlayer } from '../../pages/game/game.interfaces';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'player-goal-slider',
  templateUrl: 'player-goal-slider.html'
})
export class PlayerGoalSliderComponent {
  @Input('player') public player: IUserPlayer;
  @Input('leaderId') private readonly leaderId: number;
  /* tslint:disable:no-unused-variable */
  @Input('goals') private readonly goals: number;
  @Input('own_goals') private readonly own_goals: number;
  /* tslint:enable:no-unused-variable */
  @Input('direction') private readonly direction: string;
  @Output() private readonly scored:EventEmitter<{player: IUserPlayer, own: boolean}> = new EventEmitter<{player: IUserPlayer, own: boolean}>();
  @ViewChild(Slides) private readonly slides: Slides;

  public slideChanged(): void {
    if (this.slides.getActiveIndex() === 1) return;
    this.goal(this.player, this.isGoal());
    setTimeout(() => {
      this.slides.slideTo(1, 500);
    }, 1000);
  }

  public leftText(): string {
    if (this.direction === 'left'){
      return 'Own Goal :(';
    }
    if (this.direction === 'right'){
      return 'Goal!';
    }
  }

  public rightText(): string {
    if (this.direction === 'right'){
      return 'Own Goal :(';
    }
    if (this.direction === 'left'){
      return 'Goal!';
    }
  }

  public goalTouched(direction: string): void {
    if (direction === 'left'){
      this.slides.slideTo(2, 500);
    }
    if (direction === 'right'){
      this.slides.slideTo(0, 500);
    }
  }

  public isLeader(player: IUserPlayer): boolean{
    return player.id === this.leaderId;
  }

  private isGoal(): boolean {
    const currentIndex = this.slides.getActiveIndex();

    return (this.direction === 'right' && currentIndex === 2) || (this.direction === 'left' && currentIndex === 0);
  }

  private goal(player: IUserPlayer, own:boolean = false): void {
    this.scored.emit({player: player, own: own});
  }

}
