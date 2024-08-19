import {  useState } from "react"
import { IUser } from "../../../helpers/types"
import { acceptRequest, declineRequest, getAllRequests } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"
import { Link } from "react-router-dom"

export const Requests = () => {

    const [requests, setRequests] = useState<IUser[]>([])

        getAllRequests()
            .then(response => {
                console.log(response)
                setRequests(response.payload as IUser[])
            })



    const handleAcceptReq = (id: number) => {
        acceptRequest(id)
            .then(response => {
                console.log(response.payload)
                setRequests(requests.filter(r => r.id == id) as IUser[])
            })

    }

    const handleDeclineReq = (id: number) => {
        declineRequest(id)
            .then(response => {
                console.log(response.payload)
                setRequests(requests.filter(r => r.id == id) as IUser[])

            })

    }

    return requests && (
        <>
            <h2>You have {requests.length} request</h2>
            <div className="row">

                {
                    requests.map(request => <div key={request.id} >
                        <img
                            className="profile-pic"

                            src={request.user.picture ? BASE + request.user.picture : DEF}
                        />
                        <strong>
                            <p>{request.user.name} {request.user.surname}</p>
                        </strong>

                        <Link to={'/profile/' + request.id} className="btn btn-light">
                            View Profile
                        </Link>

                        <button onClick={() => { handleAcceptReq(request.id) }} className="btn btn-outline-success">accept</button>
                        <button onClick={() => { handleDeclineReq(request.id) }} className="btn btn-outline-danger">decline</button>
                    </div>
                    )
                }
            </div>

        </>
    )
}

