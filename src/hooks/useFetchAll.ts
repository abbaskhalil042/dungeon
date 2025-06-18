import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchAll = () => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipments = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://www.dnd5eapi.co/api/equipment");
      setData(response.data.results);
    } catch (error) {
      const isError = axios.isAxiosError(error);
      if (isError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, fetchEquipments, loading, error };
};
