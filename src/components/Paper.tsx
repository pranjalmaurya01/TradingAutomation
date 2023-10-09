export default function Paper({ children }: { children: JSX.Element }) {
	return (
		<div className='m-1 p-2 bg-white border border-gray-200 rounded-lg shadow'>
			{children}
		</div>
	);
}
