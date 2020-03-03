import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/core/service/translation.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  constructor(private translationService: TranslationService) { }

  ngOnInit(): void {
  }

  public switchTo(language: string): void {
    if (language !== this.translationService.language) {
      console.log(`Have to switch from ${this.translationService.language} to ${language}`);
      this.translationService.language = language;
    }
  }

}
