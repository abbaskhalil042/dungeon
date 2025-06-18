import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAll } from "../../hooks/useFetchAll";

interface Iequipment {
  index: string;
  name: string;
  url: string;
}
const HomeComponents = () => {
  //*custom hook for fetching all data
  const { data, fetchEquipments, loading, error } = useFetchAll();
  console.log("results data", data);
  const [equipments, setEquipments] = useState<Iequipment[]>([]);
  console.log(equipments);

  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredEquipments = () => {
    const filterData = equipments.filter((equipment) =>
      equipment.name.toLowerCase().includes(search.toLowerCase())
    );
    if (search === "") {
      fetchEquipments();
    }
    if (filterData.length === 0) {
      fetchEquipments();
    }
    setEquipments(filterData);
    setSearch("");
  };
  // const fetchEquipments = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get("https://www.dnd5eapi.co/api/equipment");
  //     console.log(response.data);
  //     setEquipments(response.data.results);
  //   } catch (error) {
  //     console.log(error);
  //     const isAxiosError = axios.isAxiosError(error);
  //     if (isAxiosError) {
  //       setError(error.message);
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (data) {
      setEquipments(data);
    }
  }, [data]);

  useEffect(() => {
    fetchEquipments();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>Loading...</h1>
      </div>
    );
  if (!equipments)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>No equipments</h1>
      </div>
    );
  if (error) return <h1>{error}</h1>;
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <div className="input-search w-[50%] flex justify-center mt-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 border  rounded-md "
          onChange={handleSearch}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              filteredEquipments();
            }
          }}
          value={search}
        />
        <button
          onClick={filteredEquipments}
          className="p-2 rounded-md bg-blue-700 m-1"
        >
          Search
        </button>
      </div>

      {/* table */}
      <div className="list-equipment w-full flex justify-center items-center m-2">
        <table className="table-fixed w-[50%] text-center">
          <thead>
            <tr className="">
              <th className="border border-gray-300 p-2 bg-slate-500">
                Equipment
              </th>
              <th className="border border-gray-300 p-2 bg-slate-500">
                Description
              </th>
            </tr>
          </thead>

          <tbody>
            {/* <tr> */}
            {equipments.map((equipment) => (
              <tr key={equipment.index}>
                <td className="border border-gray-300 p-2">{equipment.name}</td>
                <td className="border border-gray-300 p-2">
                  <Link
                    //   https://www.dnd5eapi.co/api/equipment/abacus
                    to={`/equipment/${equipment.index}`}
                    className="px-3 py-1 rounded-md
                     bg-blue-700  "
                  >
                    View
                  </Link>
                </td>
                {/* <td>{equipment.url}</td> */}
              </tr>
            ))}
            {/* </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomeComponents;
