import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState();
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  //receving single user data
  const getSingleData = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();
    if(!response.ok){
        console.log(result.error);
        setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("update user",result);  
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };
  //passing edited data to backend
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    console.log(updatedUser);
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    const result = await response.json();
    if (response.ok) {
      console.log("updated result..", result);
      setError("");
      navigate("/all");
      //navigate("/read");
    }
    if (!response.ok) {
      console.log(response.error);
      setError(response.error);
    }
  };
  useEffect(() => {
    getSingleData();
  }, []);
  return (
    <div class="container my-2">
      <h1 class="h1 text-center">Edit Data</h1>
      {error && <div class="alert alert-danger"> {error} </div>}
      <form className="form" onSubmit={handleUpdate}>
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input
            type="email"
            class="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input
            type="number"
            class="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" class="btn btn-info">
          Update
        </button>
      </form>
    </div>
  );
};



{/*import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom";

const Update =()=>{

    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[age,setAge]=useState(0);

    const[error,setError]=useState("");

    const {id} = useParams(); // help id from the url

    const getSingleUser = async ()=>{

        const response = await fetch('http://localhost:5000/${id}');

        const result = await response.json();

        if(!response.ok){
            console.log(result.error);
            setError(result.error);
        }

        if(response.ok){
           setError("");
           console.log("updated",result);
           setName(result.name);
           setEmail(result.email);
           setAge(result.age);
        }
    };

    useEffect(()=>{
        getSingleUser();
    },[])

    return(<div className="container my-2">
         {error && <div className="alert alert-danger">{error}</div>}
         <h2 className="text-center">Edit the data</h2>
    <form>
    <div className="mb-3">
        <label  className="form-label">Name</label>
        <input type="text" className="form-control" value={name} onChange={(e)=>setName(e.target.value)} />
     </div>
      <div className="mb-3">
         <label  className="form-label">Email address</label>
         <input type="email" className="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)}  />
      </div>
     <div className="mb-3">
        <label  className="form-label">Age</label>
        <input type="number" className="form-control"  value={age} onChange={(e)=>setAge(e.target.value)}  />
     </div>
   
     <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>)
}*/}

export default Update;