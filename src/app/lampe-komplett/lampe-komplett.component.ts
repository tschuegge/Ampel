import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Mögliche Lösung der Lampe (mit allen Zusatzaufgaben)
 */
@Component({
  selector: 'app-lampe-komplett',
  templateUrl: './lampe-komplett.component.html'
})
export class LampeKomplettComponent {

  /**
   * Gibt an, ob die Lampe defekt ist
   */
  defekt = false;

  /**
   * Private Instanzvariable in der der Wert der Eigenschaft "lampeBrennt" gespeichert wird
   * (da die Eigenschaft mit "getter" und "setter" überschrieben wird)
   */
  private _lampeBrennt = false;

  /**
   * Eigenschaft die angibt ob die Lampe brennt
   */
  @Input() // @Input ermöglicht, dass der Wert von der übergeordneten Component gesetzt werden kann (Property Binding)
  public get lampeBrennt(): boolean {
    return this._lampeBrennt;
  }
  public set lampeBrennt(value: boolean) {
    if (!this.defekt) { // nur wenn die Lampe nicht kaputt ist, kann sie ein- oder ausgeschaltet werden
      this._lampeBrennt = value;

      // Berechnen ob die Lampe kaputt geht
      if (this._lampeBrennt) {
        const zufallszahl = Math.ceil(Math.random() * 100); // Zufallszahl von 1 - 100 generieren
        if (zufallszahl <= 5) {
          // mit einer Wahrscheinlichkeit von 5% geht die Lampe kaputt
          this.defekt = true;
          this._lampeBrennt = false;
          this.gingDefekt.emit(this); // "gingDefekt"-Event feuern und Referenz auf die eigene Lampe mitgeben (da diese defekt ist)
        }
      }
    }
  }

  /**
   * Event welches gefeuert wird, wenn die Lampe kaputt ging.
   * Der EventEmitter transportiert ein Objekt des Typs "LampeKomplettComponent", damit im Event eine Referenz auf die
   * kaputte Lampe mitgegeben werden kann
   */
  @Output() gingDefekt = new EventEmitter<LampeKomplettComponent>();

  /**
   * Gibt an, ob die Steuerung (Schaltflächen) ausgeblendet sein soll
   */
  @Input() steuerungAusblenden = false;

  /**
   * Eigenschaft die angibt in welcher Farbe die Lampe leuchten soll
   */
  @Input()
  lampenFarbe = 'yellow';

  /**
   * Eigenschaft die angibt welche Farbe der Kreis gerade hat
   */
  // kreisFarbe = 'black'; // Die "kreisFarbe" wird nicht benötigt, da direkt "lampeBrennt" im HTML-Template ausgewertet wird

  /**
   * Methode die aufgerufen wird, wenn der Lichtschalter gedrückt wird
   */
  lichtschalterGedrueckt(): void {
    this.lampeBrennt = !this.lampeBrennt; // Status wird "umgedreht", false wird zu true und umgekehrt
  }

  /**
   * Repariert die Lampe
   */
  reparieren(): void {
    this.defekt = false;
  }

}
