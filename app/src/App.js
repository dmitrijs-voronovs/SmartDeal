import {DrizzleContext} from "@drizzle/react-plugin";
import {Drizzle} from "@drizzle/store";
import {Layout} from "antd";
// import "./App.css";
import "antd/dist/antd.css";
import Title from "antd/lib/typography/Title";
import React from "react";
import drizzleOptions from "./drizzleOptions";
import {ContractPage} from "./components/ContractPage";
import {LoadingScreen} from "./components/LoadingScreen";

const drizzle = new Drizzle(drizzleOptions);

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
										<LoadingScreen/>
									);
								}
								return (
									<ContractPage drizzle={drizzle} drizzleState={drizzleState}/>
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
