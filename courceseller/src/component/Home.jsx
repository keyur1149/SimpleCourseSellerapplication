import React, { useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
import './Home.css';
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai'
export default function Home() {
  const navigate = useNavigate();
  const [lan, setlen] = useState([""]);
  const [orderlang, setorderlang] = useState([]);
  const [students, setallstudent] = useState();
  const [selectedstudent, setselectedstudent] = useState();
  const getallstudent = async () => {
    const res = await fetch("https://localhost:44336/api/Students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const y = await res.json();
    console.log(y);
    setselectedstudent(y[0].studentId);
    const temp = y.map((e, index) => {
    return (
      <option value={e.studentId} sname={e.studentName} key={index}>
        {e.studentName}
      </option>
    );
  });
    setallstudent(temp);
    // console.log(temp);
    // console.log(students);

  };
  const getallcource = async () => {
    const res = await fetch("https://localhost:44336/api/Courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const y = await res.json();
    setlen([...y]);
    console.log(y);
  };
  useEffect(() => {
    getallstudent();
    getallcource();
    console.log(selectedstudent);
  }, []);
  function additem(c) {
    setorderlang([...orderlang, c]);
    // console.log(data);
  }
  const orderlan = (event) => {
    const temp = {
      courseId:event.target.getAttribute("CourseId"),
      price : event.target.getAttribute("Price"),
      courseName : event.target.getAttribute("courseName"),
      qty : 1,
    }
    console.log(temp);
    // setorderlang(...orderlang, ...temp);
    // setorderlang(shopCart => ({
    //   ...shopCart,
    //   ...temp
    // }));
    additem(temp);
    console.log(orderlang);
  };
  /*
  const now = lan.map((e, index) => {
    return (
      <li
        name={e}
        onClick={orderlan}
        Course={e}
        CourseId={e.courseId}
        courseName={e.courseName}
        Price={e.price}
        key={index}
      >
        {e.courseName}
      </li>
    );
  });
*/
// const now = lan.map((e, index) => {
//   return (
//     <li
//       name={e}
//       onClick={orderlan}
//       Course={e}
//       CourseId={e.courseId}
//       courseName={e.courseName}
//       Price={e.price}
//       key={index}
//     >
//       <div>{e.courseName} - ${e.price}</div>
//     </li>
//   );
// });

const now = lan.map((e, index) => {
  return (
    <li
      name={e}
      onClick={orderlan}
      Course={e}
      CourseId={e.courseId}
      courseName={e.courseName}
      Price={e.price}
      key={index}
      className="course-list-item"
    >
      <div className="course-list-item-title" style={{    paddingLeft: "49px"}}>{e.courseName}</div>
      <div className="course-list-item-price">${e.price}</div>
      <div className="course-list-item-description">{e.description}</div>
    </li>
  );
});
const incrementQty = (courseId) => {
  const updatedOrder = orderlang.map((order) => {
    if (order.courseId === courseId) {
      return {
        ...order,
        qty: order.qty + 1
      }
    } else {
      return order;
    }
  });
  setorderlang(updatedOrder);
}
  const decrementQty = (courseId) => {
  const updatedOrder = orderlang.map((order) => {
    if (order.courseId === courseId && order.qty>1) {
      return {
        ...order,
        qty: order.qty - 1
      }
    } else {
      return order;
    }
  });
  setorderlang(updatedOrder);
}
  const now1 = orderlang.map((e, index) => {
      return (
        // <div>
        <li name={index} key={index} className="order-container">
          <div>{e.courseName}</div>
          <div onClick={()=>incrementQty(e.courseId)} ><span name={e.courseId}><AiOutlinePlus /></span></div>
          <div>{e.qty}</div>
          <div onClick={()=>decrementQty(e.courseId)}><AiOutlineMinus/></div>
        <div>{e.price*e.qty}</div>
        </li>
        /* <div>{e.qty}</div>
        <div>{e.price*e.qty}</div> */
        // </div>
      );
    }
  );
  const gotoorder = () => {
    navigate("/orders", { state: { order: orderlang, name: selectedstudent } });
    // console.log(selectedstudent);
  };
  // const student = students.map((e, index) => {
  //   return (
  //     <option value={e.StudentID} key={index}>
  //       {e.StudentName}
  //     </option>
  //   );
  // });
  const handlechange = (e) => {
    // const value = e.target.sname;
    setselectedstudent(e.target.value);
    // console.log(e.target.value);
    // console.log(e.target.sname);
  };
  return (
    <div>
      <div style={{margin:"50px"}}>
          Select Student Name :-  <select style={{border:"2px solid gray"}} value={selectedstudent} onChange={handlechange}>{students}</select> 
      </div>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <ul style={{width:"500px" }}>{now}</ul>
        <ul  style={{width:"500px" }}>{now1}</ul>
      </div>
      <button onClick={gotoorder}>Order</button>
</div>
);
}