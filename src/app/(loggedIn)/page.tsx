'use client';

import request from '@/axios/request';
import Heading from '@/components/Heading';
import Paper from '@/components/Paper';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popconfirm, Table, message } from 'antd';
import { useEffect, useState } from 'react';

async function getTA() {
	const { HttpStatusCode, status, data } = await request(
		'GET',
		'add_acc_zerodha/'
	);
	if (HttpStatusCode.OK === status) {
		return data;
	}
	return null;
}

export default function Home() {
	const [form] = Form.useForm();
	const ta_id = Form.useWatch('ta_id', form);

	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		updateDataSource();
	}, []);

	async function updateDataSource() {
		const x = await getTA();
		if (x !== null) {
			setDataSource(x);
		}
	}

	const onFinish = async (values: any) => {
		const { HttpStatusCode, status, data } = await request(
			ta_id ? 'PUT' : 'POST',
			`add_acc_zerodha/${ta_id && ta_id}`,
			{},
			values
		);
		if (HttpStatusCode.OK === status) {
			updateDataSource();
			message.success(data.msg);
			form.resetFields();
			return;
		}
		if (HttpStatusCode.CONFLICT === status) {
			message.info(data.msg);
			return;
		}
		message.info('Please try again later');
	};

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Account ID',
			dataIndex: 'account_id',
			key: 'account_id',
		},
		{
			title: 'Encryption Key',
			dataIndex: 'enc_key',
			key: 'enc_key',
		},
		{
			title: 'Password',
			dataIndex: 'pswrd',
			key: 'pswrd',
		},
		{
			title: 'Action',
			dataIndex: 'operation',
			render: (_: any, record: any) => (
				<>
					<Button
						icon={<EditOutlined />}
						className='mr-1 mb-1'
						onClick={() => {
							form.setFieldsValue({ ...record });
						}}
					/>
					<Popconfirm
						title='Are you sure you want to delete?'
						onConfirm={async () => {
							const { HttpStatusCode, status } = await request(
								'DELETE',
								`add_acc_zerodha/${record.ta_id}`
							);
							if (HttpStatusCode.OK === status) {
								updateDataSource();
								message.success('Successfully removed');
								return;
							}
							message.info('Please try again later');
						}}
					>
						<Button icon={<DeleteOutlined />} danger />
					</Popconfirm>
				</>
			),
		},
	];

	return (
		<div>
			<Heading heading='Add Trading Accounts' />
			<Paper>
				<Form onFinish={onFinish} layout='vertical' form={form}>
					<div className='md:grid grid-cols-2 gap-x-6 pt-4'>
						<Form.Item hidden name='ta_id'>
							<Input />
						</Form.Item>

						<Form.Item
							label='Name'
							name='name'
							rules={[
								{
									required: true,
									message: 'Please input account name!',
								},
							]}
						>
							<Input placeholder='Name' />
						</Form.Item>

						<Form.Item
							label='Account ID'
							name='account_id'
							rules={[
								{
									required: true,
									message: 'Please input Account Id!',
								},
							]}
						>
							<Input placeholder='Account ID' />
						</Form.Item>

						<Form.Item
							label='Encryption Key'
							name='enc_key'
							rules={[
								{
									required: true,
									message: 'Please input Encryption Key!',
								},
							]}
						>
							<Input placeholder='Encryption Key' />
						</Form.Item>

						<Form.Item
							label='Password'
							name='pswrd'
							rules={[
								{
									required: true,
									message: 'Please input Password!',
								},
							]}
						>
							<Input.Password placeholder='Password' />
						</Form.Item>
					</div>
					<Form.Item className='flex justify-center'>
						<Button type='primary' htmlType='submit'>
							{ta_id ? 'Update' : 'Submit'}
						</Button>
					</Form.Item>
				</Form>
			</Paper>
			<Paper>
				<div>
					<h6 className='text-lg font-bold tracking-tight text-gray-900 p-2 mb-3'>
						Trading Accounts
					</h6>
					<Table
						dataSource={dataSource}
						columns={columns}
						rowKey='ta_id'
					/>
				</div>
			</Paper>
		</div>
	);
}
