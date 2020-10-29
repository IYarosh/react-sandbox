import React, { useState, useEffect, useRef } from 'react';
import './styles.scss';

type InputProps = {
  template: string,
  initialValue?: string,
  onChange: Function,
}

function getCountOfSymbol(value: string, symbol: string): number {
  let result: number = 0;
  for (let char of value) {
    if (char === symbol) {
      result++;
    }
  }
  return result;
}

export default function Input(props: InputProps) {
  const { template, initialValue = '', onChange } = props;
  const [value, setValue] = useState<string>(initialValue);
  const componentMounted = useRef(false);

  // Please keep order of useEffect. useEffect without params ([]) should be after this one with [value].
  // Or refactor mounting of element
  useEffect(() => {
    if (componentMounted.current) {
      onChange(value);
    }
  }, [value])

  useEffect(() => {
    componentMounted.current = true;
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSymbol = (event.nativeEvent as InputEvent).data;

    const wantToRemoveSymbol = newSymbol === null;
    if (wantToRemoveSymbol) {
      setValue(value.slice(0, -1));
    } else {
      const isNumber = !isNaN(+newSymbol);
      if (!isNumber) {
        return;
      }
      const templateHasFreePlace = getCountOfSymbol(template, 'X') > value.length;
      if (templateHasFreePlace) {
        setValue((prevValue) => newSymbol ? prevValue + newSymbol : prevValue.slice(0, -1));
      }
    }
  }

  const convertValueToTemplate = (value: string, template: string) => {
    if (!value) {
      return null;
    }

    while (template.includes('X') && value.length > 0) {
      const indexOfX = template.indexOf('X');
      template = template.replace('X', value[0]);
      value = value.slice(1);

      if (value.length === 0) {
        template = template.slice(0, indexOfX + 1);
      }
    }
    return template;
  } 

  return <input size={15} placeholder={template} value={convertValueToTemplate(value, template)} onChange={handleInputChange}/>
}