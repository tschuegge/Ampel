import { Component, Input } from '@angular/core';

/**
 * Mögliche Lösung der Lampe (mit allen Zusatzaufgaben, welche für die Ampel benötigt werden)
 */
@Component({
  selector: 'app-lampe-fuer-ampel-einfach',
  templateUrl: './lampe-fuer-ampel-einfach.component.html'
})
export class LampeFuerAmpelEinfachComponent {

  /**
   * Eigenschaft die angibt ob die Lampe brennt
   */
  @Input() // @Input ermöglicht, dass der Wert von der übergeordneten Component gesetzt werden kann (Property Binding)
  lampeBrennt = false;

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
   * Methode die aufgerufen wird, wenn der Lichtschalter gedrückt wird
   */
  lichtschalterGedrueckt(): void {
    this.lampeBrennt = !this.lampeBrennt; // Status wird "umgedreht", false wird zu true und umgekehrt
  }

}
