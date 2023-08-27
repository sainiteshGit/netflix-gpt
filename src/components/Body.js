import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { RouterProvider } from "react-router-dom";

const Body = () =>{
    const appRouter = createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path: "/browse",
            element:<Browse/>
        }

    ])
    return(
        <div>
            {/* <Login/>
            <Browse/> */}
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;