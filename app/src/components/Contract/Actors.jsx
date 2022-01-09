import { Avatar, Card, Divider, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { User } from "./User";
import React from "react";
import { userIds } from "../../utils/UserIds";
import { isMetamask } from "../../utils/isMetamask";

export function Actors(props) {
	return (
		<div>
			<Card title='Actors' style={{ wordBreak: "break-word" }}>
				{isMetamask ? (
					<>
						<Divider orientation='left' style={{ marginTop: 0 }}>
							Metamask account
						</Divider>
						<Space align='center'>
							<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
								A
							</Avatar>
							<User
								idx={0}
								drizzle={props.drizzle}
								drizzleState={props.drizzleState}
							/>
						</Space>
					</>
				) : (
					<>
						<Divider orientation='left' style={{ marginTop: 0 }}>
							Authorized consultant
						</Divider>
						<Space align='center'>
							<Avatar
								style={{ backgroundColor: "#87d068" }}
								icon={<UserOutlined />}
							/>
							<User
								idx={userIds.creator}
								drizzle={props.drizzle}
								drizzleState={props.drizzleState}
							/>
						</Space>
						<Divider orientation='left'>Agent</Divider>
						<Space align='center'>
							<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
								A
							</Avatar>
							<User
								idx={userIds.agent}
								drizzle={props.drizzle}
								drizzleState={props.drizzleState}
							/>
						</Space>
						<Divider orientation='left'>Client</Divider>
						<Space align='center'>
							<Avatar style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}>
								C
							</Avatar>
							<User
								idx={userIds.client}
								drizzle={props.drizzle}
								drizzleState={props.drizzleState}
							/>
						</Space>
					</>
				)}
			</Card>
		</div>
	);
}
