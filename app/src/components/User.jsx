import {Space, Typography} from "antd";
import React from "react";
import {newContextComponents} from "@drizzle/react-components";
import {getEthValue} from "../utils/getEthValue";

const { AccountData } = newContextComponents;
const { Text } = Typography;

export const User = ({ drizzle, drizzleState, idx }) => {
	return (
		<AccountData
			drizzle={drizzle}
			drizzleState={drizzleState}
			accountIndex={idx}
			precision={3}
			render={({ address, balance }) => (
				<Space direction='vertical'>
					<Text>{address}</Text>
					<Text>
						{getEthValue(drizzle, balance)}
					</Text>
				</Space>
			)}
		/>
	);
};
