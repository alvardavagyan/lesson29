import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getAllFollowings } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"

export const Followings = () => {

    const [followings, setFollowings] = useState<IUser[]>([])

    useEffect(() => {
        getAllFollowings()
            .then(response => {
                console.log(response)
                setFollowings(response.payload as IUser[])
            })
    }, [])
    return <>
        <h1>You have {followings.length} followings</h1>
        <div className="row">
            {
                followings.map(elm => <div key={elm.id}>
                    <img
                        className="profile-pic"
                        src={elm.picture ? BASE + elm.picture : DEF
                        }
                    />
                    <div>
                        <strong>  {elm.name} {elm.surname}</strong>
                    </div>
                </div>)
            }
        </div>
    </>
}