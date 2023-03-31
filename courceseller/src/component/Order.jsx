
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {AiFillDelete} from 'react-icons/ai';
import "./Order.css";
export default function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setorder] = useState([""]);
  const [name, setname] = useState();
  const [method, setmethod] = useState("Gpay");
  const [totalprice, settotalprice] = useState(0);
  useEffect(() => {
    getallstudent();
    setorder(location.state.order);
    calculateprice1();
  }, []);
  const deleteitem = (e) => {
  
    setorder((cu) => {
    return cu.filter((fr) => fr.courseId !== e);
    });
    // console.log(order);
    // calculateprice();
  };
  useEffect(()=>{
    calculateprice();
  },[order]);
  // const now1 = order.map((e, index) => {
  //   return (
  //     <li name={index} key={index}>
  //       {e.courseName} {e.qty} {e.price}{" "}
  //       <button onClick={()=>deleteitem(e.courseId)} value={e.courseId}><AiFillDelete/></button>
  //     </li>
  //   );
  // });
  const now1 = order.map((e, index) => {
    return (
      <li name={index} key={index} className="order-item">
        <div>{e.courseName}</div><div> {e.qty}</div><div> {e.price*e.qty}</div>
        <button onClick={()=>deleteitem(e.courseId)} value={e.courseId}><AiFillDelete/></button>
      </li>
    );
  });
  const calculateprice = () => {
    var ans = 0;
    order.map((e, index) => {
      ans += e.price * e.qty;
    });
    settotalprice(ans);
  };
  const calculateprice1 = () => {
    var ans = 0;
    location.state.order.map((e, index) => {
      ans += e.price * e.qty;
    });
    settotalprice(ans);
  };
  
  const end = async (e) => {
    e.preventDefault();
 
    const total_price=totalprice;
    const s_Id=location.state.name;
    const res = await fetch("https://localhost:44336/api/Payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({
       method,total_price,s_Id
      })
    });
    console.log(res);
    getpaymentid();
  }
  const getpaymentid=async ()=>{
    var p_id=0;
    const res = await fetch("https://localhost:44336/api/Payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const y=await res.json();
    y.map((e)=>{
      if(e.method==method && e.total_price==totalprice && e.s_Id==location.state.name){
        p_id=e.paymentId;
      }
    });
    order.map(async (order1)=>{
      const course_id=order1.courseId;
      const qty=order1.qty;
      const price=order1.price;
      const res1 = await fetch("https://localhost:44336/api/Orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          p_id,course_id,qty,price
        })
      });
    });
    navigate("/")
  }
  const getallstudent = async () => {
    const res = await fetch("https://localhost:44336/api/Students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const y = await res.json();
    y.map((e, index) => {
      if (e.studentId == location.state.name) {
        setname(e.studentName);
      }
    });
  };
  const handleChange = (e) => {
    setmethod(e.target.value);
  };
  return (
    <div className="Order">
      <div style={{ marginBottom: "25px",fontWeight:"900",fontSize:"25px"}}>Name :- {name}</div>
      <div style={{    alignItems: "center",display: "flex",flexDirection: "column"}}>{now1===null?'':now1}</div>
      <div style={{fontSize:"18px" , fontWeight:"500",marginTop: "15px",marginBottom: "15px"}}>Payment Method :-    
        <select onChange={handleChange} value={method}  style={{marginLeft:"10px",border:"2px solid grey"}}>
          <option value="Gpay" >Gpay</option>
          <option value="paytm">Paytm</option>
          <option value="Phonepay">Phonepay</option>
        </select>
      </div>
      <div className="total-price">Total Price :- {totalprice}</div>
      <button onClick={end}>Submit</button>
    </div>
);
}