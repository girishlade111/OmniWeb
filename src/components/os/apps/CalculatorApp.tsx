"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return first / second;
      default: return second;
    }
  };

  const handleEquals = () => {
    if (operator && firstOperand !== null) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      setDisplay(String(result));
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };
  
  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };
  
  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const renderButton = (label: string, onClick: () => void, className = '') => (
    <Button
      variant="outline"
      className={`text-2xl h-16 w-16 rounded-full ${className}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground p-4">
       <div className="p-4 border-b mb-4">
        <h2 className="text-xl font-semibold">Calculator</h2>
      </div>
      <div className="flex-grow flex flex-col justify-end items-center">
        <div className="w-full text-right text-5xl font-light p-4 mb-2 bg-muted rounded-lg break-all">
          {display}
        </div>
        <div className="grid grid-cols-4 gap-2 w-full">
          {renderButton('AC', clearDisplay, 'bg-muted hover:bg-muted/80')}
          {renderButton('+/-', toggleSign, 'bg-muted hover:bg-muted/80')}
          {renderButton('%', percentage, 'bg-muted hover:bg-muted/80')}
          {renderButton('÷', () => performOperation('/'), 'bg-primary text-primary-foreground hover:bg-primary/90')}
          {renderButton('7', () => inputDigit('7'))}
          {renderButton('8', () => inputDigit('8'))}
          {renderButton('9', () => inputDigit('9'))}
          {renderButton('×', () => performOperation('*'), 'bg-primary text-primary-foreground hover:bg-primary/90')}
          {renderButton('4', () => inputDigit('4'))}
          {renderButton('5', () => inputDigit('5'))}
          {renderButton('6', () => inputDigit('6'))}
          {renderButton('-', () => performOperation('-'), 'bg-primary text-primary-foreground hover:bg-primary/90')}
          {renderButton('1', () => inputDigit('1'))}
          {renderButton('2', () => inputDigit('2'))}
          {renderButton('3', () => inputDigit('3'))}
          {renderButton('+', () => performOperation('+'), 'bg-primary text-primary-foreground hover:bg-primary/90')}
          {renderButton('0', () => inputDigit('0'), 'col-span-2 w-full')}
          {renderButton('.', inputDecimal)}
          {renderButton('=', handleEquals, 'bg-primary text-primary-foreground hover:bg-primary/90')}
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
