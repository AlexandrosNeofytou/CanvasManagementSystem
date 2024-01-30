export class Loops
{
    static getRange(number:Number):number[]
    {
        return Array(number).fill(0).map((x,i)=>i);
    }
}