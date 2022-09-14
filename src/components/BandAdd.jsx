import { useState } from 'react';
import { useSocket } from '../hooks/useSocket';

export const BandAdd = () => {
  const [valor, setValor] = useState('');
  const { socket } = useSocket('http://localhost:8080');

  const nuevaBanda = (nombre) => {
    console.log(nombre);

    socket.emit('nueva-band', nombre);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (valor.trim().length > 0) {
      nuevaBanda(valor);
      setValor('');
    }
  };

  return (
    <>
      <h6>Agregar Banda</h6>
      <form onSubmit={onSubmit}>
        <input
          className='form-control'
          placeholder='Nuevo nombre de banda'
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  );
};
