import './App.css';
import {getAllStudents} from "./client"; //for the getAllStudents function
import {useEffect, useState} from 'react'; //prevent to show 2 times the same message

//dependencies for the Layout
import {
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';

import {Breadcrumb, Button, Empty, Layout, Menu, Spin, Table, theme} from 'antd';

import StudentDrawerForm from "./StudentDrawerForm";

//Variables for the Layout
const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Admin', '3'),
    ]),
    // getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined/>),
];

//for displaying the data
const columns = [
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    }
];

function App() {
    //This code is used to show the loading icon
    //The initial state is fetching, so the loading icon will show
    const [fetching, setFetching] = useState(true);

    //This line is using the useState hook to create a state variable collapsed
    //The inital state is false, not collapse
    const [collapsed, setCollapsed] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    // This line is using the useState hook to create a state variable students
    // and a function setStudents to update that state.
    // The initial value of students is an empty array []
    const [students, setStudents] = useState([]);
    //This is a function that fetches student data from an API.
    // It uses the getAllStudents function to get the data. Once the data is received,
    const fetchStudents = () => {
        getAllStudents()
            // it is converted to JSON
            .then(response => response.json())
            .then(data => {
                    //and then logged to the console.
                    console.log(data);
                    // The data is also set to the students state using the setStudents function.
                    setStudents(data)
                    setFetching(false)
                }
            );
    }
    //The function passed to useEffect will run after the component's first render,
    // and every time the component re-renders if any values in the dependency array (the second argument to useEffect) change.
    //In this case, the dependency array is empty, so the array will never change, so it will only render once.
    useEffect(() => {
        console.log("component is mounted");
        fetchStudents();
    }, []); //prevent to show 2 times the same message


    //for rendering the student
    const renderStudents = () => {
        if (fetching) {//if fetching is true, show the icon
            return <Spin/>
        }
        // if (students.length <= 0) {
        //     return <Empty/>
        // }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
                dataSource={students}
                columns={columns}
                bordered
                title={() =>
                    <Button
                        onClick={() => setShowDrawer(!showDrawer)}
                        type="primary" icon={<PlusOutlined/>} size='medium'>
                        Add New Student
                    </Button>}
                pagination={{
                    pageSize: 50,
                }}
                scroll={{
                    y: 600,
                }}
                rowKey={(student) => student.id}
            />
        </>

    }
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                        {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}
                    >
                        {renderStudents()}
                    </div>
                </Content>
                <footer>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        by Xiongyu Pei
                    </Footer>
                </footer>

            </Layout>
        </Layout>
    )
}

export default App;
