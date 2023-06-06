import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    DatePicker,
    message
} from 'antd';
import type { DatePickerProps } from 'antd';

const { RangePicker } = DatePicker;
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
};


const key = 'updatable';

const openMessage = () => {
  message.loading({ content: 'Saving...', key });
  setTimeout(() => {
    message.success({ content: 'Saved!', key, duration: 2 });
  }, 1000);
};

const CardPayment = () => {

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <Form.Item label="Type">
                <Radio.Group>
                    <Radio value="Credit"> Credit </Radio>
                    <Radio value="Debit"> Debit </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="CardNumber">
                <Input />
            </Form.Item>
            <Form.Item label="Card Holder">
                <Input />
            </Form.Item>
            <Form.Item label="Expiry Date">
                <div>
                    <DatePicker onChange={onChange} picker="month" />
                    <DatePicker onChange={onChange} picker="year" style={{marginLeft:'6.1vw'}} />
                </div>
            </Form.Item>
            <Form.Item >
                <div >
                    <Button onClick={openMessage}style={{marginLeft:'8.3vw', width:'100%', backgroundColor:'black', color:'white'}}>Done</Button>
                   
                </div>
            </Form.Item>
        </Form>
    );
};
export default CardPayment;
