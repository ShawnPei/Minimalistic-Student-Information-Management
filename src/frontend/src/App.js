import './App.css';
import {getAllStudents} from "./client"; //for the getAllStudents function
import {useEffect, useState} from 'react'; //prevent to show 2 times the same message
function App() {
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

    return <p> {JSON.stringify(students)} </p>;
}

export default App;
