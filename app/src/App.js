import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import { Col, ConfigProvider, Layout, Row, Space, Spin } from "antd";
import React from "react";
import drizzleOptions from "./drizzleOptions";
import MyComponent from "./MyComponent";
// import "./App.css";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";

const drizzle = new Drizzle(drizzleOptions);
console.log(drizzle);

const App = () => {
	return (
		<Layout>
			<div
				style={{
					margin: "3rem auto",
					maxWidth: "1000px",
					padding: "1rem",
					justifyContent: "center",
				}}
			>
				<Layout.Content>
					<Title style={{ textAlign: "center" }}>Smart Deal</Title>
					<DrizzleContext.Provider drizzle={drizzle}>
						<DrizzleContext.Consumer>
							{(drizzleContext) => {
								const { drizzle, drizzleState, initialized } = drizzleContext;
								if (!initialized) {
									return (
										<Row justify='center' style={{ marginTop: "10vh" }}>
											<Col>
												<Space align='center'>
													<Spin size='large' tip='Loading...'></Spin>
												</Space>
											</Col>
										</Row>
									);
								}
								return (
									<MyComponent drizzle={drizzle} drizzleState={drizzleState} />
								);
							}}
						</DrizzleContext.Consumer>
					</DrizzleContext.Provider>
				</Layout.Content>
			</div>
			<Layout.Footer style={{ textAlign: "right" }}>
				Developer by Dmitrijs Voronovs | dv18034
			</Layout.Footer>
		</Layout>
	);
};

export default App;
