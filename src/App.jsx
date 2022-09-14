import { useState, useEffect } from 'react';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { useSocket } from './hooks/useSocket';

export const App = () => {
  const [bands, setBands] = useState([]);

  const { socket, online } = useSocket('http://localhost:8080');

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      setBands(bands);
    });
  }, [socket]);

  useEffect(() => {}, [socket]);

  const votar = (e, id) => {
    e.preventDefault();

    socket.emit('votar-band', id);
  };

  const borrarBanda = (e, id) => {
    e.preventDefault();

    console.log(id);

    socket.emit('borrar-band', id);
  };

  const cambiarNombre = (id, nombre) => {
    console.log(id, nombre);
    socket.emit('cambiar-nombre', { id, nombre });
  };

  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service status:
          {online ? (
            <span className='ms-2 text-success'>Online</span>
          ) : (
            <span className='ms-2 text-danger'>Offline</span>
          )}
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />

      <div className='row'>
        <div className='col-8'>
          <BandList
            bands={bands}
            votar={votar}
            borrarBanda={borrarBanda}
            cambiarNombre={cambiarNombre}
          />
        </div>
        <div className='col-4'>
          <BandAdd />
        </div>
      </div>
    </div>
  );
};
