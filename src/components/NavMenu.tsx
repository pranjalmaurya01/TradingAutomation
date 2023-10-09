import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

export default function NavMenu() {
	return (
		<Menu
			mode='inline'
			defaultSelectedKeys={['0']}
			items={[
				{
					key: '0',
					icon: <UserOutlined />,
					label: 'Trading Account',
				},
			]}
		/>
	);
}
