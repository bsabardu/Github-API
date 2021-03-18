import axiosInstance from 'src/api';
import { useEffect, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export default (url) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosInstance.get(url)
      .then((response) => response.data)
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return [
    loading,
    items,
  ];
};
