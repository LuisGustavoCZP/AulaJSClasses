class Calculadora {
    constructor()
    {
        this.operand1 = 0,
        this.operand2 = 0,
        this.operation = "soma"
    }

    setOperand1(_operand1)
    {
        if(!_operand1) console.error(`Operand1 ${_operand1} está indefinido!`);
        const n = parseFloat(_operand1);
        if(!n) console.error(`Operand1 ${_operand1} não é numbero!`);
        this.operand1 = n;
    }

    setOperand2(_operand2)
    {
        if(!_operand2) console.error(`Operand2 ${_operand2} está indefinido!`);
        const n = parseFloat(_operand2);
        if(!n) console.error(`Operand2 ${_operand2} não é numbero!`);
        this.operand2 = n;
    }

    setOperation(_operation)
    {
        console.log(_operation);
        switch (_operation) {
            case "soma": 
                break;
            case "subtração":
                break;
            case "divisão":
                break;
            case "multiplicação":
                break;
            default:
                console.error(`Operation ${_operation} não é válido!`);
                break;
        }
        this.operation = _operation;
    }

    getResult()
    {
        switch (this.operation) {
            case "soma": 
                return this.operand1+this.operand2;
            case "subtração":
                return this.operand1-this.operand2;
            case "divisão":
                if(this.operand2 == 0) {
                    console.error(`${this.operation} não pode ter operand2 com valor ${this.operand2}!`);
                    return NaN;
                }
                return this.operand1/this.operand2;
            case "multiplicação":
                return this.operand1*this.operand2;
            default:
                return undefined;
        }
    }

    clearCalculator()
    {
        this.operand1 = 0,
        this.operand2 = 0,
        this.operation = "soma"
    }
}

function UpdateVisor()
{
    let n;
    switch (calc.operation) {
        case "soma": 
            n = "+";
            break;
        case "subtração":
            n = "-";
            break;
        case "divisão":
            n = "/";
            break;
        case "multiplicação":
            n = "*";
            break;
        default:
            n = "?";
            break;
    }
    visor.innerText = `${calc.operand1} ${n} ${calc.operand2}`;
}

function SetOperand(num)
{
    alternate = !alternate;
    if(alternate)
        calc.setOperand2(num);
    else
        calc.setOperand1(num);

    UpdateVisor();
}

const visor = document.getElementById("visor");
const calc = new Calculadora();
let alternate = true;
function CreateButtons ()
{
    
    const ops = document.getElementById("ops");
    const buttons = [
        {r:"+", v: x => { calc.setOperation("soma"); UpdateVisor();}},
        {r:"-", v: x => { calc.setOperation("subtração"); UpdateVisor();}},
        {r:"/", v: x => { calc.setOperation("divisão"); UpdateVisor(); }},
        {r:"*", v: x => { calc.setOperation("multiplicação"); UpdateVisor(); }},
        {r:"=", v: x => { visor.innerText = calc.getResult(); }},
    ];
    
    buttons.forEach(button => {
        const li = document.createElement("li");
        li.innerText = button.r;
        li.onclick = button.v;
        ops.append(li);
    });

    for(let i = 0; i <= 9; i++)
    {
        const li = document.createElement("li");
        li.innerText = i;
        li.onclick = x => {SetOperand(i); };
        ops.append(li);
    }
}

CreateButtons ();