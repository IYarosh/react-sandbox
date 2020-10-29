import React from 'react';
import ReactDOM from 'react-dom';
import Input from './components/Input';

function App() {
    const handleChange = (newValue: string) => {
        console.log(newValue);
    }

    return (
        <div>
            <Input template="XX-XXX-XX-XX" onChange={handleChange} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));