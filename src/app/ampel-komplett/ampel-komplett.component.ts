import { Component, Input } from '@angular/core';
import { LampeKomplettComponent } from '../lampe-komplett/lampe-komplett.component';

@Component({
  selector: 'app-ampel-komplett',
  templateUrl: './ampel-komplett.component.html',
  styleUrls: ['./ampel-komplett.component.scss']
})
export class AmpelKomplettComponent {

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
   * Gibt an ob eine Lampe defekt ist
   */
  lampeDefekt = false;

  /**
   * Array mit den defekten Lampen
   * (es muss ein Array sein, da per Zufall mehrere Lampen defekt sein können)
   */
  lampenDefektArray: Array<LampeKomplettComponent> = [];

  /**
   * Notfallmodus, lässt die Ampel gelb blinken
   */
  @Input() notfallmodus = false;

  /**
   * Handel für den Automodus-Interval, für eine spätere Deaktivierung
   */
  private automodusIntervalHandle = 0;

  /**
   * Private Instanzvariable in der der Wert der Eigenschaft "automodus" gespeichert wird
   * (da die Eigenschaft mit "getter" und "setter" überschrieben wird)
   */
  private _automodus = false;

  /**
   * Automatischer Modus, wenn aktiviert werden Tick's automatisch ausgelöst,
   * Lampen selbstständig repariert und die dazugehörigen Schaltflächen gewechselt.
   *
   * Interval wird beim Aktivieren des Automodus gesetzt und das Handle (vom Typ number) in einer
   * Instanzvariable gespeichert, beim Deaktivieren des Automodus wird dieser Interval wieder deaktiviert.
   * Dieser Schritt ist notwendig, da das Attribute während des Betriebs der Ampel geändert werden könnte.
   */
  @Input()
  set automodus(value: boolean) {
    this._automodus = value;
    if (this._automodus) {

      // Automodus aktivieren
      this.automodusIntervalHandle = window.setInterval(() => this.tick(), 1000); // jede Sekunde ein Tick auslösen
    } else {

      // Automodus deaktivieren (Interval Timer löschen)
      window.clearInterval(this.automodusIntervalHandle);
    }
  }
  get automodus(): boolean {
    return this._automodus;
  }

  /**
   * Schaltet die Ampel einen Zustand weiter
   */
  tick(): void {

    // *** nächsten Zustand setzen

    if (!this.notfallmodus) {

      // Normaler Modus
      this.zustand++; // Zustand um 1 erhöhen
      if (this.zustand > 4) { // Wenn der Zustand über 4 kommt...
        this.zustand = 1; // ... wieder auf 1 zurücksetzen
      }
    } else {

      // Notfallmodus
      if (this.zustand === 0) { // Wenn Ampel aus...
        this.zustand = 4; // ... Zustand "rot kommt" (also gelb) ...
      } else { // ... sonst ...
        this.zustand = 0; // ... Ampel wieder aus
      }
    }

    // *** Lampen anhand des Zustands ein- oder ausschalten

    switch (this.zustand) {
      case 0: // Ampel aus
        this.lampeRotEin = false;
        this.lampeOrangeEin = false;
        this.lampeGruenEin = false;
        break;

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

  /**
   * Wir ausgeführt wenn ein "gingDefekt"-Event einer Lampe gefeuert wurde
   * @param defekteLampe Referenz auf die defekte Lampe
   */
  lampeMeldetDefekt(defekteLampe: LampeKomplettComponent): void {
    this.lampeDefekt = true; // Flag setzen, dass Lampe defekt ist

    if (this.automodus) { // bei Automodus...
      defekteLampe.reparieren(); // Lampe reparieren
      this.lampeDefekt = false; // Defekt-Flag wieder entfernen
    } else { // ... ohne Automodus
      this.lampenDefektArray.push(defekteLampe); // Defekte Lampe zum Array für defekte Lampen hinzufügen
    }
  }

  /**
   * Alle Lampen werden repariert
   */
  repariereAlleLampen(): void {

    // Alle Referenzen auf defekte Lampen sind im Array für defekte Lampen gespeichert.
    // Sie können nacheinander repariert werden.

    for (let defekteLampe of this.lampenDefektArray) {
      defekteLampe.reparieren();
    }

    // Alle Lampen sind repariert...
    this.lampenDefektArray = []; // ... das Array für defekte Lampen kann geleert werden (durch ein neues leeres Array überschrieben werden)
    this.lampeDefekt = false; // ... das Defekt-Flag kann wieder entfernt werden
  }

}
