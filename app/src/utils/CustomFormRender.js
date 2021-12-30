import { Button, Form, Input, Rate } from "antd";
import React from "react";
import { contractStateEnum, getContractState } from "./ContractStates";

export const customFormRender =
	(text, stateIdx) =>
	({ handleInputChange, handleSubmit, inputTypes, inputs, state }) =>
		(
			<Form
				labelCol={{ span: 6 }}
				wrapperCol={{ span: 14 }}
				onSubmit={handleSubmit}
			>
				{inputs.map(({ name }, i) => (
					<Form.Item
						name={name}
						key={name}
						label={name}
						rules={[{ required: true }]}
					>
						{name === "rating" ? (
							<Rate
								onChange={(value) => {
									console.log(state);
									handleInputChange({
										target: {
											value,
											name,
										},
									});
								}}
								defaultValue={state[name]}
								disabled={getContractState(stateIdx) === contractStateEnum.Done}
							/>
						) : (
							<Input
								name={name}
								value={state[name]}
								onChange={handleInputChange}
								onPressEnter={handleSubmit}
								type={inputTypes[i]}
							/>
						)}
					</Form.Item>
				))}
				<Form.Item wrapperCol={{ offset: 6, span: 14 }}>
					<Button type='primary' htmlType='submit' onClick={handleSubmit}>
						{text}
					</Button>
				</Form.Item>
			</Form>
		);
