import {Col, Row, Space, Spin} from "antd";
import React from "react";

export function LoadingScreen() {
    return <Row justify="center" style={{marginTop: "10vh"}}>
        <Col>
            <Space align="center">
                <Spin size="large" tip="Loading..."/>
            </Space>
        </Col>
    </Row>;
}