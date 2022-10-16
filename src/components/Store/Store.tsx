import { Col, Row } from 'react-bootstrap';
import storeItems from '../../data/item.json';
import { StoreItem } from './StoreItem';

export const Store = () => {
	return (
		<>
			<h1>Store</h1>
			<Row md={2} xs={1} lg={3}>
				{storeItems.map((item) => {
					return (
						<Col key={item.id}>
							<StoreItem {...item}/>
						</Col>
					);
				})}
			</Row>
		</>
	);
};
