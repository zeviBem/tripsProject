

export interface Profile {
    id: number
    firstName: string
    lastName: string
    img: string
}

const Child = (props: Profile) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="w-full bg-white rounded-lg p-12 flex flex-col justify-center items-center" key={props.id}>
            <div className="mb-8">
                <img className="object-center object-cover rounded-full h-36 w-36" src={props.img} alt="photo" />
            </div>
            <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">{props.firstName}  {props.lastName}</p>
            </div>
        </div>
    </div>
    )
}
export default Child