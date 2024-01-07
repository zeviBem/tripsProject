import { TripInterFace } from "front-trips/src/interfaces/interface";
import { useEffect, useState } from "react";
import { trpc } from "../../trpcClaient/trpcClaient";
import { Link, useParams } from "react-router-dom";

const GetByCategory = () => {
    const [dataByCategory, setDataByCategory] = useState<TripInterFace[]>([]);
    // const [tripByCategory, setTripByCategory] = useState("");
    const params = useParams<{ categoryName: string }>();

      useEffect(() => {
        const fetchData = async () => {
          try {
            if (params.categoryName) {
              console.log("Search value2:", params.categoryName);
              const res = (await trpc.getTripByCategoryName.query(
                params.categoryName
              )) as TripInterFace[];
              if (res === undefined) {
                console.error("API response is undefined:", res);
              } else {
                setDataByCategory(res);
                console.log("res:", dataByCategory);
                
              }
            }
          } catch (error) {
            console.error(
              "Error calling getTripByCategoryName query:",
              error
            );
          }
        };
    
        fetchData();
      },[]);

      useEffect(()=>{
        console.log('data',dataByCategory);
      },[dataByCategory])

    return (
        <div>
            {dataByCategory.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {dataByCategory.map((trip) => (
                    <Link to={`/getById/${trip.id}`} key={trip.id}>
                    <div
                        className="bg-white rounded-lg border shadow-md max-w-xs md:max-w-none overflow-hidden"
                        key={trip.id}
                    >
                        <img
                        className="h-56 lg:h-60 w-full object-cover"
                        src={trip.imageurl}
                        alt={trip.imagealt}
                        />
                        <p className="group-hover:opacity-60 transition duration-500 text-xl leading-5 text-gray-600 dark:text-white">
                        {trip.title}
                        </p>
                    </div>
                    </Link>
                ))}
                </div>
            )}
        </div>
    )
    
}

export default GetByCategory;