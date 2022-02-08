function Calculadora ()
{
    let operand1 = 0;
    let operand2 = 0;
    let operandI = false;
    let operandO = false;
    let operation = -1;

    let operacoes = [
        {name:"soma", symbol:"+", operation: () => operand1+operand2},
        {name:"subtração", symbol:"-", operation: () => operand1-operand2},
        {name:"divisão", symbol:"/", operation: () => 
        {
            if(operand2 == 0) 
            {
                console.error(`${operation} não pode ter operand2 com valor ${this.operand2}!`);
                return 0;
            }
            return operand1/operand2;
        }},
        {name:"multiplicação", symbol:"*", operation: () => operand1*operand2},
        {name:"potencia", symbol:"^", operation: () => Math.pow(operand1, operand2)},
        {name:"resto", symbol:"%", operation: () => operand1 % operand2},
        {name:"clean", symbol:"%", operation: () => {operand1 = 0, operand2 = 0}},
    ];

    const c = {
        setOperand1 (_operand1)
        {
            if(!_operand1) console.error(`Operand1 ${_operand1} está indefinido!`);
            const n = parseFloat(_operand1);
            if(!n) console.error(`Operand1 ${_operand1} não é numbero!`);
            operand1 = n;
        },
        setOperand2(_operand2)
        {
            if(!_operand2) console.error(`Operand2 ${_operand2} está indefinido!`);
            const n = parseFloat(_operand2);
            if(!n) console.error(`Operand2 ${_operand2} não é numbero!`);
            operand2 = n;
        },
        setOperand (value)
        {
            if(value == undefined) console.error(`Operand ${value} está indefinido!`);
            const n = parseFloat(value);
            if(n == NaN) console.error(`Operand ${value} não é numbero!`);
            if(operandI) operand2 = (operand2*10) + n;
            else operand1 = (operand1*10) + n;
            operandO = false;
        },
        setOperation: (_operation) =>
        {
            console.log(_operation, operacoes[_operation]);
            switch (_operation) {
                case "soma": 
                    operation = 0;
                    break;
                case "subtração":
                    operation = 1;
                    break;
                case "divisão":
                    operation = 2;
                    break;
                case "multiplicação":
                    operation = 3;
                    break;
                case "potencia":
                    operation = 4;
                    break;
                case "resto":
                    operation = 5;
                    break;
                default:
                    console.error(`Operation ${_operation} não é válido!`);
                    return;
            }
            
            if(!operandO)
            {
                if(!operandI) operandI = true;
                else operandI = false;
                operandO = true;
            }
        },
        getResult ()
        {
            let r = operacoes[operation].operation();
            this.clearCalculator();
            operand1 = r;
            return r;
        },
        clearCalculator()
        {
            operand1 = 0;
            operand2 = 0;
            operandI = false;
            operandO = false;
            operation = -1;
        },
        Show () {
            let n = operation > -1;
            return n && operand2 != 0 ? `${operand1} ${operacoes[operation].symbol} ${operand2}` : n ? `${operand1} ${operacoes[operation].symbol}` : operand1;
        }
    };

    return c;
}

function UpdateVisor()
{
    visor.innerText = calc.Show();
}

function SetOperand(num)
{
    calc.setOperand(num);
    UpdateVisor();
}

const visor = document.getElementById("visor");
const calc = Calculadora(0,0,"soma");
let alternate = true;
function CreateButtons ()
{
    
    const ops = document.getElementById("ops");
    const buttons = [
        {r:"+", v: x => { calc.setOperation("soma"); UpdateVisor();}},
        {r:"-", v: x => { calc.setOperation("subtração"); UpdateVisor();}},
        {r:"/", v: x => { calc.setOperation("divisão"); UpdateVisor(); }},
        {r:"*", v: x => { calc.setOperation("multiplicação"); UpdateVisor(); }},
        {r:"^", v: x => { calc.setOperation("potencia"); UpdateVisor(); }},
        {r:"%", v: x => { calc.setOperation("resto"); UpdateVisor(); }},
        {r:"=", v: x => { visor.innerText = calc.getResult(); }},
        {r:"C", v: x => { visor.innerText = calc.clearCalculator(); }},
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