import * as React from 'react';
import { UrlData } from '../../interface/UrlData';
import { Link } from 'react-router-dom';
import { serverUrl } from '../../helpers/Constants';
import axios from 'axios';

interface IDataTableProps {
	data: UrlData[];
	updateReloadState: () => void;
}

const DataTable: React.FunctionComponent<IDataTableProps> = (props) => {
	const { data, updateReloadState } = props;
	console.log('The data in DataTable is', data);

	const renderTableData = () => {
		return data.map((item) => {
			return (
				<tr
					key={item._id}
					className='border-b text-gray-400 bg-slate-800 opacity-95 border-slate-600 hover:bg-slate-300 hover:text-gray-800 hover:bg-opacity-5'
				>
					<td className='px-6 py-3 break-words'>
						<Link
							to={item.fullUrl}
							target='_blank'
							rel='noreferer noopener'
							className='text-blue-500 hover:underline'
						>
							{item.fullUrl}
						</Link>
					</td>

					<td className='px-6 py-3 break-words'>
						<Link
							to={`${serverUrl}/shortUrl/${item.shortUrl}`}
							target='_blank'
							rel='noreferer noopener'
							className='text-blue-500 hover:underline'
						>
							{item.shortUrl}
						</Link>
					</td>

					<td className='px-6 py-3'>{item.clicks}</td>

					<td className='px-6 py-3'>
						{/* <button className='p-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-600 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-xl border border-slate-700 focus:ring-4 focus:outline-none focus:ring-sky-950'>Copy</button> */}

						<div className='flex conten-center gap-4'>
							<div
								className='flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-200 transition-all cursor-pointer'
								onClick={() => copyToClipboard(item.shortUrl)}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke-width='1.5'
									stroke='currentColor'
									class='size-6'
								>
									<path
										stroke-linecap='round'
										stroke-linejoin='round'
										d='M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z'
									/>
								</svg>
							</div>
							<div
								className='flex items-center justify-center w-8 h-8 rounded-md hover:bg-slate-200 transition-all cursor-pointer'
								onClick={() => deleteUrl(item._id)}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.5}
									stroke='currentColor'
									className='size-6'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
									/>
								</svg>
							</div>
						</div>
					</td>
				</tr>
			);
		});
	};

	const copyToClipboard = async (url: string) => {
		try {
			await navigator.clipboard.writeText(`${serverUrl}/shoartUrl/${url}`);
			alert(`URL Copied: ${serverUrl}/shoartUrl/${url}`);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUrl = async (id: string) => {
		const response = await axios.delete(`${serverUrl}/shortUrl/${id}`);
		console.log(response);
		updateReloadState();
	};

	return (
		<div className='container mx-auto pt-2 pb-10`'>
			<div className='relative overflow-x-auto shadow-sm sm:rounded-xl'>
				<table className='w-full table-fixed  text-sm text-left rtl:text-right text-gray-500'>
					<thead className='text-md uppercase text-gray-500 bg-slate-800'>
						<tr>
							<th scope='col' className='px-6 py-3 w-6/12'>
								FullUrl
							</th>

							<th scope='col' className='px-6 py-3 w-3/12'>
								ShortUrl
							</th>

							<th scope='col' className='px-6 py-3'>
								Clicks
							</th>

							<th scope='col' className='px-6 py-3'>
								Action
							</th>
						</tr>
					</thead>

					<tbody>{renderTableData()}</tbody>
				</table>
			</div>
		</div>
	);
};

export default DataTable;
