'use client';
import request from '@/axios/request';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import {
	LogoutOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, message } from 'antd';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../globals.css';

const { Header, Sider, Content } = Layout;

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [collapsed, setCollapsed] = useState(false);
	const router = useRouter();
	const [state, setState] = useState<{ user: any }>({ user: null });

	useEffect(() => {
		(async () => {
			const { HttpStatusCode, status, data } = await request(
				'GET',
				'login/'
			);
			if (HttpStatusCode.OK === status) {
				setState((prev) => ({ ...prev, user: data }));
				return;
			}
			router.push('/login');
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<html lang='en'>
			<body className={inter.className}>
				<StyledComponentsRegistry>
					<Layout>
						<Sider
							className='h-screen'
							theme='light'
							trigger={null}
							breakpoint='md'
							onBreakpoint={(b) => {
								setCollapsed(b);
							}}
							collapsed={collapsed}
							collapsedWidth='0'
						>
							<div className='demo-logo-vertical' />
							<Menu
								mode='inline'
								defaultSelectedKeys={['0']}
								items={[
									{
										key: '0',
										icon: <UserOutlined />,
										label: 'Trading Accounts',
									},
								]}
							/>
						</Sider>
						<Layout>
							<Header
								style={{
									backgroundColor: 'white',
									padding: '8px',
								}}
								className='flex flex-col justify-center w-full'
							>
								<div className='flex justify-between items-center'>
									<Button
										type='text'
										icon={
											collapsed ? (
												<MenuUnfoldOutlined />
											) : (
												<MenuFoldOutlined />
											)
										}
										onClick={() => setCollapsed(!collapsed)}
										style={{
											fontSize: '5px',
											width: 35,
											height: 35,
										}}
									/>
									<div className='flex justify-between items-center'>
										<p className='mr-1'>
											{state.user?.username}
										</p>
										<Button
											type='text'
											icon={<LogoutOutlined />}
											onClick={async () => {
												const {
													HttpStatusCode,
													status,
												} = await request(
													'GET',
													'logout/'
												);
												if (
													HttpStatusCode.OK === status
												) {
													message.success(
														'Logged Out Successfully'
													);
													router.push('/login');
													return;
												}
											}}
											style={{
												fontSize: '5px',
												width: 35,
												height: 35,
											}}
										/>
									</div>
								</div>
							</Header>
							<Content>{children}</Content>
						</Layout>
					</Layout>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
