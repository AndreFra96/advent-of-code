import { Button } from "./Button";
import { ButtonsTree } from "./ButtonsTree";

export class Machine {
    targetLigths: boolean[]
    buttons: Button[]
    joltage: number[]
    tree: ButtonsTree

    constructor(targetLights: boolean[], buttons: number[][], joltage: number[]) {
        this.targetLigths = targetLights;
        this.buttons = buttons.map(bt => new Button(bt))
        this.joltage = joltage
        this.tree = new ButtonsTree([])
    }

    buttonsActivity() {
        return this.buttons.map(b => b.getFilled(this.targetLigths.length))
    }

    //restituisce tutti i bottoni che influenzano l'accensione delle luci accese nel target
    involvedButtons() {
        let targetOnIndexes = this.targetLigths.map((l, idx) => l == true ? idx : null).filter(l => l != null)
        return this.buttons.filter(button => {
            for (let target of targetOnIndexes) {
                if (button.values.includes(target))
                    return true
            }
            return false;
        })
    }


    buttonsSequencesToTarget(maxDepth: number): Button[] {
        //Costruisco l'albero
        // const involvedButtons = this.involvedButtons()
        this.tree.setValues(this.buttons)
        this.tree.startTree()
        for (let i = 0; i < maxDepth; i++) {
            const path = this.tree.pathToTarget(this.targetLigths)
            if (path != null) {
                return path
            }
            this.tree.buildTreeLevel()
        }
        return []
    }

    //Restituisce l'indice del bottone all'interno della sequenza che permette alla macchina di 
    //raggiungere il target delle luci, -1 se non lo può raggiungere
    reachTargetOnIndex(buttonsSequence: Button[]): number {
        let index = -1
        let currentSequence: boolean[] = new Array(this.targetLigths.length).fill(false)
        for (let i = 0; i < buttonsSequence.length; i++) {
            const button = buttonsSequence[i]
            currentSequence = this.mergeSequence(currentSequence, button.toBooleanSequence(this.targetLigths.length))
            if (this.compareSequence(currentSequence, this.targetLigths)) {
                return i
            }
        }
        return index
    }

    compareSequence(a: boolean[], b: boolean[]): boolean {
        if (a.length != b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }

    mergeSequence(a: boolean[], b: boolean[]): boolean[] {
        let len = a.length > b.length ? a.length : b.length
        return new Array(len).fill(false).map((_, idx) => {
            let first = a[idx] ?? false
            let second = b[idx] ?? false
            return first && second
        })
    }

    //restituisce tutti i possibili modi nei quali è possibile premere tutti
    //i bottoni uno dopo l'altro
    allButtonsSequences() {
        const involvedButtons = this.involvedButtons()
        const currentPath = involvedButtons.map((_, idx) => idx)
        console.log("permutazione di", currentPath.length, "elementi")
        const permutations = this.heapPermutation(currentPath, currentPath.length, currentPath.length)
        return permutations.map(p => p.map(b => involvedButtons[b]))
    }

    permutations(array: number[]) {
        let res = [[]];
        for (let num of array) {
            const temp = [];
            for (let arr of res) {
                for (let i = 0; i <= arr.length; i++) {
                    const newArr = [...arr];
                    newArr.splice(i, 0, num);
                    temp.push(newArr);
                }
            }
            res = temp;
        }
        return res
    }

    heapPermutation(a: number[], size: number, n: number) {
        let permutations: number[][] = []
        // if size becomes 1 then prints the obtained
        // permutation
        if (size == 1)
            permutations.push(a)
        // printArr(a, n);

        for (let i = 0; i < size; i++) {
            permutations.push(...this.heapPermutation(a, size - 1, n))

            // if size is odd, swap 0th i.e (first) and
            // (size-1)th i.e (last) element
            if (size % 2 == 1) {
                let temp = a[0];
                a[0] = a[size - 1];
                a[size - 1] = temp;
            }

            // If size is even, swap ith
            // and (size-1)th i.e last element
            else {
                let temp = a[i];
                a[i] = a[size - 1];
                a[size - 1] = temp;
            }
        }
        return permutations
    }

    toString() {
        return `Machine(\n targetLights = ${this.targetLigths.map(l => l ? '#' : '.').join('')}\n buttons =\n  ${this.buttons.map(b => b.toString()).join("\n  ")}\n joltage = ${this.joltage}\n)`
    }

}
