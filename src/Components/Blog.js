//Blogging App with Firebase
import { useState, useRef, useEffect } from "react";

//Import fireStore reference from frebaseInit file
import {db} from "../firebaseInit";

//Import all the required functions from fireStore
import { collection, doc, getDocs, setDoc,onSnapshot, deleteDoc} from "firebase/firestore"; 

export default function Blog(){

    const [formData, setformData] = useState({title:"", url:"",color:"",category:"",price:"",segment:" ",brand:""})
    const [blogs, setBlogs] =  useState([]);

    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus()
    },[]);

    useEffect(() => {
        
        const sub=onSnapshot(collection(db,"blogs"),(snapShot)=>{
                const blogs = snapShot.docs.map((doc) => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log(blogs);
            setBlogs(blogs);
        })
        /*********************************************************************** */
    },[]);

    async function handleSubmit(e){
        e.preventDefault();
        titleRef.current.focus();

        const docRef = doc(collection(db, "blogs"))
            
        await setDoc(docRef, {
                title: formData.title,
                url: formData.url,
                color:formData.color,
                category:formData.category,
                price:formData.price,
                segment:formData.segment,
                brand:formData.brand,
                createdOn: new Date()
            });

        /*********************************************************************** */
        
        setformData({title: "", url: "",color:"" ,category:"",price:"",segment:"",brand:""});
    }

    async function removeBlog(i){

        // setBlogs( blogs.filter((blog,index)=> index !== i));

        const docRef=doc(db,"blogs",i);
        deleteDoc(docRef);
 
     }

    return(
        <>
        <h1>Write a Blog!</h1>
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.."
                                ref = {titleRef}
                                value={formData.title}
                                onChange = {(e) => setformData({title: e.target.value, url:formData.url,color: formData.color,category:formData.category,price:formData.price,segment:formData.segment,brand:formData.brand})}
                        />
                </Row >

                <Row label="Url">
                        <input className="input"
                                placeholder="Content of the Blog goes here.."
                                required
                                type="url"
                                value={formData.url}
                                onChange = {(e) => setformData({title: formData.title,url: e.target.value,color: formData.color,category:formData.category,price:formData.price,segment:formData.segment,brand:formData.brand})}
                        />
                </Row >
                <Row label="Color">
                        <input className="input"
                                placeholder="Content of the Blog goes here.."
                                required
                                value={formData.color}
                                onChange = {(e) => setformData({title: formData.title,url: formData.url,color: e.target.value,category:formData.category,price:formData.price,segment:formData.segment,brand:formData.brand})}
                        />
                </Row >
                <Row label="Category">
                        <input className="input"
                                placeholder="Content of the Blog goes here.."
                                required
                                value={formData.category}
                                onChange = {(e) => setformData({title: formData.title,url: formData.url,color: formData.color,category:e.target.value,price:formData.price,segment:formData.segment,brand:formData.brand})}
                        />
                </Row >
                <Row label="Price">
                        <input className="input"
                                placeholder="Content of the Blog goes here.."
                                type="number"
                                required
                                value={formData.price}
                                onChange = {(e) => setformData({title: formData.title,url: formData.url,color:formData.color,category:formData.category,price:e.target.value,segment:formData.segment,brand:formData.brand})}
                        />
                </Row >
                <Row label="Segment">
                        <input className="input"
                                placeholder="Content of the Blog goes here.."
                                required
                                value={formData.segment}
                                onChange = {(e) => setformData({title: formData.title,url: formData.url,color:formData.color,category:formData.category,price:formData.price,segment:e.target.value,brand:formData.brand})}
                        />
                </Row >
                <Row label="Brand">
                        <input className="input"
                                placeholder="Content of the Blog goes here.."
                                type="text"
                                required
                                value={formData.brand}
                                onChange = {(e) => setformData({title: formData.title,url: formData.url,color:formData.color,category:formData.category,price:formData.price,segment:formData.segment,brand:e.target.value})}
                        />
                </Row >


         
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        {blogs.map((blog,i) => (
            <div className="blog" key={i}>
                <h3>{blog.title} &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{i}</h3>
                <hr/>
                <img src={blog.url} className="mahesh"/>
                <hr/>
                <p>Color-{blog.color}</p>
                <hr/>
                <p>{blog.category}</p>
                <hr/>
                <p>&#8377; {blog.price}</p>
                
                <hr/>
                <p> for {blog.segment}</p>
                <hr/>
                <p className="maheshh">{blog.brand}</p>

               

                <div className="blog-btn">
                        <button onClick={() => {
                             removeBlog(blog.id)
                        }}
                        className="btn remove">

                            Delete

                        </button>
                </div>
            </div>
        ))}
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
