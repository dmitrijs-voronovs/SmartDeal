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
				<Row>
					<Col span={12}>
						<Space>
							<Actors drizzle={drizzle} drizzleState={drizzleState} />
						</Space>
					</Col>
					<Col span={12}>
						<Space>
							<Info drizzle={drizzle} drizzleState={drizzleState} />
						</Space>
					</Col>
				</Row>
				<Tasks drizzle={drizzle} drizzleState={drizzleState} />
				<Actions drizzle={drizzle} drizzleState={drizzleState} />
			</Space>
		</div>
	);
};
