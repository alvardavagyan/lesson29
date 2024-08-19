import { useEffect, useState } from "react"
import { IUser } from "../../../helpers/types"
import { getAllFollowers } from "../../../helpers/api"
import { BASE, DEF } from "../../../helpers/default"

export const Followers = () => {

    const [followers, setFollowers] = useState<IUser[]>([])

    useEffect(() => {
        getAllFollowers()
            .then(response => {
                console.log(response)
                setFollowers(response.payload as IUser[])
            })
    }, [])

    return <>
        <h1>You have {followers.length} followers</h1>
        <div className="row">
            {
                followers.map(elm => <div key={elm.id}>
                    <img
                        className="profile-pic"
                        src={elm.picture ? BASE + elm.picture : DEF
                        }
                    />
                    <div>
                        <strong>  {elm.name} {elm.surname}  </strong>
                    </div>
                </div>)
            }
        </div>
    </>
}