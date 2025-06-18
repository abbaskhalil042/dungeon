import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchSingle } from "../../hooks/useFetchSingle";

interface Idetails {
  index?: string;
  name: string;
  equipment_category: { name: string };
  gear_category: { name: string };
  weight: number;
}
const DetailsComponent = () => {
  const index = useParams().index;
  //*custom hook for fetching single data
  const { data, loading, error, getSingle } = useFetchSingle();
  // const [details, setDetails] = useState<Idetails | null>(null);
  const [details, setDetails] = useState<Idetails | null>(null);

  // setDetails(data);
  console.log(details);

  // const fetchDetails = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(
  //       `https://www.dnd5eapi.co/api/equipment/${index}`
  //     );
  //     console.log(response.data.equipment_category.name);
  //     console.log(response.data);
  //     setDetails(response.data);
  //   } catch (error) {
  //     const isAxiosError = axios.isAxiosError(error);
  //     if (isAxiosError) {
  //       setError(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  useEffect(() => {
    getSingle(index);
  }, [index]);
  useEffect(() => {
    if (data) {
      setDetails(data);
    }
  }, [data]);

  if (!details) return <h1>No data</h1>;
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <div className="w-full h-[100vh] flex flex-col  items-center gap-5">
      {/* <h1>{details?.equipment_category.name ?? ""}</h1> */}
      <div>
        <h1 className="text-2xl text-left font-bold">{details?.name ?? ""}</h1>
      </div>
      <div className="list-equipment w-full flex justify-between items-center flex-col">
        <table className="w-full table-fixed text-center">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2 bg-slate-500">
                Equipment Category
              </th>
              <th className="border border-gray-300 p-2 bg-slate-500">
                Gear Catetory
              </th>
              <th className="border border-gray-300 p-2 bg-slate-500">
                weight
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">
                {details?.equipment_category?.name ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {details?.gear_category?.name ?? "-"}
              </td>
              <td className="border border-gray-300 p-2">
                {details?.weight ?? "-"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsComponent;
