import * as React from 'react';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import bgImage from "../../assets/bg.png"; 

interface IFormContainerProps {updateReloadState: () => void}

const FormContainer: React.FunctionComponent<IFormContainerProps> = (props) => {
  const {updateReloadState} = props;
  
  const [fullUrl, setFullUrl] = React.useState<string>('');

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      await axios.post(`${serverUrl}/shorturl`, { fullUrl: fullUrl });
      
      setFullUrl('');
      updateReloadState();

    } catch (error) {
      
      console.log("Error while shortening URL", error);
    }
  };

  return (
    <div className='container mx-auto p-2'>
        <div className="my-8 bg-cover bg-center rounded-xl "
      style={{ backgroundImage: `url(${bgImage})` }}>
        <div className='w-full h-full rounded-xl p-20 backdrop-brightness-75 text-white text-center'>
        <h2 className="text-4xl font-bold p-4">URL Shortner</h2>
         <p className="text-lg pb-2 font-extralight">Enter your URL below to shorten it</p>
         <p className='pb-4 text-sm font-thin'>Free tool to shorten a URL or reduce link, Use our URL SHortner</p>
         
         <form onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-2 pointer-events-none text-slate-600 font-bold'>urlshortner.link /</div>
              
              <input type='text' placeholder='Enter your URL here' required className='block w-full p-4 text-gray-500 border-gray-300 rounded-lg bg-slate-900 focus:ring-blue-950 focus:border_blue-800 ps-35' value={fullUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullUrl(e.target.value)} />
              
              <button type='submit' className='absolute top-2 end-1 p-2.5 text-sm font-medium text-white bg-slate-800 hover:bg-slate-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-xl border border-slate-700 focus:ring-4 focus:outline-none focus:ring-sky-950'>Shorten URL</button>
            </div>
          </div>
         </form>
        </div>
      </div>
    </div>
  );
};

export default FormContainer;
