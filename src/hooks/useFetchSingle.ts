import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchSingle = () => {
  const [data, setData] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSingle = async (id: string | undefined) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.dnd5eapi.co/api/equipment/${id}`
      );
      setData(response.data);
    } catch (error) {
      const isError = axios.isAxiosError(error);
      if (isError) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, getSingle, loading, error };
};
