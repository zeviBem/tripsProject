import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useGetTripById from '../Jotai/getTripByIdGlobal';
import angleDown from '../../images/angleDown.png';
import angleUp from '../../images/angleUp.png';
import Dialog from './Dialog';
import Messages from './Messages';
import edit from '../../images/edit.png';

const ById: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [opinion, setOpinion] = useState(false);
  const { dataById, getTripByIdGlobal } = useGetTripById();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      getTripByIdGlobal(params.id);
    }
  }, [params.id]);

  const handleClick = () => {
    navigate(`/map/${params.id}`);
  };

  return (
    <div>
      {dataById && (
        <div className="mx-auto h-screen flex items-center justify-center px-8 relative">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-50 filter blur-md z-10"
            style={{
              backgroundImage: `url(${dataById?.imageurl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          <div className="flex flex-col w-full bg-white rounded shadow-lg sm:w-3/4 md:w-1/2 lg:w-3/5 relative z-20">
            <img
              src={dataById.imageurl}
              alt={dataById.imagealt}
              className="w-full h-64 bg-top bg-cover rounded-t"
            />
            <div className="flex flex-col w-full md:flex-row">
              <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center md:w-1/4">
                <div className="md:text-3xl">activity Time</div>
                <div className="md:text-xl">{dataById.activitytime}</div>
              </div>
              <div className="p-4 font-normal text-gray-800 md:w-3/4">
                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-800">
                  {dataById.title}
                </h1>
                <p className="leading-normal">{dataById.description}</p>
                <div className="md:text-3xl">Price: {dataById.price}</div>
                <div className="w-1/2">Category: {dataById.category}</div>
                <div className="flex flex-row items-center mt-4 text-gray-700">
                  <div className="w-1/2">
                    Location: {dataById.land}, {dataById.city},{' '}
                    {dataById.street}.
                  </div>
                  <div className="w-1/2 flex justify-end" onClick={handleClick}>
                    <img
                      src="https://3.bp.blogspot.com/-UJ6C88eMABM/V6q9qzqoReI/AAAAAAAAUgE/JlHU2F-QevsTCWFhBzbhYRG_wsJbuDXYwCLcB/s1600/%25D7%259C%25D7%2595%25D7%25A0%25D7%2593%25D7%2595%25D7%259F.gif"
                      alt={dataById.imagealt}
                      className="w-12 hover:cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-2 flex justify-between">
              <div>
                <Link to={`/editTripById/${dataById.id}`}>
                  <img src={edit} className="w-10" />
                </Link>
              </div>
              <div className="bg-gray-200 w-[400px]">
                {!opinion ? (
                  <>
                    <img
                      src={angleDown}
                      className="w-8 mx-auto"
                      onClick={() => setOpinion(true)}
                    />
                  </>
                ) : (
                  <>
                    <Messages />
                    <img
                      src={angleUp}
                      className="w-8 mx-auto"
                      onClick={() => setOpinion(false)}
                    />
                  </>
                )}
              </div>
              <div>
                <button
                  data-ripple-light="true"
                  data-dialog-target="dialog"
                  className="middle none center rounded-lg bg-gradient-to-tr from-green-600 to-green-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={() => setOpen(true)}
                >
                  Add Opinion
                </button>
              </div>
              <div>
                <Dialog model={open} setModel={setOpen} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ById;
