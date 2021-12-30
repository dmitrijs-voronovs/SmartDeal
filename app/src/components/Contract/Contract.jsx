import React from "react";
import { Info } from "./Info";
import { Tasks } from "./Tasks";
import { Actors } from "./Actors";
import { Actions } from "./Actions";
import { Col, Row, Space } from "antd";

// TODO: implement events for every state transition ??? or check how to track state change
export const Contract = ({ drizzle, drizzleState }) => {
	return (
		<div className='App'>
			<Space direction='vertical' size='middle'>
				<Row gutter={16}>
					<Col span={12}>
						<Actors drizzle={drizzle} drizzleState={drizzleState} />
					</Col>
					<Col span={12}>
						<Info drizzle={drizzle} drizzleState={drizzleState} />
					</Col>
				</Row>
				<Tasks drizzle={drizzle} drizzleState={drizzleState} />
				<Actions drizzle={drizzle} drizzleState={drizzleState} />
			</Space>
		</div>
	);
};
