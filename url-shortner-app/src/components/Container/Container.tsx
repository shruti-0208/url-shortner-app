import * as React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import { UrlData } from '../../interface/UrlData';
import axios from 'axios';
import { serverUrl } from '../../helpers/Constants';
import DataTable from '../DataTable/DataTable';

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = () => {

	const [data, setData] = React.useState<UrlData[]>([]);

	const [reload, setReload] = React.useState<boolean>(false);

	const updateReloadState = ():void => {
		setReload(true);
	};

	const fetchTableData = async () => {
		try {
			const response = await axios.get(`${serverUrl}/shorturl`);
			
			console.log("The reposne from server is", response);
			// console.log("The data is", data);

			setData(response.data);
			setReload(false);

		} catch (error) {
			console.log("Error while fetching data", error);
		}
	};

	React.useEffect(() => {
		fetchTableData();

	}, [reload]);


	return (
		<>
			<FormContainer updateReloadState = {updateReloadState} />
			<DataTable updateReloadState = {updateReloadState} data={data} />
		</>
	);
	
};

export default Container;
