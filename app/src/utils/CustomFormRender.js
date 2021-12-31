import {Button, Form, Input, Rate} from "antd";
import React from "react";
import {contractStateEnum, getContractState} from "./ContractStates";
import {getEth, getWei} from "./getEthValue";

const renderFormField = (state, inputTypes, labels, handleInputChange, stateIdx, drizzle, handleSubmit) => ({name}, i) => {
    const isRatingField = name === 'rating';
    const isAmountField = name === "amount"
    return (
        <>
            {isAmountField && <Input
                name={name}
                value={state[name]}
                type={inputTypes[i]}
                hidden
            />}
            <Form.Item
                name={name}
                key={name}
                label={labels?.[i] ?? name}
                rules={[{required: true}]}
            >
                {isRatingField && (
                    <Rate
                        onChange={(value) =>
                            handleInputChange({
                                target: {
                                    value,
                                    name,
                                },
                            })}
                        disabled={getContractState(stateIdx) === contractStateEnum.Done}
                    />
                )}
                {isAmountField && (
                    <Input
                        name={"amountWithEth"}
                        value={getEth(drizzle, state[name])}
                        min={0}
                        step={0.01}
                        onChange={(e) =>
                            handleInputChange({
                                target: {
                                    name,
                                    value: getWei(drizzle, e.target.value)
                                }
                            })}
                        onPressEnter={handleSubmit}
                        type={inputTypes[i]}
                    />)}
                {!isRatingField && !isAmountField && (
                    <Input
                        name={name}
                        value={state[name]}
                        onChange={handleInputChange}
                        onPressEnter={handleSubmit}
                        type={inputTypes[i]}
                    />
                )}
            </Form.Item>
        </>
    );
};

export const customFormRender =
    (text, {stateIdx, drizzle, labels} = {}) =>
        ({handleInputChange, handleSubmit, inputTypes, inputs, state}) =>
            (
                <Form
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                >
                    {inputs.map(renderFormField(state, inputTypes, labels, handleInputChange, stateIdx, drizzle, handleSubmit))}
                    <Form.Item wrapperCol={{offset: 6, span: 14}}>
                        <Button type='primary' htmlType='submit' onClick={handleSubmit}>
                            {text}
                        </Button>
                    </Form.Item>
                </Form>
            );
