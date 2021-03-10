import { Component } from '@angular/core';

/**
 * Mögliche Minimallösung der Ampel (ohne Zusatzaufgaben)
 */
@Component({
  selector: 'app-ampel-einfach',
  templateUrl: './ampel-einfach.component.html',
  styleUrls: ['./ampel-einfach.component.scss']
})
export class AmpelEinfachComponent {

  /**
   * Zähler für den Zustand der Ampel
   * 0 = Ampel aus
   * 1 = rot
   * 2 = grün-kommt
   * 3 = grün
   * 4 = rot-kommt
   */
  private zustand = 0;

  /**
   * Zustand der roten Lampe
   */
  lampeRotEin = false;

  /**
   * Zustand der orangen Lampe
   */
  lampeOrangeEin = false;

  /**
   * Zustand der grünen Lampe
   */
  lampeGruenEin = false;

  /**
   * Schaltet die Ampel einen Zustand weiter
   */
  tick(): void {

    // Nächsten Zustand setzen
    this.zustand++; // Zustand um 1 erhöhen
    if (this.zustand > 4) { // Wenn der Zustand über 4 kommt...
      this.zustand = 1; // ... wieder auf 1 zurücksetzen
    }

    // Lampen anhand des Zustands ein- oder ausschalten
    switch (this.zustand) {

      case 1: // rot
        this.lampeRotEin = true;
        this.lampeOrangeEin = false;
        this.lampeGruenEin = false;
        break;

      case 2: // grün kommt
        this.lampeRotEin = true;
        this.lampeOrangeEin = true;
        this.lampeGruenEin = false;
        break;

      case 3: // grün
        this.lampeRotEin = false;
        this.lampeOrangeEin = false;
        this.lampeGruenEin = true;
        break;

      case 4: // rot kommt
        this.lampeRotEin = false;
        this.lampeOrangeEin = true;
        this.lampeGruenEin = false;
        break;
    }
  }

}
