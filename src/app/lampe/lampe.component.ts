import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-lampe',
  templateUrl: './lampe.component.html',
  styleUrls: ['./lampe.component.scss']
})
export class LampeComponent {

  /**
   * Farbe welche per Property Binding angegeben werden kann
   * Wenn das Attribute "farbe" nicht angegeben wurde, dann wird "lightgray" verwendet
   */
  @Input() farbe = 'lightgray';

  /**
   * Gibt an, ob die Lampe an ist
   * Diese Eigenschaft kann von aussen per Property Binding gesetzt werden
   */
  private _ein: boolean;
  @Input()
  public get ein(): boolean {
    return this._ein;
  }
  public set ein(v: boolean) {
    if (!this.defekt) { // nur wenn die Lampe nicht kaputt ist, kann sie ein- oder ausgeschaltet werden
      this._ein = v;

      // Berechnen ob die Lampe kaputt geht
      if (this._ein) {
        const zufallszahl = Math.ceil(Math.random() * 100); // Zufallszahl von 1 - 100 generieren
        if (zufallszahl <= 5) {
          // mit einer Wahrscheinlichkeit von 5% geht die Lampe kaputt
          this.defekt = true;
          this._ein = false;
          this.gingDefekt.emit(); // Event feuern, dass die Lampe kaputt ging
        }
      }
    }
  }

  /**
   * Gibt an, ob die Lampe defekt ist
   */
  defekt = false;

  /**
   * Event welches gefeuert wird, wenn die Lampe kaputt ging
   */
  @Output() gingDefekt = new EventEmitter<void>();

  /**
   * Gibt an, ob die Controls (Schaltfläche) ausgeblendet sein soll
   */
  @Input() controlsAusblenden = false;

  /**
   * Repariert die Lampe
   */
  reparieren(): void {
    this.defekt = false;
  }

  /**
   * Klick auf den Button "umschalten"
   */
  umschaltenClick(): void {
    this.ein = !this.ein; // Wenn Lampe an, dann aus und umgekehrt
  }

}
