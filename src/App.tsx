import { createFakeData } from "./services";
import { BiCurrentLocation } from "react-icons/bi";
import { AiFillCar, AiOutlineSearch } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { useIntersection } from "@mantine/hooks";

const fullData = createFakeData(1000);

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [viewItems, setViewItems] = useState<typeof fullData>([]);

  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  function filter(max: number = 10) {
    return fullData
      .filter((item) => item.placa.toLowerCase().includes(search.toLowerCase()))
      .splice(0, max);
  }

  useEffect(() => {
    setViewItems(filter());
  }, [search]);

  useEffect(() => {
    if (entry?.isIntersecting) {
      setViewItems((prev) => filter(prev.length + 10));
    }
  }, [entry]);

  return (
    <div className="flex flex-col gap-y-2 w-full sm:w-2/4 md:w-1/4 bg-white rounded-md p-2 h-[80vh]">
      <header className="flex gap-x-4">
        <AiOutlineSearch className="w-8 h-8" />
        <input
          type="text"
          placeholder="Filter vehicles"
          className="w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>
      <div
        className="flex flex-col h-full gap-y-2 md:hover:overflow-y-auto overflow-y-auto md:overflow-hidden"
        ref={containerRef}
      >
        {viewItems.map((item, idx) => (
          <div ref={idx === viewItems.length - 1 ? ref : null}>
            <Vehicle data={item} key={item.placa} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Vehicle({ data }: { data: (typeof fullData)[0] }) {
  return (
    <div className="flex justify-between gap-x-4 bg-gray-200 rounded-md p-2">
      <div className="flex gap-x-2">
        <AiFillCar className="w-10 h-10" />
        <div className="flex flex-col">
          <div className="flex gap-x-4">
            <p className="w-[80px] truncate">{data.placa}</p>
            <p>{data.status}</p>
          </div>
          <p>{data.tipo}</p>
        </div>
      </div>
      <BiCurrentLocation className="w-6 h-6" />
    </div>
  );
}

export default App;
