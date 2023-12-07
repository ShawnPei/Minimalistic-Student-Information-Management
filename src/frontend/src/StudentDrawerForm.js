import {Button, Col, Drawer, Form, Input, Row, Select, Space,Spin} from "antd";
import {addNewStudent, updateStudent} from "./client";
import {useEffect, useState} from "react";
import {LoadingOutlined} from "@ant-design/icons";
import {successNotification, errorNotification} from "./Notification";
const {Option} = Select;


function StudentDrawerForm({showDrawer, setShowDrawer,fetchStudents,editingStudent,setEditingStudent}) {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false)
    const onClose = () => setShowDrawer(false);

    useEffect(() => {
        if (editingStudent) {
            form.setFieldsValue({
                name: editingStudent.name,
                email: editingStudent.email,
                gender: editingStudent.gender
            });
        } else {
            form.resetFields();
        }
    }, [editingStudent, form]);

    const onFinish = student => {
        // console.log(JSON.stringify(student, null, 2))
        setSubmitting(true)
        form.resetFields();
        if (editingStudent) {

            updateStudent({...editingStudent, ...student})
                .then(() => {

                    successNotification(
                        "Student updated",
                        `${student.name} was updated in the system`
                    )
                    fetchStudents();
                    setEditingStudent(null);
                }).catch(err => {
                // handle error
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                })
            }).finally(() => {
                setSubmitting(false);
            })
        }else{
            addNewStudent(student)
                .then(() => {
                    console.log("Student Added")
                    successNotification(
                        "Student Added",
                        `${student.name} was added to the system`
                    )
                    fetchStudents();
                }).catch(err => {
                console.log(err);
                err.response.json().then(res => {
                    console.log(res);
                    errorNotification(
                        "There was an issue",
                        `${res.message} [${res.status}] [${res.error}]`,
                        "bottomLeft"
                    )
                })
            }).finally(() => {
                    setSubmitting(false);
                }
            )
        }

    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    }

    return (
        <>
            <Drawer
                title="Create a new Student"
                width={720}
                onClose={onClose}
                visible={showDrawer}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={() => {
                            form.submit()
                            onClose()
                        }} type="primary">
                            {submitting ? <><Spin size="small" indicator={<LoadingOutlined style={{ fontSize: 24, color: "white"}} spin/>}/> Submitting... </> : 'Submit'}
                        </Button>
                    </Space>
                }
            >
                <Form layout="vertical"
                      hideRequiredMark
                      onFinishFailed={onFinishFailed}
                      onFinish={onFinish}
                      form={form}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter student name',
                                    },
                                ]}
                            >
                                <Input placeholder="Please enter student name"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter email',
                                    },
                                ]}
                            >
                                <Input
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please enter email"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an gender',
                                    },
                                ]}
                            >
                                <Select placeholder="Please select an gender">
                                    <Option value="MALE">MALE</Option>
                                    <Option value="FEMALE">FEMALE</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}

export default StudentDrawerForm;