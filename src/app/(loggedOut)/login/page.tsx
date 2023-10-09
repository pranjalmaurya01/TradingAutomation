'use client';

import request from '@/axios/request';
import { Button, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';

type FieldType = {
	username?: string;
	password?: string;
};

export default function Home() {
	const router = useRouter();
	const [messageApi, contextHolder] = message.useMessage();

	const onFinish = async (values: any) => {
		const { HttpStatusCode, status, data } = await request(
			'POST',
			'login/',
			{},
			values
		);
		if (HttpStatusCode.OK === status) {
			router.push('/');
			return;
		}
		if (HttpStatusCode.BAD_REQUEST === status) {
			messageApi.open({
				type: 'warning',
				content: data.msg,
			});
			return;
		}
		messageApi.open({
			type: 'error',
			content: 'Some error occurred. Please try again later.',
		});
	};

	return (
		<div className='flex justify-center items-center h-screen'>
			{contextHolder}
			<div className=''>
				<Form name='basic' onFinish={onFinish}>
					<Form.Item<FieldType>
						label='Username'
						name='username'
						rules={[
							{
								required: true,
								message: 'Please input your username!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item<FieldType>
						label='Password'
						name='password'
						rules={[
							{
								required: true,
								message: 'Please input your password!',
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item className='flex justify-center'>
						<Button type='primary' htmlType='submit'>
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}
