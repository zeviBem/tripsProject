import React, { useEffect, useState } from "react";
import Child, { Profile } from "../localState/Chaild"
import { Data } from "../data/date";

const Father = () => {
    const [profile, setProfile] = useState<Profile[]>([]);

   useEffect(() => {
        setProfile(Data);
    })
    return (
        <div>
            {profile.map((person) => (
                <Child
                    key={person.id}  // Added key prop for each Child component
                    id={person.id}
                    img={person.img}
                    firstName={person.firstName}
                    lastName={person.lastName}
                />
            ))}
        </div>
    );
};

export default Father;
