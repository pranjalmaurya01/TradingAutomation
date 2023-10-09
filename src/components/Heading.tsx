import Paper from './Paper';

export default function Heading({ heading }: { heading: string }) {
	return (
		<Paper>
			<h5 className='text-xl font-bold tracking-tight text-gray-900 p-1'>
				{heading}
			</h5>
		</Paper>
	);
}
