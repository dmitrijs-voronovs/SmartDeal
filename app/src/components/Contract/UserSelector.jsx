import {Col, Row, Select} from "antd";
import {userIds} from "../../utils/UserIds";
import React from "react";

export const UserSelector = ({onChange}) => <div
    style={{
        position: "sticky",
        top: 0,
        background: "rgba(255,255,255,.9)",
        zIndex: 99,
    }}
>
    <Row style={{padding: "1rem 0"}}>
        <Col span={6} style={{textAlign: "right", paddingRight: ".5rem"}}>
            Select a user:
        </Col>
        <Col span={14}>
            <Select
                onChange={onChange}
                options={[
                    {label: "Creator", value: userIds.creator},
                    {
                        label: "Agent",
                        value: userIds.agent,
                    },
                    {label: "Client", value: userIds.client},
                ]}
                defaultValue={userIds.creator}
            />
        </Col>
    </Row>
</div>;