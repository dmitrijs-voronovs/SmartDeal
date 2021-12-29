import {Button, Form, Input} from "antd";
import React from "react";

export const customFormRender =
    (text) =>
        ({handleInputChange, handleSubmit, inputTypes, inputs, state}) =>
            (
                <Form
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    onSubmit={handleSubmit}
                >
                    {inputs.map(({name}, i) => (
                        <Form.Item
                            name={name}
                            key={name}
                            label={name}
                            rules={[{required: true}]}
                        >
                            {/* TODO: add special handling for rating (e.g. use <Rate />) */}
                            <Input
                                name={name}
                                value={state[name]}
                                onChange={handleInputChange}
                                onPressEnter={handleSubmit}
                                type={inputTypes[i]}
                            />
                        </Form.Item>
                    ))}
                    <Form.Item wrapperCol={{offset: 6, span: 14}}>
                        <Button type='primary' htmlType='submit' onClick={handleSubmit}>
                            {text}
                        </Button>
                    </Form.Item>
                </Form>
            );