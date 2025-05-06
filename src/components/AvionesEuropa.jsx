import { useEffect, useState } from 'react';

function PIA() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch('/api/pia')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
      })
      .then(newData => {
        setData(newData);
      })
      .catch(error => {
        setError(error.message);
      })
  };
  useEffect(() => {
    fetchData(); // Primera carga
    const intervalId = setInterval(fetchData, 10000); // Luego cada 10 segundos
    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Datos PIA</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default PIA;
