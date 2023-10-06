import Home from "../home/home"


const orderPage =()=>{
    return (
        <div className="main-out-block">
            <Home.NavContent
            PageActive={2}
            />
            <div>
                Order
            </div>
        </div>
    )
}

export default orderPage;