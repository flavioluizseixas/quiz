import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;

  constructor(public navCtrl: NavController, public dataService: DataProvider) {

  }

  ionViewDidLoad() {
    this.slides.lockSwipes(true);

    this.dataService.load().then((data) => {

      
      data.map(function(question) {

        let originalOrder = question.answers;

        let rawAnswers = originalOrder;
        for (let i = rawAnswers.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          let temp = rawAnswers[i];
          rawAnswers[i] = rawAnswers[j];
          rawAnswers[j] = temp;
        }
        originalOrder = rawAnswers;
        return question;

      });
      
      console.log(data.questions);
      this.questions = data;
    });

  }

  nextSlide() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  selectAnswer(answer, question) {

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if (answer.correct) {
      this.score++;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);
  }

  restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 1000);
    this.slides.lockSwipes(true);
  }

}
