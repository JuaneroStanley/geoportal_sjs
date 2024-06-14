"use client";
import Image from "next/image";
import Start from "../components/startpage/Start";
import Login from "../components/login/Login";
import NewOrder from "../components/neworder/NewOrder";
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Services from "../components/services/Services";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <Start />,
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/services",
		element: <Services />,
	},
	{
		path: "/neworder",
		element: <NewOrder />,
	},
]);

export default function Home() {
	return (
		<div className="App">
			<RouterProvider router={Router} />
		</div>
	);
}
