import { Button } from "./Button";
export class Machine {
    constructor(targetLights, buttons, joltage) {
        this.targetLigths = targetLights;
        this.buttons = buttons.map(bt => new Button(bt));
        this.joltage = joltage;
    }
}
//# sourceMappingURL=Machine.js.map